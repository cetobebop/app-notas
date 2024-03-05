import moment from "moment";
import Notes from "../models/Notes.js";



async function cleanDates() {
  
    await Notes.updateMany(
      { alertIn: {$lt: moment()}},
      { active: false }
    );

    

}

const time = "*/1 * * * *";

export default {
  cleanDates,
  time,
};
