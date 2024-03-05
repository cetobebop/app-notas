import User from "../models/User.js";
import regExp from "../utils/regExp.js";
import { getToken, getRefreshToken } from "../utils/jwt.js"

class AuthControllers {

    async register(req,res){

        const {password, userEmail} = req.body;
     
        const errors = this.validate(req)

        if(errors.length){
            return res.status(400).json({
                status: "error",
                errors
            })
        }

        const userExist = await User.findOne({userEmail}).lean()

        if(userExist) return res.status(400).json({
            status: "error",
            errors: [{field: "userEmail",
                    msg: "already exist"}]
        })

        const newUser = await User({userEmail, password, messageEmail: userEmail}).save()
        
        const {token} = getToken(newUser._id) 

        const refreshToken = getRefreshToken(newUser._id, res);

        return res.json({
            status: "success",
            refreshToken,
            token,
            id: newUser._id
        })
    }



    async login(req,res){
        const {password, userEmail} = req.body;

    
        const errors = this.validate(req)

        if(errors.length){
            return res.status(400).json({
                status: "errors",
                errors
            })
        }

        const user = await User.findOne({userEmail})
        

        if(!user) return res.status(404).json({
            status: "error",
            errors: [{field: "userEmail",
                    msg: "not exist"}]
        })

        const passwordIsValid = await user.comparePassword(password)

        if(!passwordIsValid) return res.status(401).json({
            status: "error",
            errors: [{field: "password",
                    msg: "invalid password"}]
        })

        const {token} = getToken(user._id) 

        const refreshToken = getRefreshToken(user._id, res);


        return res.json({
            status: "success",
            refreshToken,
            token,
            id: user._id
      
        })

    }

    logout(res){
        return res.clearCookie('refreshToken').json({
            status: "success"
        });
    }

    validate(req){
        const {password, userEmail} = req.body;
        const errors = [];

        if(userEmail){
            if(typeof userEmail !== "string") errors.push({
                field: "userEmail",
                msg: "is not a string"
            })
            else if (!regExp.email.test(userEmail)) errors.push({
                field: "userEmail",
                msg: "invalid format"
            })
            else if (/\s/.test(userEmail)) errors.push({
                field: "userEmail",
                msg: "has blank spaces"
            })
            else if(userEmail.length <= 6) errors.push({
                field: "userEmail",
                msg: "length is less than six"
            })
        }
        else if(!userEmail) errors.push({
            field: "userEmail",
            msg: "is required"
        })

        if(password){
            if(typeof password !== "string") errors.push({
                field: "password",
                msg: "is not a string"
            })
            else if (/\s/.test(password)) errors.push({
                field: "password",
                msg: "has blank spaces"
            })
            else if(password.length <= 6) errors.push({
                field: "password",
                msg: "length is less than six"
            })
        }
        else if(!password) errors.push({
            field: "password",
            msg: "is required"
        })

        return errors;
    }


}



export default new AuthControllers;