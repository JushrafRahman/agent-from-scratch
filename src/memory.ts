import { JSONFilePreset} from 'lowdb/node'; // reads from JSON file and uses it as a lightweight database
import type { AIMessage } from '../types';
import { v4 as uuidv4 } from 'uuid'; // to create unique ids since we don't have any db

// We are just abstracting the behavior of a Database here since we are not actually using any database

export type MessageWithMetaData = AIMessage & {
    id: string;
    createdAt: string;
}

type Data = {
    messages: MessageWithMetaData[];
}

// When we get a message from AI there is no 'id' or 'createdAt' it's just the content, roles, etc
// But if we get read or get response from a DB we have id and createdAt, etc props. So we just imitating that behavior
// Example: When we are building a chat app, we are storing the messages in a database
export const addMetaData = (message: AIMessage) => {
    return {
        ...message,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
    }
}


export const removeMetaData = (message: MessageWithMetaData) => {
    const {id, createdAt, ...rest} = message;
    return rest;
}


// fake database
const defaultData: Data = {
    messages: [],
}

export const getDb = async () => {
    // we have a db.json file where all the data will be stored
    const db = await JSONFilePreset<Data>('db.json', defaultData);
    return db;
}