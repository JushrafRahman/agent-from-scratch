# Build an AI Agent from Scratch

## About:<br>
There are 3 tools in this project, which are fed to the LLM:
  - Tool 1: Fetches random Dad joke
  - Tool 2: Generates image from prompt using 'dall-e-3'
  - Tool 3: Fetches posts from reddit (r/leetcode)

## Feature: <br>
Based on the given prompt, the LLM will decide how to combine the tools to generate an answer

## To run the project:

```bash
npm start "Your prompt"

Example:
npm start "tell me a dad joke and generate a meme out of it"
```

## OpenAI API Key

You must create an [API Key from OpenAI](https://platform.openai.com/settings/organization/api-keys) and save it in a `.env` file:

```
OPENAI_API_KEY='YOUR_API_KEY'
```
