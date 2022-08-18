const moment = require("moment");


const checkType = (item) => {
    if( item === null ){
        return null
    }

    else if ( Array.isArray(item) ) {
        return 'array'
    } 
    
    else if ( typeof item === 'object' ) {
        return 'object'
    } 
    
    else {
        switch (typeof item) {
            case 'string': {
                if ( !isNaN(item) ) {
                    return 'number'
                }
                if( moment(item).isValid() ){
                    return '10-10-2010'
                } 
                return 'string'
            }
            case 'number': {
                return 0
            }
            case 'boolean': {
                return false
            }
        }
    }
} 


const objectToSchema = (object, objectSchema = {}) => {

    Object.keys(object).forEach(key => {

        const type = checkType(object[key])
        switch(type){
            case 'array':{
                objectSchema[key] = []
                const arrayType = checkType(object[key][0])

                if(arrayType === 'array'){
                    objectSchema[key][0] = []
                    objectToSchema(object[key][0], objectSchema[key][0])
                } else if(arrayType === 'object'){
                    objectSchema[key][0] = {}
                    objectToSchema(object[key][0], objectSchema[key][0])
                } else {
                    objectSchema[key][0] = arrayType
                }

                break;
            }
            case 'object':{
                objectSchema[key] = {}
                objectToSchema(object[key], objectSchema[key])
                break;
            }
            default: {
                objectSchema[key] = type
            }
        }

    })

    return objectSchema
}

module.exports = objectToSchema