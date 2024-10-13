import { writeFile } from 'node:fs';
import { cwd } from 'node:process';

export const createFile = async(newFile) => {
    const newFilePath = cwd() + '\\' + newFile;
    if (newFile.includes('.'))  { //
        writeFile(`${newFilePath}`, '', () => console.log('File successfully created'))
    } 
    else {
        console.log('Operation failed');
    }
}