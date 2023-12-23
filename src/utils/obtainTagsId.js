import Tags from "../models/Tags.js"
import app from "../app.js"

export default async function () {
    const tags = await Tags.find({}, "_id", {lean: true})
    app.locals.tagsId = tags.map(t => t._id.toString())
    
}