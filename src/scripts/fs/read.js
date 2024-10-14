import { createReadStream  } from 'node:fs';
import { cwd } from 'node:process';

export const readFile = async(fileToRead) => {
    const currentDirectory = cwd() + '/' + fileToRead;
    const readable = createReadStream(currentDirectory, 'utf-8');
    readable.on('data', (data) => console.log(data));
    readable.on('error', () => console.error('No such file'));
}