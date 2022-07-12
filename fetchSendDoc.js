const { default: fetch } = require("node-fetch");


const fetchSendDoc = (endpoint, DocAPI) => {

    const url = `${process.env.APIDOC_URL}${endpoint}`

    const requestOptions = {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DocAPI)
    };
    
    fetch(url, requestOptions)
        .catch(e => console.log(e))

}

module.exports = fetchSendDoc