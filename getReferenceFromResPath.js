

const getReferenceFromResPath = (method, path) => {

    const route = '/'+path.split('/')[1]

    const reference = `${method.toUpperCase()} ${route}`

    return {route, reference}
}

module.exports = getReferenceFromResPath