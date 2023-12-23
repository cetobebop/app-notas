import { Router } from "express";
import TagsControllers from "../controllers/Tags.controllers.js";

const router = Router()

router.get("/tag", (req,res)=>{
    TagsControllers.getTags(req,res)
})

export default router;