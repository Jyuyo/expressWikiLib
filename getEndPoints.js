
const getEndPoints = (app, Name) => {

    const routes = {
        /**
         * {
         *      name: name
         *      routes: {}
         * }
         */
        Name,
        routes: {}
    }

    const getEndpointsRoute = (route) => {

        /**
         * {    
         *      name: name
         *      routes: {
         *          route: {}
         *      }
         * }
         */

        if (!Object.keys(routes.routes).includes(route)) {

            routes.routes[route] = {}

        }

    }

    const getEndpoint = (HTTPMethod, endpoint, route) => {

        /**
         * {    
         *      name: name
         *      routes: {
         *          route:{
         *              HTTPMethod endpoint: {
         *                  Doc: {
         *                      HTTPMethod: Endpoint Method,
         *                      URL:        Endpoint URL
         *                  }
         *              }
         *          }
         *      }
         * }
         */
        const endpointReference = `${HTTPMethod} ${endpoint}`
        // console.log(endpointReference);

        routes.routes[route][endpointReference] = {}

        routes.routes[route][endpointReference].Doc = {


            HTTPMethod: HTTPMethod.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
            URL: endpoint.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))

            // ...routes.routes [path.concat( split( layer.regexp ) ).filter( Boolean )[0]]
        }

    }

    const print = (path, layer) => {
        if (layer.route) {

            layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))

        } else if (layer.name === 'router' && layer.handle.stack) {

            // console.log(layer.regexp);

            layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))

        } else if (layer.method) {

            const endpoint = "/" + path.concat(split(layer.regexp)).filter(Boolean).join('/')
            const HTTPMethod = layer.method.toUpperCase()
            const route = verifyRoute(path.concat(split(layer.regexp)).filter(Boolean)[0])

            getEndpointsRoute(route)

            getEndpoint(HTTPMethod, endpoint, route)

            // console.log( `${layer.method.toUpperCase()} ${path.concat( split( layer.regexp ) ).filter( Boolean ).join('/')}` );

        }
    }

    const split = (thing) => {
        if (typeof thing === 'string') {
            return thing.split('/')
        } else if (thing.fast_slash) {
            return ''
        } else {
            var match = thing.toString()
                .replace('\\/?', '')
                .replace('(?=\\/|$)', '$')
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
            return match
                ? match[1].replace(/\\(.)/g, '$1').split('/')
                : '<complex:' + thing.toString() + '>'
        }
    }

    const verifyRoute = (route) => {
        if (route !== undefined){
            return "/"+route
        } else {
            return "/"
        }
        
    }

    app._router.stack.forEach(print.bind(null, []))
    return routes

}

module.exports = getEndPoints
