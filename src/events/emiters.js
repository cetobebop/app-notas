import eventGlobalInstance from "./eventGlobalInstance.js";

import { addNoteToNotification } from "../utils/addNoteIdToNotification.js";

 function finished_note(idNote, idUser){
    addNoteToNotification(idUser, idNote)
    console.log("emitida", idNote)

    console.log("emiter ejecutado")
    eventGlobalInstance.emit("finished_note"+ idUser, idNote)
    
}



export default {
    finished_note
}