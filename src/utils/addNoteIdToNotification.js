import {sigletonInstanceNotification} from "./singletonNotification.js"

export async function addNoteToNotification (userId, noteId) {
   try {

   const notification = await sigletonInstanceNotification(userId)

   notification.idNotes.push(noteId)

   console.log(4444444444444, " notification id notes ejecutado")
   await notification.save()
   } catch (error) {
      console.log("otro error en addNoteToNotification.js")
   }
}