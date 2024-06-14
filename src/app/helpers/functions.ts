// Assuming you have some imports if necessary, and possibly a utility to fetch or act upon data
import { FunctionParameters } from './tools';

function searchDocs(query: string): string {
  console.log(`Searching documentation for query: ${query}`);
  // Simulated response for demonstration
  return `Vectorization strategies
  A vectorization strategy is the combination of an embedding model and a chunking configuration. Finding the right strategy depends on the type of data your experiment will be using and how you will be implementing the RAG pattern. The right strategy is typically one that consistently finds results with high relevance scores.
  
  Choosing the right strategy
  Vectorization models take in text and convert it to a collection of vectors called an embedding. There are many models in the ecosystem, each performing the conversion in a slightly different way. The Vectorize Team has spent time distilling many of those models down to a “Simple”, “Moderate”, and “Advanced” list. You choose from those strategies based on how nuanced your data is, versus the purpose of the given models.
  
  Chunking (or splitting) is the act of breaking up large text into smaller segments. An embedding is generated for each chunk and saved to a vector database. The purpose of breaking up data into smaller segments is to help searchers find more relevant results. Part of the RAG pattern is finding semantically similar data to a given query. The Relevancy score is a number that represents that similarity.
  
  Experimenting with different strategies on the same data gives you the opportunity to find a chunking and embedding model combination that best fits your needs. To understand these choices consider the following example.
  
  Example vectorization strategy
  Say you wanted to use the RAG pattern to search the text of every children's fairytale ever written. The goal would be to query the text with questions like “What color was Mary’s fleece” and “What do Little Red Riding Hood and the 3 Little Pigs have in common”.
  
  The first question is specific to one fairytale. The second question is more generic and expects to find a commonality between multiple tales. If we create a single embedding per fairytale the search will not be very good at finding small nuances. It won’t be able to provide a result for the second question with a high relevance score.
  
  If we chunk all the fairy tales into small sections though, the search will be able to find sections that are similar to our question. Thus, providing results that are more semantically similar with a higher relevancy score.
  
  The size of the sections and how much they overlap will determine how relevant the search results are.
  
  Supported embedding models
  The Vectorize platform includes the following embedding models in vectorization strategies.
  
  Voyage AI 2 (Dimensions: 1024)
  
  OpenAI Ada v2 (Dimensions: 1536)
  
  OpenAI v3 Large (Dimensions: 3072)
  
  OpenAI v3 Small (Dimensions: 1536)
  
  Mistral M. E5 Small (Dimensions: 384)
  
  Chunking types
  Paragraph - Segments text by its natural paragraph breaks, maintaining the logical grouping and contextual integrity of the content.
  
  Fixed - Divides text into segments of a predetermined size, ideal for uniform analysis or processing.
  
  Sentence - Splits text into individual sentences, facilitating detailed analysis and processing at the sentence level.
  `;
}

function searchDiscord(query: string): string {
  console.log(`Searching Discord threads for query: ${query}`);
  // Simulated response for demonstration
  return `Vess
  OP
   — 06/08/2024 4:56 PM
  Im trying to force the LLM output to be a json each time but it is very hard. Do you have any suggestion ?
  krishna — Yesterday at 2:30 AM
  Use json_mode, specify json schema using the jsonschema spec in the prompt. Include JSON keywords in both system and user prompt. Also specify to output just the json without explanation text. End the prompt with JSON:
  Also post-process as text and fix common JSON issues via code
  Vess
  OP
   — Today at 1:42 AM
  I try the Json mode but this is not consistent
  Voici le prompt
  Input:
  {{text}}
  A) Role
  You are a virtual touristic guide. You generate tourists facts (anecdotes) about cities, streets, historical landmarks and monuments.
  B) Task
  You need to use the input text as known knowledge.
  Based on thie given text and wikipedia text, generate one fun fact, or a cultural anecdote, or historical tidbit, that would be of interest to a tourist like myself.
  C) Process
  Use the following step-by-step instructions to respond to user inputs:
  Step 1 - Clean the text by removing non-textual information (like geo-location, chars like ^, #...).
  Step 2- Extend cleaned text by more information from wikipedia (extended text must be at least 10000 words) . Focus on sections like History and Architecture.
  Step 3 - Split the text in paragraphs, then randomize the paragraphs order to form a new text.
  Step 4 - Using the new text to generate authentic anecdote. It must be a different fact each time.
  Step 5 - The anecdote must have two versions: a short anecdote (300 chars) and a long anecdote (1000 chars).
  Step 6 - Begin the short anecdote with 'Did you know that...' or 'Guess what!' or 'Get this!', or 'Fun fact:...' Note:- select anyone only.
  Step 8 - Select some "place_categories" of this fact, only a selection of these : [Architecture, History, Sports, Pop culture, Arts & Literature, Science, Nature, Society & politics, Dark & mystical]
  Step 9 - Select "some_tags"  of this fact, only 5 from these: [architecture, city planning, landmark, building ,pre-history, antiquity, middle-age, renaissance, 18th century, 19th century, 1900-1930's, 1930-1950's, 1960s, 1970s, 1980s, 1990s, sports, pop-culture, music, cinema, street-art, celebrity, fashion, lifestyle, fine arts, painting, sculpture, literature, poetry, museums, science, engineering, nature, geography, society, economics, politics, dark story, crime, horror, legends] then add 3 tags not from this list.
  D) Output format
  You must format the output as a JSON file, and provide only the JSON object as follows:
  {
      "anecdotes": [
      {
          "short_anecdote": " ",
          "long_anecdote": " ",
          "place_categories": [],
          "some_tags": [],
      }
      ]
  }
  response_format: { "type": "json_object" }
  How I can be sure to have the output in Json each time
  This is really a issue
  I dont have this issue with chatgpt`;
}

function escalateToHuman(): string {
  console.log('Escalating the issue to a human support team member.');
  // Simulated notification process
  return 'Issue has been successfully escalated to the support team.';
}

function halt(messageToUser: string): string {
  console.log(`Halt command received with message: ${messageToUser}`);
  // Simulated end of process
  return `Process halted: ${messageToUser}`;
}

// Example function that takes the name of the function to call and the arguments as any object
export function executeFunction(functionName: string, args: Record<string, any>): string {
  switch (functionName) {
    case 'searchDocs':
      console.log('Executing searchDocs function');
      console.log('Arguments:', JSON.stringify(args));
      // Check if args.query is provided and return a meaningful string either way
      if (args.query) {
        return searchDocs(args.query);
      }
      return 'No query provided for searchDocs function.';

    case 'searchDiscord':
      // Check if args.query is provided and return a meaningful string either way
      if (args.query) {
        return searchDiscord(args.query);
      }
      return 'No query provided for searchDiscord function.';

    case 'escalateToHuman':
      return escalateToHuman();

    case 'halt':
      // Check if args.messageToUser is provided and return a meaningful string either way
      if (args.messageToUser) {
        return halt(args.messageToUser);
      }
      return 'No message provided to display to the user for the halt function.';

    default:
      console.error('Function not found:', functionName);
      return 'Function not found.';
  }
}
