const { default: fetch } = require("node-fetch");


const fetchReqResDoc = (endpoint, reqRes) => {

    const URL = `${process.env.APIDOC_URL}${endpoint}`

    const requestOptions = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqRes)
    };
    fetch(URL, requestOptions)
        .catch(e => console.log(e))
    
}

module.exports = fetchReqResDoc