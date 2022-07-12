

const fetchSendDoc = (endpoint, DocAPI) => {

    const URL = `${process.env.APIDOC_URL}${endpoint}`

    const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DocAPI)
    };
    
    fetch(URL, requestOptions)
        .catch(e => console.log(e))

}