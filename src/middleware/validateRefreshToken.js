import jwt from "jsonwebtoken";

export const requireRefreshToken = (req,res,next) => {

    try {
        const { refreshtoken} = req.headers;
        
        if(!refreshtoken) throw Error("Token not exist")

        const decoded = jwt.verify(refreshtoken, process.env.SECRET_REFRESH_TOKEN)

        req.id = decoded.id

        next()
    } catch (error) {

        error = error.message

        console.log(error)
        return res.status(401).json(
           { 
            status: "error",
            errors:[
                {
                    field: "refreshtoken",
                    msg: error
                }
            ]
        }
        )
    }

}