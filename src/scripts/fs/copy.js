import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs';
// use readable and writable streams

export const copyFile = async(fileToCopy, destination) => {
    const readable = createReadStream(fileToCopy, 'utf-8');
    const writable = createWriteStream(destination);

    readable.pipe(writable);
    readable.on('error', () => console.log('Operation failed'));
    writable.on('error', () => console.log('Operation failed'));
}