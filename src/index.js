import { homedir } from 'node:os';
import { cwd } from 'node:process';
import { createInterface } from 'node:readline';
import { up } from './scripts/up-to-folders.js';
import { cd } from './scripts/down-to-folders.js';
import { readFile } from './scripts/fs/read.js';
import { createFile } from './scripts/fs/create.js';
import { renameFile } from './scripts/fs/rename.js';
import { copyFile } from './scripts/fs/copy.js';
import { moveFile } from './scripts/fs/move.js';
import { deleteFile } from './scripts/fs/delete.js';
import { getCPUHostMachineInfo, getEOL } from './scripts/os-info/os-commands.js';
const { list } = await import('./scripts/list.js');

const startFileManager = async() => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    try {
        const username = process.argv.reduce((acc, item) => {
            if(item.includes('username')) {
                acc.push(item);
            }
            return acc;
        }, [])
            .filter((item) => item.includes('--username'))
            .toString()
            .split('=')[1];

        if (username) {
            console.log(`Welcome to the File Manager, ${username}`);
        } else {
            console.log(`Welcome to the File Manager, Stranger`);
        }

        rl.on( "SIGINT", function() {
            if (username) {
                console.log(`\n Thank you for using File Manager, ${username}, goodbye!`);
            } else {
                console.log(`\n Thank you for using File Manager, Stranger, goodbye!`);
            }
            process.exit(0);
        } );
        
        rl.on('line', async (line) => {
            const args = `${line.split(' ').slice(1, line.length).join(' ')}`.trim();
            const regex = new RegExp(line);
            
            if(line.includes('.exit')) {
                if (username) {
                    console.log(`\n Thank you for using File Manager, ${username}, goodbye!`);
                } else {
                    console.log(`\n Thank you for using File Manager, Stranger, goodbye!`);
                }
                process.exit(0);
            } else if (line.includes('ls')) {
                list();
            } else if(line.includes('up')) {
                up();
            } else if(line.includes('cd')) {
                cd(args);
            } else if(line.includes('cat')) {
                await readFile(args);
            } else if(line.includes('add')) {
                await createFile(args);
            } else if(line.includes('rn')) {
                const paths = args.split(' ');
                const [oldPath, newPath] = paths;
                await renameFile(oldPath, newPath);
            } else if(line.includes('cp') && !line.includes('--cpus')) {
                const paths = args.split(' ');
                const [oldPath, newPath] = paths;
                const fileToCopy = oldPath.split('/'); 
                await copyFile(oldPath, newPath + '/' + fileToCopy[fileToCopy.length - 1]);
            } else if(line.includes('mv')) {
                const paths = args.split(' ');
                const [oldPath, newPath] = paths;
                const fileToMove = oldPath.split('/'); 
                await moveFile(oldPath, newPath + '/' + fileToMove[fileToMove.length - 1])
            } else if(line.includes('rm')) {
                await deleteFile(args);
            } else if(regex.test('os --EOL')) {
                getEOL();
            } else if(regex.test('os --cpus')) {
                getCPUHostMachineInfo();
            } else {
                console.error(`Invalid input`)
            }  
            console.log(`\nYou are currently in ${cwd()}\n`);
        });
        // process.chdir(homedir())
        console.log(`\nYou are currently in ${cwd()}\n`);
    } catch(err) {
        console.error(err);
    }
}

startFileManager();