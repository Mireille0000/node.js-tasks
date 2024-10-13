import { chdir } from 'node:process';

export const up = () => {
    try {
        chdir('../');
    } catch {
        console.log('');
    }
}