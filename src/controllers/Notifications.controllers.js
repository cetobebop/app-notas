import {sigletonInstanceNotification} from "../utils/singletonNotification.js"
import Notes from "../models/Notes.js";

class NotificationsControllers {


    async getNotification(req,res){
        const { userId } = req;

        const singletonNotification = await sigletonInstanceNotification(userId)

        const {idNotes} = singletonNotification

        singletonNotification.idNotes = []
        await singletonNotification.save()


        const notes = await Notes.find({_id: {$in: idNotes}},{},{limit:10}).lean()
       

        return res.json({
            status: "success",
            notification: notes
        })

    }


    async getNotificationLength(req,res){
        const { userId } = req;

        const singletonNotification = await sigletonInstanceNotification(userId)

        const {idNotes} = singletonNotification


        return res.json({
            status: "success",
            notificationLength: idNotes.length
        })

    }



}

export default new NotificationsControllers;