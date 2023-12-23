import moment from "moment";
import Notes from "../models/Notes.js";



async function cleanDates() {
  
    await Notes.updateMany(
      { alertIn: {$lt: moment()}},
      { active: false }
    );

    console.log("status de notas cambiados");

}

const time = "00 10 * * *";

export default {
  cleanDates,
  time,
};
