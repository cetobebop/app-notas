import Notifications from "../models/Notification.js"

export async function sigletonInstanceNotification(userId){

       try {
       
        const oldNotification = await Notifications.findOne({userId})

        if(oldNotification) return oldNotification

        const newNotification = await new Notifications({ userId}).save()

        return newNotification
       } catch (error) {
        // console.log(error)
      console.log("el error es aqui papa")
       }
}
