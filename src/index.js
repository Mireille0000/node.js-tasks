import { homedir } from 'node:os';
import { cwd } from 'node:process';
import { createInterface } from 'node:readline';
import { up } from './scripts/up.js';
import { cd } from './scripts/cd.js';
import { readFile } from './scripts/fs/read.js';
import { createFile } from './scripts/fs/create.js';
import { renameFile } from './scripts/fs/rename.js';
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