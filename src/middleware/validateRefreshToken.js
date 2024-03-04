import jwt from "jsonwebtoken";

export const requireRefreshToken = (req,res,next) => {

    try {
        const {refreshToken} = req.cookies;

        console.log(refreshToken, " refreshToken recibido")
        
        if(!refreshToken) throw Error("Token not exist")

        const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN)

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
                    field: "refreshToken",
                    msg: "invalid"
                }
            ]
        }
        )
    }

}