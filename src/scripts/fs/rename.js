import { rename } from 'node:fs/promises';
import { cwd } from 'node:process';

export const renameFile = async(oldPath, newPath) => {
    try {
        await rename(oldPath, newPath);
    } catch(err) {
        console.error('Operation failed');
    }
}