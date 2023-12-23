import { Router } from "express";
import AuthControllers from "../controllers/Auth.controllers.js"

const router = Router()


router.post("/singup", (req,res)=>{
    AuthControllers.register(req,res)
})

router.post("/login", (req,res)=>{
    AuthControllers.login(req,res)
})


export default router;