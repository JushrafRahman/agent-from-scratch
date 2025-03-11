import type OpenAI from 'openai'
import { tools, toolDefs } from './tools'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case toolDefs[0].name:
      return tools[0](input);
    case toolDefs[1].name:
      return tools[1](input);
    case toolDefs[2].name:
        return tools[2](input);

    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}
