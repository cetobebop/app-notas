import mongoose  from "mongoose";
import moment from 'moment-timezone';

const {model,Schema} = mongoose;


const pruebaSchema = new Schema({

    index: Number,
    title: {
        type: String,
        default: "Sin Titulo"
    },
    alertIn: {  
        type: String,
        default: moment.tz("America/Caracas").add(2,"m").format()
    },
    message: {
        type: String,
        default: "No definido"
    },
    tags: {
        type: Array,
        default: ["perro", "gato", "sapo"]
    }


})

export default model("prueba", pruebaSchema)