const fs = require('fs-extra');
const path = require('path');

class ReadDirToTree {
    dir;
    fileTree = [];
    ignores;
    constructor(dir, ignores) {
        this.dir = dir;
        this.ignores = ignores || ['.DS_Store'];
    }

    #ignoreHandle = (dirPath, dirName) => {
        if(this.ignores.includes(dirName)){
            return true;
        }
        return false;
    }

    #buildFileTree = (dir, arr) => {
        if (!arr) arr = [];

        const list = dir.split('/');
        let dirName = list[list.length - 1];
        let data = {
            name: dirName
        };
        // var isIgnore = this.#ignoreHandle(dir, dirName);

        if (fs.statSync(dir).isDirectory()) {
            data.children = [];
            fs.readdirSync(dir).forEach((item) => {
                item = path.join(dir, item);
                this.#buildFileTree(item, data.children);
            });
        }
        
        arr.push(data);
    }

    getFileTree = () => {
        this.#buildFileTree(this.dir, this.fileTree);
        return this.fileTree;
    }
}

module.exports = ReadDirToTree;