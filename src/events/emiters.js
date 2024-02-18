import eventGlobalInstance from "./eventGlobalInstance.js";

import { addNoteToNotification } from "../utils/addNoteIdToNotification.js";

function finished_note(idNote, idUser){
    console.log("emitida", idNote)
    eventGlobalInstance.emit("finished_note"+ idUser, idNote)
    addNoteToNotification(idUser, idNote)
}



export default {
    finished_note
}