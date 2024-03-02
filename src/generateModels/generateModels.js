import Tags from "../models/Tags.js";


export async function tags() {
    
    if(!await Tags.estimatedDocumentCount()){
        await Promise.all([
            new Tags({name:"Trabajo", color:"red"}).save(),
            new Tags({name:"Estudio", color: "blue"}).save(),
            new Tags({name:"Importante", color: "black"}).save(),
            new Tags({name:"Diversión", color: "green"}).save(),
            new Tags({name:"Sin marcar", color: "grey"}).save(),
        ])
    }
    
}

 