const moment = require("moment");


const objectToSchema = (object, objectSchema = {}) => {

    Object.keys(object).forEach(key => {

        if( object[key] === null ){
            objectSchema[key] = null
        }

        else if ( Array.isArray(object[key]) ) {
            objectSchema[key] = []
            objectToSchema(object[key], objectSchema[key])            
        } 
        
        else if ( typeof object[key] === 'object' ) {
            objectSchema[key] = {}
            objectToSchema(object[key], objectSchema[key])
        } 
        
        else {
            switch (typeof object[key]) {
                case 'string': {
                    moment(object[key]).isValid()
                    ? objectSchema[key] = '10-10-2010'
                    : objectSchema[key] = 'string'
                    break;
                }
                case 'number': {
                    objectSchema[key] = 0
                    break;
                }
                case 'boolean': {
                    objectSchema[key] = false
                    break;
                }
            }
        }
    })

    return objectSchema
}

module.exports = objectToSchema