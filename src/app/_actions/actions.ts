'use server';

import OpenAI from 'openai';
import { tools } from '../helpers/tools';
import { executeFunction } from '../helpers/functions';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type OpenAIMessage = {
  role: 'system' | 'user';
  content: string;
}[];

function getIntro(transcript: OpenAIMessage, instruction: string): OpenAIMessage {
  return [
    {
      role: 'system',
      content: `You are an automated AI technical support assistant for a company that provides
         a platform to build vector search indexes from unstructured data. You are
         responsible for helping users with their technical issues and questions.
         
         You have access  to the product documentation, which contains detailed 
         information about the company's products and services. You can use this information 
         to help users with their questions and issues. Consult the transcript for any other 
         discoveries you have made. 
         
         Unless you are sure you have an accurate answer to the user's question
         escalate the issue to a human support person using the escalateToHuman function. 
         Do not make up an answer if you are unsure.
      
         The user's input is as follows. Your goal is to assist the user in achieving 
         their goal to the best of your ability. It may take a sequence of many instructions to 
         achieve your goal, and you may have to deliberately build knowledge so you know enough 
         to reach the goal. At each step, call the best function to move you closer to your goal. 
         When you're done, call the halt function.
         
         Your repsonses should only consists of function calls and you must always respond with valid 
         JSON`,
    },
    {
      role: 'user',
      content: `Input: ${instruction}`,
    },
  ];
}

export async function invokeAgent(query: string) {
  let messages = getIntro([], query);
  let callCount = 0;
  let keepCalling = true;

  while (keepCalling && callCount < 20) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: messages,
        max_tokens: 500,
        tools: tools,
        response_format: { type: 'json_object' },
        tool_choice: 'required',
      });

      const latestMessage = response.choices[0].message;
      console.log('LLM Response: ', JSON.stringify(latestMessage));

      if (keepCalling && latestMessage.tool_calls && latestMessage.tool_calls.length > 0) {
        latestMessage.tool_calls.forEach((toolCall) => {
          const functionName = toolCall.function.name;
          const functionArgs = JSON.parse(toolCall.function.arguments);

          console.log('Function Name: ', functionName);
          console.log('Function Args: ', functionArgs);
          const functionResponse = executeFunction(functionName, functionArgs);

          // Add system message summarizing the function call and response

          if (functionName === 'halt') {
            messages.push({
              role: 'system',
              content: `Agent cycle complete: <functionCall>{ "name": "${functionName}", "args": ${JSON.stringify(functionArgs)} }</functionCall>`,
            });
            keepCalling = false;
          } else {
            messages.push({
              role: 'system',
              content: `After making the following function call: <functionCall>{ "name": "${functionName}", "args": ${JSON.stringify(
                functionArgs
              )} }</functionCall>\nWe received this response: <functionCallResponse>${functionResponse}</functionCallResponse>`,
            });

            messages.push({
              role: 'user',
              content: `Please continue with the next function call to achieve the desired goal.`,
            });
          }
        });
      }

      callCount++;
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw error;
    }
  }
  console.log('Final transcript: ', messages);

  if (callCount === 20) {
    console.log('Reached maximum number of API calls.');
  }
}
