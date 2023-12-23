import mongoose  from "mongoose";


const {model,Schema} = mongoose;


const NotesChangeStatusSchema = new Schema({
   
   idNotes: {
    type: Array,
    default: []
   }

})

export default model("NotesChangeStatus", NotesChangeStatusSchema)