import mongoose  from "mongoose";
import moment from 'moment-timezone';

const {model, Schema} = mongoose;


const notasSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    },
    title: {
        type: String,
        default: "Sin Titulo"
    },
    alertIn: {  
        type: Date,
        default: moment.tz("America/Caracas").add(5,"m")
    },
    message: {
        type: String,
        default: "No definido"
    },
    active: {
        type: Boolean,
        default: true
    },
    tag:{
        type: Schema.Types.ObjectId, 
        ref: 'Tags'
    }


})

notasSchema.index({title: "text", message: "text"})

export default model("Notes", notasSchema)