import { validateId } from "../utils/validateId.js";

export function validateParams (req,res,next){
    const {_id} = req.params;
    
    const errors = validateId(_id, "_id")
    
    if(errors.length){
        return res.status(400).json({
            status: "error",
            errors
        })
    }

    return next()

}