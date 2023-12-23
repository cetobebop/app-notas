import eventGlobalInstance from "./eventGlobalInstance.js";

function finished_note(idNote, idUser){
    console.log("emitida", idNote)
    eventGlobalInstance.emit("finished_note", idNote, idUser)
}



export default {
    finished_note
}