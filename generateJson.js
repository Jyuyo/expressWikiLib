
const generateJson = (json) => {
    const fs = require('fs');
     
    const data = JSON.stringify(json,null,'\t');
    fs.writeFileSync('student-2.json', data);
}

module.exports = generateJson