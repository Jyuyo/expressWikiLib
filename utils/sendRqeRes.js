

const sendReqRes = (req, status, res, bridge) => {
    
    if (bridge) {
        
        const reqRes = {
            Name: globalProjectName,
            req: {
                "content-type": req.headers[["content-type"]],
                method: req.method,
                reqBy: req.headers.origin
            },
            bridge
        }

        fetchReqResDoc(`${reqResAPIRoute}/${globalProjectName}`, reqRes)

    } else {

        const ReqSchema = objectToSchema(req.body)
        const ResSchema = objectToSchema(res)

        const reqRes = {
            Name: globalProjectName,
            req: {
                body: ReqSchema,
                "content-type": req.headers[["content-type"]],
                endpoint: req.originalUrl,
                method: req.method,
                reqBy: req.headers.origin
            },
            res: {
                status,
                body: ResSchema
            },
            bridge
        }

        fetchReqResDoc(`${reqResAPIRoute}/${globalProjectName}`, reqRes)

    }

}

module.exports = sendReqRes