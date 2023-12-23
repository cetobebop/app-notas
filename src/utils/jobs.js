import validateDate from "./chronometer.js";
import cleanArrDates from "./cleanArrDates.js";
export default [{
    task: validateDate.action,
    time: validateDate.time
},
{
    task: cleanArrDates.cleanDates,
    time: cleanArrDates.time
}

]