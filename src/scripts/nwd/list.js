import { readdir } from 'node:fs/promises'
import { stat } from 'node:fs';

export const list = async() => {
    const currentPath = process.cwd();
    try {
        const dir = await readdir(currentPath, { withFileTypes: true});
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

                return {name: item.name.slice(0, 20), type: res[i]}; //
            });
            
            dirContent.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });

            dirContent.sort((a, b) => {
                return a.type.localeCompare(b.type);
            })
            
            console.table(dirContent);
        });
    } catch {
        throw new Error('FS operation failed');
    }
}
