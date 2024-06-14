// Define the interface for FunctionParameters according to OpenAI's specification.
export interface FunctionParameters {
  type: string;
  properties?: Record<
    string,
    {
      type: string;
      description?: string;
    }
  >;
  required?: string[];
}

// Define the FunctionDefinition interface based on the requirements.
export interface FunctionDefinition {
  name: string;
  description?: string;
  parameters?: FunctionParameters;
}

// Array of functions following the FunctionDefinition interface.
export const tools: any[] = [
  {
    type: 'function',
    function: {
      name: 'searchDocs',
      description: 'Performs a semantic search to retrieve relevant sections of the documentation based on the input string.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query to find relevant documentation sections.',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'searchDiscord',
      description: 'Performs a semantic search to retrieve relevant threads from Discord where users solved similar problems.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query to find relevant Discord threads.',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'escalateToHuman',
      description: 'Indicates that a human support person should be alerted and their help is needed to solve the problem.',
    },
  },
  {
    type: 'function',
    function: {
      name: 'halt',
      description:
        "Indicates that the agent should complete processing because the user's goal has been achieved or the agent isn't able to achieve the goal. It sends a message to the user indicating the outcome.",
      parameters: {
        type: 'object',
        properties: {
          messageToUser: {
            type: 'string',
            description:
              'Message formattted in markdown to be returned to the user indicating the outcome of the agent flow. The markdown will be rendered as a message to the user.',
          },
        },
        required: ['messageToUser'],
      },
    },
  },
];
