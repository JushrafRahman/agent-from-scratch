import 'dotenv/config'
import { runAgent } from './src/agent'
import { z } from 'zod'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

// list of our available tools in PC, which will be passed to llm
const weatherTool = {
  name: 'get_weather',
  description: `use this to get the weather. Does not need location information`,
  parameters: z.object({
    reasoning: z.string().describe('why did you pick this tool?'),
  }),
}

const response = await runAgent({ userMessage, tools: [weatherTool] })

console.log(response)
