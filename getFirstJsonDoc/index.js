const getEndPoints = require("./getEndPoints");
const getFiles = require("./getFiles");

const getFirstJsonDoc = () => {

    const jsFiles = getFiles(dir);

    const jsonDoc = getEndPoints(app, APIName);

    getComments(jsFiles, jsonDoc);

    return jsonDoc

}

module.exports = getFirstJsonDoc