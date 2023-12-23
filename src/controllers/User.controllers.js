import parsePhoneNumber, {isValidPhoneNumber}  from 'libphonenumber-js'

import User from '../models/User.js';

class UserControllers{

    async updateUser(req,res){

        const {tlf = 0} = req.body;
        const {_id} = req.params;

        const errors = this.validateBody(req)

        if(errors.length){
            return res.status(400).json({
                status: "error",
                errors
            })
        }

        try {
            
            const {number} = parsePhoneNumber(tlf, "VE")

            const user = await User.findByIdAndUpdate(_id, {tlf: number},{new: true})

            return res.json({
                status: "success",
                user:{
                    tlf: user.tlf
                }
            })

        } catch (error) {
            return res.status(500).json({
                status: "error",
                msg: "server error"
            })
        }



    }

    validateBody(req){
        const {tlf} = req.body

        const errors = []

        if(tlf){


            if(typeof tlf !== "string") errors.push({
                field: "tlf",
                msg: "is not a string"
            })
            else if(typeof tlf === "string"){
                if(!isValidPhoneNumber(tlf, "VE")) errors.push({
                    field: "tlf",
                    msg: "invalid format"
                })

            }
        }


        return errors
    }


}

export default new UserControllers