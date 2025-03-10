import type { AIMessage } from '../types'
import { addMessages, getMessages, saveToolResponse } from './memory'
import { runLLM } from './llm'
import { showLoader, logMessage } from './ui'
import { runTool } from './toolRunner'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  await addMessages([{ role: 'user', content: userMessage }])

  const loader = showLoader('🤔')
  const history = await getMessages()

  const response = await runLLM({ messages: history, tools })

  console.log("LLM response: ");
  console.log(response);
  
  await addMessages([response]);

  if (response.tool_calls?.length) {
    const toolToRun = response.tool_calls[0];
    loader.update(`executing tool: ${toolToRun.function.name}`);

    const toolResponse = await runTool(toolToRun, userMessage);
    await saveToolResponse(toolToRun.id, toolResponse);
    
    console.log(`done executing tool: ${toolToRun}`);
  }

  // logMessage(response)
  loader.stop()
  return getMessages()
}
