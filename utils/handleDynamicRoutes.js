



const handleDynamicRoutes = (dynamicRoute = '/data/1', routes =['/data','/data/:id','/data-s/:id','/data/:id/cliente','/data/:id/prducto',]) => {
    
    const dynamicItem = dynamicRoute.split('/')
    const dottedItems = routes.map( dottedRoute => dottedRoute.split('/') ).filter( dottedRoute => dottedRoute.length === dynamicItem.length)
   
    const filteredRoutes = dottedItems.filter( dottedRoute => {

        const itemsComparison = dottedRoute.map( ( item, index ) => {

            if( item === dynamicItem[index] ){
                return true
            } else if (item.includes(':')) {
                return true
            } else {
                return false
            }

        })

        if(itemsComparison.includes(false)){
            return false
        }
        return true
        
    }) 

    return filteredRoutes.shift().join('/')

}

module.exports = handleDynamicRoutes