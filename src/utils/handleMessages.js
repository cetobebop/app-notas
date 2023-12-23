import findUser from "./findUser.js"
import smsMessage from "./smsMessage.js"


export async function handleMessage(_id) {
    const note = await findUser(_id)
    if(note.userId.tlf){
        await smsMessage(note.userId.tlf, note.title, note.message)
    }
    
}

