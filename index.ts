import 'dotenv/config'
import { runLLM } from './src/llm'
import {addMessages, getMessages, removeMetaData} from './src/memory';

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const history = await getMessages();

const response = await runLLM({ messages: [...history, { role: 'user', content: userMessage }]});

console.log(response)
