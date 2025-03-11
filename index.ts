import 'dotenv/config'
import { runLLM } from './src/llm'
import {addMessages, getMessages, removeMetaData} from './src/memory';

const userMessage = process.argv[2] // given prompt

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

await addMessages([{ role: 'user', content: userMessage }]); // add the new message given in terminal to the db

const history = await getMessages();

const response = await runLLM({ messages: history }); // send all messages from beginning as context

console.log(response)
