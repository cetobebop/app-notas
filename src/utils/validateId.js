import mongoose from "mongoose";
const {ObjectId} = mongoose.Types

export function validateId(id, paramName){
    const errors = [];
try {
    
    if(id){
        if(typeof id !== "string") errors.push({
            field: paramName,
            msg: "is not a string"
        })
        else if(!new ObjectId(id) === id) errors.push({
            field: paramName,
            msg: "is not valid mongo id"
        })
    }
    else if(!id) errors.push({
        field: paramName,
        msg: "is required"
    })
} catch (error) {
    errors.push({
        field: paramName,
        msg: "is not valid mongo id"
    })
}
finally{
    return errors
}

   
}