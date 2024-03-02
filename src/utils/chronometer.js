import Notes from "../models/Notes.js";
import moment from "moment-timezone";

import emiters from "../events/emiters.js"

let dates = []

async function action() {
  const now = moment.tz("America/Caracas");
 

  try {
    const notes = await Notes.find({active: true}, { alertIn: 1, userId: 1 }).lean();
    if (notes.length) {

      for (const note in notes) { 
      
        const diff = moment(notes[note].alertIn).diff(now, "ms");
        
        if(diff <= 180000 && diff >= 0 && !dates.includes(notes[note]._id.toString())){
            dates.push(notes[note]._id.toString())
            
            setTimeout(async ()=>{  

              if(await Notes.findById(notes[note]._id).lean()){
                emiters.finished_note(notes[note]._id.toString(), notes[note].userId.toString())
              }

              

                  
            },diff)

           
        }

      }

    }
  } catch (error) {
    console.log(error)
    console.log("hubo un error con la tarea");
  }
}

const time = "* * * * *";

export default {
  time,
  action,
};
