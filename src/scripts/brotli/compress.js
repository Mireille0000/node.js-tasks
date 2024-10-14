import { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { parse } from 'node:path'

export const compressFile = async(fileToCompress, destinationFile) => {
    if(!fileToCompress && !destinationFile) {
        console.log('No such file or directory');
    } 
    else {
        try {
            const brotliStream = createBrotliCompress();
            const fileExt = parse(destinationFile).ext;
            if (fileExt === 'br') {
                const readable = createReadStream(fileToCompress);
                const writable = createWriteStream(destinationFile);
    
                brotliStream.on('error', (err) => console.error('No such file or directory'));
                readable.on('error', (err) => console.error('No such file or directory')); //
                writable.on('error', (err) => console.error('No such file or directory')); //
                pipeline(createReadStream(fileToCompress), brotliStream, createWriteStream(destinationFile));
            } else {
                console.log('The file format is invalid. Use .br');
            }
        } catch(err) {
            console.error(err,'Operation failed');
        }
    }   
}