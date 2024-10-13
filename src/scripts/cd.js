import { chdir, cwd } from 'node:process';

export const cd = (line) => {
    try {
        chdir(cwd() + '/' + line);
    } catch {
        console.error('The specified path does not exist');
    }
};