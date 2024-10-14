import { readFile } from './read.js';
import { createFile } from './create.js';
import { renameFile } from './rename.js';
import { copyFile } from './copy.js';
import { moveFile } from './move.js';
import { deleteFile } from './delete.js';

export const fsHandler = async(line) => {
    const args = line.split(' ');
    const [command, pathOne, pathTwo] = args;

    if(command ==='cat') {
        await readFile(pathOne);
    } else if(command === 'add') {
        await createFile(pathOne);
    } else if(command === 'rn') {
        // const paths = args.split(' ');
        // const [oldPath, newPath] = paths;
        await renameFile(pathOne, pathTwo);
    } else if(command === 'cp') {
        // const paths = args.split(' ');
        // const [oldPath, newPath] = paths;
        const fileToCopy = pathOne.split('/'); 
        await copyFile(pathOne, pathTwo + '/' + fileToCopy[fileToCopy.length - 1]);
    } else if(command === 'mv') {
        // const paths = args.split(' ');
        // const [oldPath, newPath] = paths;
        const fileToMove = pathOne.split('/'); 
        await moveFile(pathOne, pathTwo + '/' + fileToMove[fileToMove.length - 1])
    } else if(command ==='rm') {
        await deleteFile(pathOne);
    } else {
        console.log();
    }

}