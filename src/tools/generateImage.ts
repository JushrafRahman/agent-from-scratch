import { z } from 'zod';
import type { ToolFn } from '../../types';
import fetch from 'node-fetch';
import { openai } from '../ai';

export const generateImageToolDefinition = {
    name: 'generate_image',
    description: 'Generates an image and returns the URL of the image',
    parameters: z.object({
        prompt: z
            .string()
            .describe(
                'The prompt to use to generate the image with a diffusion model image generator like Dall-E'
            ),
    }),
}

type args = z.infer<typeof generateImageToolDefinition.parameters>;

export const generateImage: ToolFn<args, string> = async ({ toolArgs, userMessage }) => {
    const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: toolArgs.prompt,
        n: 1,
        size: '1024x1024',
    })

    const imageUrl = response.data[0].url!

    return imageUrl

}