import jwt from "jsonwebtoken";
import { config } from "dotenv";

config()

const SECRET_TOKEN = process.env.SECRET_TOKEN;

export const getToken = id => {
    return jwt.sign({id}, SECRET_TOKEN)
    // jwt.sign({id}, SECRET_TOKEN, { expiresIn: 15 * 60 })
} 


export const verify = (token) => {
    try {
        return jwt.verify(token, SECRET_TOKEN)
    } catch (error) {
        throw error
    }
}


