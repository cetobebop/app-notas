import app from "./app.js";
import db from "./db.js";
import {cronjob} from "./utils/cronjob.js";
import {tags} from "./generateModels/generateModels.js";
import obtainTagsId from "./utils/obtainTagsId.js";

import { createNote, createPruebas,queries, momentDate, objectIds, phone, appLocal } from "./test/note.js";


db().then(async ()=>{
    cronjob()
    await tags()
    await obtainTagsId()
})

//////////////////////////
// appLocal()
// createNote()
// createPruebas()
// queries()
// momentDate()
// objectIds("123456789101")
// phone()
//////////////////////////

app.listen(process.env.PORT || 5000, ()=>{
    console.log("server running")
})