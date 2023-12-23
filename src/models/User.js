import bcrypt from "bcrypt"
import mongoose  from "mongoose";


const {model,Schema} = mongoose;


const userSchema = new Schema({

    password: String,
    userEmail: String,

    tlf: {
        type: String,
        default: ""
    },

    messageEmail: String, 
    lastSession: Date


})

userSchema.pre("save", async function (){
    
    const user = this;

    if(!user.isModified("password")) return

    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        
    } catch (error) {
        throw new Error("algo fallo en el hash")
    }
})

userSchema.methods.comparePassword = async function (frontPassword){
    return await bcrypt.compare(frontPassword, this.password)  
}

export default model("Users", userSchema)




