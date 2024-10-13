import { homedir } from 'node:os';
import { cwd } from 'node:process';
import { createInterface } from 'node:readline';
import { up } from './scripts/up.js';
import { cd } from './scripts/cd.js';
import { readFile } from './scripts/fs/read.js';
import { createFile } from './scripts/fs/create.js';
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
                cd(`${line.split('').slice(2, line.length).join('')}`.trim());
            } else if(line.includes('cat')) {
                await readFile(`${line.split('').slice(3, line.length).join('')}`.trim());
            } else if(line.includes('add')) {
                await createFile(`${line.split('').slice(3, line.length).join('')}`.trim());
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