const getReferenceFromResPath = require("./getReferenceFromResPath");
const handleDynamicRoutes = require("./handleDynamicRoutes");
const objectToSchema = require("./objectToSchema");
const sendDoc = require("./sendDoc");
const sendReqRes = require("./SendRqeRes");


module.exports = {
    sendDoc,
    sendReqRes,
    getReferenceFromResPath,
    objectToSchema,
    handleDynamicRoutes
}