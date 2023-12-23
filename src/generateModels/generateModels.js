import Tags from "../models/Tags.js";


export async function tags() {
    
    if(!await Tags.estimatedDocumentCount()){
        await Promise.all([
            new Tags({name:"Trabajo"}).save(),
            new Tags({name:"Estudio"}).save(),
            new Tags({name:"Importante"}).save(),
            new Tags({name:"Diversión"}).save(),
            new Tags({name:"Sin marcar"}).save(),
        ])
    }
    
}

 