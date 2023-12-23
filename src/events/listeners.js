import eventGlobalInstance from "./eventGlobalInstance.js"


function finished_note(res, userId) {
    console.log("aaa")
    eventGlobalInstance.on("finished_note",(noteId, noteUserId)=>{
        
        console.log((noteUserId.toString() === userId.toString()), " funcion listener")
        if(noteUserId.toString() === userId.toString()){
            console.log("escuchada", noteId)
            res.write('event: message\n');
            res.write(`data: ${noteId}\n`);
        }
      
    })
}

export default {
    finished_note
}