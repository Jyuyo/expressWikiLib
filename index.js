const generateJson = require("./generateJson");
const getComments = require("./getComments");
const getFiles = require("./getFiles");
const getEndPoints = require('./getEndPoints');
const objectToSchema = require("./objectToSchema");
const getReferenceFromResPath = require("./getReferenceFromResPath");

let globalProjectName
let docAPIRoute
let reqResAPIRoute

const nextWikiLib = (app, options) => {

    const { dir, APIName, docAPIEndpoint, reqResAPIEndpoint } = options

    globalProjectName = APIName
    docAPIRoute = docAPIEndpoint
    reqResAPIRoute = reqResAPIEndpoint

    const jsFiles = getFiles(dir);

    const endPoints = getEndPoints(app, APIName);

    getComments(jsFiles, endPoints);

    return endPoints
}

const sendDoc = (jsonDoc) => {
    fetchSendDoc(docAPIRoute, jsonDoc);
}

const sendReqRes = (req, status, res) => {
    const reqRes = {
        Name: globalProjectName,
        req: {
            body: req.body,
            "content-type": req.headers[["content-type"]],
            endpoint: req.url,
            method: req.method,
            reqBy: req.headers.origin
        },
        res: {
            status,
            body: res
        }
    }
    // fetchReqResDoc(`${reqResAPIRoute}/${globalProjectName}`, reqRes)
    return reqRes
}


module.exports = {
    generateJson,
    getComments,
    getFiles,
    getEndPoints,
    objectToSchema,

    sendDoc,
    sendReqRes,
    nextWikiLib,
    getReferenceFromResPath
}