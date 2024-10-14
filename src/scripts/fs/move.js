import { createReadStream, createWriteStream } from 'node:fs';
import { rm } from 'node:fs';

export const moveFile = async(fileToMove, destination) => {
    const readable = createReadStream(fileToMove, 'utf-8');
    const writable = createWriteStream(destination);

    const fileMoved = new Promise((resolve, reject) => {
        resolve(readable.pipe(writable));
        readable.on('error', () => reject(console.error('Operation failed')));
        writable.on('error', () => reject(console.error('Operation failed')));
    })
    fileMoved.then((res) => {
        console.log('File moved successfully');
        rm(fileToMove, () => {})
        return res;
    });
    // move file + delete the file from the dir where it was
}