import { unlink,access } from 'node:fs';

export const deleteFile = async(fileToDelete) => {
    access(fileToDelete, (err) => {
        if(err)console.log('File does not exist');
        else unlink(fileToDelete, (err) => {
            if(err) console.log('Operation failed');
            else console.log('File deleted successfully');
        })
    })
}