import Tags from "../models/Tags.js";


export async function tags() {
    
    if(!await Tags.estimatedDocumentCount()){
        await Promise.all([
            new Tags({name:"Trabajo", color:"#85C1E9"}).save(),
            new Tags({name:"Estudio", color: "#48C9B0"}).save(),
            new Tags({name:"Importante", color: "#BB8FCE"}).save(),
            new Tags({name:"Diversión", color: "##F5B041"}).save(),
            new Tags({name:"Sin marcar", color: "#717D7E"}).save(),
        ])
    }
    
}

 