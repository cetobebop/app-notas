import mongoose  from "mongoose";


const {model,Schema} = mongoose;


const NotificationSchema = new Schema({
   
   idNotes: {
    type: Array,
    default: []
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: "Users"
   }

},{timestamps: true})

export default model("Notifications", NotificationSchema)