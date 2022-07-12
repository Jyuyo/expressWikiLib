const { default: fetch } = require("node-fetch");


const fetchReqResDoc = (endpoint, reqRes) => {

    const url = `${process.env.APIDOC_URL}${endpoint}`

    const requestOptions = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqRes)
    };
    fetch(url, requestOptions)
        .catch(e => console.log(e))
    
}

module.exports = fetchReqResDoc