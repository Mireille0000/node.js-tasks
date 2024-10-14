import { getCPUArchitecture, getCPUsHostMachineInfo, getEOL, getHomeDir, getUserName } from './os-commands.js';

export const osHandler = async(line) => {
    const args = line.split(' ');
    const [command, param] = args;
try {
    if (command === 'os') {
        if(param.includes('--EOL')) {
            getEOL();
        } else if (param === '--cpus') {
            getCPUsHostMachineInfo();
        } else if (param === '--homedir') {
            getHomeDir();
        } else if (param.includes('--username')) {
            getUserName();
        } else if(param === '--architecture') {
            getCPUArchitecture();
        } else {
            console.log('No parameter chosen')
        }
    } else {
        console.log();
    }
} catch {
    console.error('No parameter chosen');
}
}