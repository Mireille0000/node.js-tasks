import { rename } from 'node:fs/promises';

export const renameFile = async(oldPath, newPath) => {
    try {
        await rename(oldPath, newPath);
    } catch(err) {
        console.error('Operation failed');
    }
}