import jwt from "jsonwebtoken";
import { config } from "dotenv";

config()

const SECRET_TOKEN = process.env.SECRET_TOKEN;
const SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN;

export const getToken = id => {
    const expiresIn= 15 * 60
    const token = jwt.sign({id}, SECRET_TOKEN, { expiresIn }) 
    
    return {token, expiresIn}
} 


export const verify = (token) => {
    try {
        return jwt.verify(token, SECRET_TOKEN)
    } catch (error) {
        throw error
    }
}


export const getRefreshToken = (id, res) => {

    try {
        const expiresIn = 60 * 60 * 24

        const refreshToken = jwt.sign({id}, SECRET_REFRESH_TOKEN, {expiresIn})

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        })
    } catch (error) {
        console.log(error)
    }


}

export const obtainRefreshToken = (req, res) => {

    try {

        const {token} = getToken(req.id)

        res.status(200).json({
            status: "success",
            token
        })
        
    } catch (error) {
        error = error.message
        return res.status(401).json(
           { msg: error}
        )
    }

}

