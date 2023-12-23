import { Router } from "express";

import NotesControllers from "../controllers/Notes.controllers.js"
import _ from "../middleware/index.js";

const router = Router()

router.use((req,res,next)=>{
    _.validateToken(req,res,next)
})

router.post("/note", (req,res) => {
    NotesControllers.createNote(req,res)
})

router.get("/note", (req,res)=> {
    NotesControllers.getNotes(req,res)
})

router.get("/notetext", (req,res)=> {
    NotesControllers.getTextNotes(req,res)
})

router.get("/note_event", (req,res)=> {
    NotesControllers.notesSSE(req,res)
})

router.use('/note/:_id',(req,res,next)=>{
    _.validateParams(req,res,next)
})

router.post("/note/:_id", (req,res)=>{
    NotesControllers.getOneNote(req,res)
})

router.delete("/note/:_id", (req,res)=>{
    NotesControllers.deleteNote(req,res)
})

router.patch("/note/:_id", (req,res)=>{
    NotesControllers.updateNote(req,res)
})

export default router;

