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

    let iter = 1;
    while (true) {
        console.log(`iter: ${iter} `);
        iter++;
        
        const history = await getMessages(); // get previous context
        const response = await runLLM({ messages: history, tools }); // llm response
        logMessage(response);
        
        await addMessages([response]);

        const llmSentAnswer = response.content;

        if (llmSentAnswer) {
            loader.stop();
            return getMessages();
        }

        // else: LLM wants to run tool

        if (response.tool_calls) {
            const toolToRun = response.tool_calls[0];
            loader.update(`Executing tool: ${toolToRun.function.name}`);
            const responseAfterRunningTool = await runTool(toolToRun, userMessage);
            await saveToolResponse(toolToRun.id, responseAfterRunningTool);
            loader.update(`Completed executing tool: ${toolToRun.function.name}`);
        }
    }
}
