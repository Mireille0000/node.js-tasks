import { compressFile } from "./compress.js";
import { decompressFile } from "./decompress.js";

export const brotliHandler = async(line) => {
    const args = line.split(' ');
    const [command, pathOne, pathTwo] = args;
    if (command === 'compress') {
        await compressFile(pathOne, pathTwo);
    } else if (command === 'decompress') {
        await decompressFile(pathOne, pathTwo);
    } else {
        console.log('');
     }
}