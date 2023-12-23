import { Router } from "express";

import UserControllers from "../controllers/User.controllers.js";
import _ from "../middleware/index.js";

const router = Router()

router.use((req,res,next)=>{
    _.validateToken(req,res,next)
})

router.use('/user/:_id',(req,res,next)=>{
    _.validateParams(req,res,next)
})


router.patch("/user/:_id", (req,res)=>{
    UserControllers.updateUser(req,res)
})


export default router;

