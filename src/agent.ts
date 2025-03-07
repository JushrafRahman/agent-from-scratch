import type { AIMessage } from '../types';
import { addMessages, getMessages } from './memory';
import { runLLM } from './llm';
import { logMessage, showLoader } from './ui';

export const runAgent = async ({
    prompt,
    tools,
}: {
    prompt: string,
    tools: any[],
}) => {
    await addMessages([{role: 'user', content: prompt}]);

    const loader = showLoader('Thinking...');

    const entireContext = await getMessages();

    const response = await runLLM({
        messages: entireContext,
        tools,
    });

    console.log('printing api response');
    logMessage(response);

    if (response.tool_calls) {
        console.log('yes has tool calls in response');
        console.log(response.tool_calls);
    };

    await addMessages([response]);

    loader.stop();
    return getMessages();

}