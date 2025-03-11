import { dadJokeDefinition, getDadJoke } from "./dadJoke";
import { generateImage, generateImageToolDefinition } from "./generateImage";
import { getRedditPost, redditToolDefinition } from "./reddit";

export const toolDefs = [dadJokeDefinition, generateImageToolDefinition, redditToolDefinition];
export const tools = [getDadJoke, generateImage, getRedditPost];