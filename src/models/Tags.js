import mongoose  from "mongoose";
import app from "../app.js";


const {model,Schema} = mongoose;


const tagsSchema = new Schema({
   
    name: String,
    color: String

})

tagsSchema.pre("save", async ()=>{
   const tags = await model("Tags", tagsSchema).find({}, "_id", {lean: true})
   app.locals.tagsId = tags.map(t => t._id.toString())
})


export default model("Tags", tagsSchema)