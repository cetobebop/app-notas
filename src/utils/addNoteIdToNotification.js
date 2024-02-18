import {sigletonInstanceNotification} from "./singletonNotification.js"

export async function addNoteToNotification (userId, noteId) {
   try {
      console.log(userId, " userId addNoteToNotification")
   const notification = await sigletonInstanceNotification(userId)

   notification.idNotes.push(noteId)

   await notification.save()
   } catch (error) {
      console.log("otro error en addNoteToNotification.js")
   }
}