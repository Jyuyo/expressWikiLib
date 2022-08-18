const path = require("path");
const fs = require('fs');
const { folders } = require('../jsons/ignoreFolders.json');

const getFiles = (root) => {

    const jsFiles = []

    const files = fs.readdirSync(root).filter(file => !folders.includes(file))

    const getFile = (prevDir, actDir) => {

        if(path.extname(actDir) === '.js' ){

            jsFiles.push(`${prevDir}/${actDir}`)

        } else if ( !actDir.includes('.')) {
            
            ls(`${root}/${prevDir}/${actDir}`).forEach(getFile.bind( '', `${prevDir}/${actDir}`))
            
        } else {

        }
    }

    const ls = (dir) => {
        return fs.readdirSync(dir)
    }
    
    
    files.forEach(getFile.bind(null, ''))

    return jsFiles
}

module.exports = getFiles