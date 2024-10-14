import { EOL, cpus } from 'node:os';

export const getEOL = () => {
    const EOLValue = JSON.stringify(EOL);
    console.log(EOLValue);
}

export const getCPUsHostMachineInfo = () => {
    const hostMachinInfo = cpus();
    const CPUInfoArr = hostMachinInfo.reduce((acc, item) => {
        const modelInfo = item.model.split(' ');
        const clockRate = modelInfo[modelInfo.length - 1];
        acc.push({model: item.model, ['clock rate(GHz)']: `${clockRate}`});
        return acc;
    }, []);

    console.log(`Overall amount of CPUS: ${CPUInfoArr.length}`);
    console.table(CPUInfoArr);
}