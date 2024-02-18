import { Router } from "express";
import NotificationsControllers from "../controllers/Notifications.controllers.js";
import _ from "../middleware/index.js"
const router = Router()

router.use((req,res,next)=>{
    _.validateToken(req,res,next)
})

router.get("/notification", (req,res)=>{
    NotificationsControllers.getNotification(req,res)
})

router.get("/notificationlength", (req,res)=>{
    NotificationsControllers.getNotificationLength(req,res)
})

export default router;