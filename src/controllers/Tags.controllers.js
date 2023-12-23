import Tags from "../models/Tags.js";


class TagsControllers {


    async getTags(req,res){

        const tags = await Tags.find().lean()
        
        if(!tags.length){
            return res.status(404).json({
                status: "not found"
            })
        }

        return res.json({
            status: "success",
            tags
        })
    }



}

export default new TagsControllers;