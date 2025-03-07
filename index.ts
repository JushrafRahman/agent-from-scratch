import 'dotenv/config'
import { runLLM } from './src/llm'
import { addMessages, getMessages } from './src/memory'
import { runAgent } from './src/agent'
import {z} from 'zod';

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const availableTools = [
  {
    name: 'get_weather',
    description: 'This tool is used to fetch weather data',
    parameters: z.object({}),
  }
]
const response = await runAgent({
  prompt: userMessage,
  tools: availableTools
});

console.log(response)
