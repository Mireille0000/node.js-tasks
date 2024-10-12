import { readdir } from 'node:fs/promises'
import { dirname } from '../utiles.js';
import { stat } from 'node:fs';

export const list = async() => {
    try {
        const dir = await readdir(dirname, {recursive: true, withFileTypes: true});
        const statsList = [];
        for (let i = 0; i < dir.length; i++) {
            statsList.push(new Promise((resolve, reject) => {
                stat(`${dir[i].path}\\${dir[i].name}`, (err, stats) => {
                    if (err) {
                        return reject;
                    }
                    return resolve(stats.isDirectory());
                })
            }));
        }
        Promise.all(statsList).then(res => {
            const typeOfItem = []
            for (let i = 0; i < res.length; i++) {
                if(res[i] == true) {
                    typeOfItem.push('directory')
                } else {
                    typeOfItem.push('file')
                }
            }
            return typeOfItem
        }).then(res => {
            const dirContent = dir.map((item,i) => {
                return {name: item.name, type: res[i]};
            });
            console.table(dirContent);
        });
    } catch {
        throw new Error('FS operation failed');
    }
}
