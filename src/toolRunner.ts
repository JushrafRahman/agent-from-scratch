import type OpenAI from "openai";

const getWeather = () => `hot, 45 deg`; // fake weather tool

export const runTool = async (
    toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
    userMessage: string // user prompt
) => {
    const input = {
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
    };

    switch (toolCall.function.name) {
        case 'get_weather':
            return getWeather();
        
        default:
            throw new Error(`Unknown tool called: ${toolCall.function.name}`);
    }

}