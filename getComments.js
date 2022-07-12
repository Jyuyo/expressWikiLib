const extract = require('babel-extract-comments');
const { keyWords } = require('./keyWords.json');

const getComments = (files, endpoints) => {

    files.forEach(file => {
        extract.file(`.${file}`).forEach(comment => {
            if (comment.type == 'CommentBlock') {
                const commentArray = comment.value.replace(/\r\n/g, '').replace(/\*/g, '').split('@');
                commentArray.shift()

                if (commentArray.length >= 2) {

                    const HTTPMethodComment = commentArray.find(comment => {
                        comment = comment.toUpperCase()
                        return comment.includes('METHOD')
                    })

                    const endpointComment = commentArray.find(comment => {
                        comment = comment.toUpperCase()
                        return comment.includes('ROUTE')
                    })

                    const descriptionComment = commentArray.find(comment => {
                        comment = comment.toUpperCase()
                        return comment.includes('DESCRIPTION')
                    })

                    if (HTTPMethodComment && endpointComment && descriptionComment) {

                        commentArray.splice(commentArray.indexOf(HTTPMethodComment), 1);
                        const HTTPMethod = HTTPMethodComment.split(/(?<=^\S+)\s/).pop().trim()

                        commentArray.splice(commentArray.indexOf(endpointComment), 1);
                        const endpoint = endpointComment.split(/(?<=^\S+)\s/).pop().split(/\/(.*)/s)[1].trim()

                        commentArray.splice(commentArray.indexOf(descriptionComment), 1);
                        const description = descriptionComment.split(/(?<=^\S+)\s/)

                        const route = "/" + endpoint.split(/\/(.*)/s).shift().trim()

                        const endpointReference = `${HTTPMethod} /${endpoint}`

                        if (endpoints.routes[route] &&
                            endpoints.routes[route][endpointReference] &&
                            !endpoint.endsWith('/')) {
                            
                            endpoints.routes[route][endpointReference].Doc[[description[0]
                                .trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))]] = description[1].trim()

                            if (Object.keys(endpoints.routes[route][endpointReference].Doc).length > 2) {

                                commentArray.forEach(commentLine => {
                                    const [docTag, desc] = commentLine.split(/(?<=^\S+)\s/);

                                    if (keyWords.find(keyWord => keyWord.toUpperCase() === docTag.toUpperCase())) {
                                        endpoints.routes[route][endpointReference].Doc[docTag
                                            .trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))] = desc
                                    }

                                })

                            }

                        }

                    }

                }

            }
        })
    })

    // var s = extract.file(`./index.js`)
    var s = extract.file(`./index.js`).pop().value.replace(/\r\n/g, '').replace(/\*/g, '').split('@')[1]
    // s = s.split(/(?<=^\S+)\s/)
    // console.log(s);


}

module.exports = getComments
