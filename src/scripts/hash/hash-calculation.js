import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

export const calculateFileHash = async(filePath) => {
    const getHash = (path) => new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const readable = createReadStream(path);
        readable.on('error', () => reject());
        readable.on('data', (chunk) => hash.update(chunk));
        readable.on('end', () => resolve(hash.digest('hex')));
    })

    try {
        const fileHash = await getHash(filePath);
        console.log(fileHash);
    } catch {
        console.error('Operation failed: no such file or directory');
    }
}