import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs';
import { normalize } from 'node:path';

// use readable and writable streams

export const copyFile = async(fileToCopy, destination) => {
    if(fileToCopy && destination) {
        access(fileToCopy, (err) => {
            if(err) console.error('No such file or directory');
            else {
                const readable = createReadStream(fileToCopy, 'utf-8');
                const writable = createWriteStream(destination);
    
                readable.pipe(writable);
    
                readable.on('error', (err) => console.log(err, 'Operation failed'));
                writable.on('error', (err) => console.log(err, 'Operation failed'));
            };
        })
    } else {
        console.log('Operation failed');
    }
}