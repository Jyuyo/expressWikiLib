const path = require("path");
const fs = require('fs');

const getFiles = (root) => {

    const jsFiles = []

    const files = fs.readdirSync(root).filter(file => file !== 'node_modules')

    const getFile = (prevDir, actDir) => {
        // console.log(`previo: ${prevDir} actual: ${actDir}`);

        if(path.extname(actDir) === '.js' ){

            jsFiles.push(`${prevDir}/${actDir}`)

        } else if ( !actDir.includes('.')) {
            // console.log(prevDir, actDir, 'Directorio');
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