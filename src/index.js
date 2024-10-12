import { homedir } from 'node:os';
import { dirname } from './utiles.js';

const startFileManager = async() => {
    try {
    console.log(`You are currently in ${homedir()}`);
    console.log(dirname);

    // const { list } = await import('./scripts/list.js');

    const username = process.argv.reduce((acc, item) => {
        if(item.includes('username')) {
            acc.push(item);
        }
        return acc;
    }, [])
        .filter((item) => item.includes('--username'))
        .toString()
        .split('=')[1];
    console.log(`Welcome to the File Manager, ${username}`);

    process.on( "SIGINT", function() {
        console.log(`\n Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
      } );
      
    process.stdin.on('data', (data, key) => {
        if(data.includes('.exit') || data.includes('y') ) {
            console.log(`\n Thank you for using File Manager, ${username}, goodbye!`);
            process.exit(0);
        } else if (data.includes('ls')) {
            // list();
            console.log('List');
        } else {
            console.log(`${data}`)
        }
        
    });
} catch(err) {
    console.error(err)
}
}

startFileManager();