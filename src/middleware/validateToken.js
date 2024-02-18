import { verify } from "../utils/jwt.js";

export function validateToken (req,res,next){

    const {x_access_token} = req.headers;
 
    try {
        const decoded = verify(x_access_token)
        
        req.userId = decoded.id

        next()
    } catch (error) {
      
        return res.status(401).json({
            status: "error",
            errors: [{
                field: "x_access_token",
                msg: "invalid token"
            }]
        })
    }

}