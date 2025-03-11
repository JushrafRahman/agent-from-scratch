import {z} from 'zod';
import type { ToolFn } from '../../types';
import fetch from 'node-fetch';

export const dadJokeDefinition = {
    name: 'dad_joke',
    description: 'get a random dad joke',
    parameters: z.object({}),
}

type args = z.infer<typeof dadJokeDefinition.parameters>;

export const getDadJoke: ToolFn<args, string> = async ({toolArgs}) => {
    const res = await fetch('https://icanhazdadjoke.com', {
        headers: {
            Accept: 'application/json',
        }
    });

    return (await res.json()).joke;
}