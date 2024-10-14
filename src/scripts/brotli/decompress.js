import { createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { parse } from 'node:path';

export const decompressFile = async(compressedFile, decompressedFile) => {
    if(!compressedFile && !decompressedFile) {
        console.log('No such file or directory');
    } 
    else {
        try {
            const brotliStream = createBrotliDecompress();
            const fileExt = parse(compressedFile).ext;
            if (fileExt === '.br') {
                const readable = createReadStream(compressedFile);
                const writable = createWriteStream(decompressedFile);
    
                brotliStream.on('error', (err) => console.error('No such file or directory'));
                readable.on('error', (err) => console.error('No such file or directory')); //
                writable.on('error', (err) => console.error('No such file or directory')); //
                pipeline(readable, brotliStream, writable);
            } else {
                console.log('The file format is invalid. Use .br');
            }
        } catch(err) {
            console.error(err,'Operation failed');
        }
    }   
}