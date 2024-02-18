import { Router } from "express";
import AuthControllers from "../controllers/Auth.controllers.js";
import {obtainRefreshToken} from "../utils/jwt.js";
import _ from "../middleware/index.js"

const router = Router()


router.post("/singup", (req,res)=>{
    AuthControllers.register(req,res)
})

router.post("/login", (req,res)=>{
    AuthControllers.login(req,res)
})

router.get("/logout", (req,res)=>{
    AuthControllers.logout(res)
})

router.use((req,res,next)=>{
    _.requireRefreshToken(req,res,next)
})

router.post("/refresh", (req,res)=>{
    obtainRefreshToken(req,res)
})

export default router;