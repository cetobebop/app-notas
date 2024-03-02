import moment from "moment";
import { config } from "dotenv";

import Notes from "../models/Notes.js";
import listeners from "../events/listeners.js";
import { validateId } from "../utils/validateId.js";
import app from "../app.js";



import eventGlobalInstance from "../events/eventGlobalInstance.js";

config()


class NotasControllers {
  async createNote(req, res) {
    const { title = "Sin título", alertIn, message = "Sin descripción", tag } = req.body;
    const { userId } = req;

    

    const errors = this.validateBody(req);

    if (errors.length) {
      return res.status(400).json({
        status: "error",
        errors,
      });
    }

    const newNote = await new Notes({
      userId,
      title,
      alertIn: moment(alertIn?.replace(",", " ")),
      message,
      tag,
    }).save();


    return res.json({
      status: "success",
      newNote,
    });
  }



  async getNotes(req, res) {
    const { skip = 0, limit = 10 } = req.query;
    const { tags = app.locals.tagsId, text } = req.body;
    const { userId } = req;
    
    const errors = this.validateQuery(req);
    errors.push(...this.validateTags(req), ...this.validateText(req))
    

    if (errors.length) {
      return res.status(400).json({
        status: "error",
        errors,
      });
    }
    

    try {

      const filter = text ? {userId, $text: {$search: text}} : {userId, tag: {$in: tags}}
      
      const config = {
        skip: parseInt(skip, 10),
        limit: parseInt(limit, 10),
        lean: true,
        sort: "-createdAt"
      }

      const queryNotasTotal = Notes.find(filter);
      const queryNotas = Notes.find(filter,{},config);
       
      const totalNotes = await queryNotasTotal.countDocuments()
      const notes = await queryNotas.exec();

      return res.json({
        status: "success",
        notes,
        totalNotes,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: "error",
      });
    }
  }

  async getOneNote(req,res){
    try {

      const {_id} = req.params

      const note = await Notes.findById(_id).lean()

      if(!note){
        return res.status(404).json({
          status: "not found"
        })
      }

      return res.json({
        status: "success",
        note
      })

    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "server error"
      })
    }
  }

  async deleteNote(req, res) {
    const { _id } = req.params;

    try {
      const deleteNote = await Notes.findByIdAndDelete(_id);

      if (!deleteNote) {
        return res.status(404).json({
          status: "not found",
          msg: "note not exist",
        });
      }

      return res.json({
        status: "success",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "server error",
      });
    }
  }

  async updateNote(req, res) {
    const { _id } = req.params;
    const {title = "Sin título", alertIn, message = "Sin descripción"} = req.body;

    const errors = this.validateBody(req, true);

    if (errors.length) {
      return res.status(400).json({
        status: "error",
        errors,
      });
    }

    try {
      const updateNote = await Notes.findByIdAndUpdate(
        _id,
        { title, alertIn, message },
        { new: true }
      );

      if (!updateNote) {
        return res.status(404).json({
          status: "not found",
          msg: "note not exist",
        });
      }

      return res.json({
        status: "success",
        updateNote,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "server error",
      });
    }
  }

  notesSSE(req, res) {

    const {_id} = req.params;

    const error = validateId(_id, "_id") 

    const myListener = listeners.listener(res, _id)

    if(error.length){
      console.log("error pajuo")
      return res.end("OK")
    }
  
    console.log("acertaste")
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin', '*')

    eventGlobalInstance.on("finished_note"+_id, myListener)    

    req.on("close", () => { 
   
      eventGlobalInstance.removeListener("finished_note"+_id, myListener)
      res.end("OK")
    });
  }

  validateQuery(req) {
    const { skip = 0, limit = 10 } = req.query;
    const errors = [];

    if (isNaN(parseInt(skip, 10)))
      errors.push({
        field: "skip",
        msg: "is not a number",
      });

    if (isNaN(parseInt(limit, 10)))
      errors.push({
        field: "limit",
        msg: "is not a number",
      });

    return errors;
  }

  validateTags(req) {
    const { tags = app.locals.tagsId } = req.body;
    const errors = [];


    if (!Array.isArray(tags))
      errors.push({
        field: "tags",
        msg: "is not a array",
      });

    else if (tags.filter((tag) => !app.locals.tagsId.includes(tag)).length)
      errors.push({
        field: "tags",
        msg: "invalid id in array",
      });

    return errors;
  }

  validateText(req) {
    const {text} = req.body
    const errors = []

    if(text){
      if(!typeof text === "string"){
        errors.push({
          field: "text",
          msg: "is not a string"
        })
      }
      else if(text.length >= 60){
        errors.push({
          field: "text",
          msg: "invalid length"
        })
      }
    }

    return errors
  }

  validateBody(req, isUpdate) {
    const { title = "Sin título", alertIn, message = "Sin Descripción", tag } = req.body;
    const errors = [];

    if (title) {
      if (typeof title !== "string")
        errors.push({
          field: "title",
          msg: "is not a string",
        });
      else if (title.length >= 50)
        errors.push({
          field: "title",
          msg: "length is more than fifty",
        });
        else if (!title.trim())
        errors.push({
          field: "title",
          msg: "is empty",
        });
    } 
    else if (!title)
      errors.push({
        field: "title",
        msg: "is required",
      });

    if (alertIn) {
      if (typeof alertIn !== "string")
        errors.push({
          field: "alertIn",
          msg: "is not a string",
        });
      else if (/\s/.test(alertIn))
        errors.push({
          field: "alertIn",
          msg: "has blank spaces",
        });
      else if (!moment(alertIn.replace(",", " ")).isValid())
        errors.push({
          field: "alertIn",
          msg: "invalid date",
        });
      else if (!moment(alertIn.replace(",", " ")).isAfter(moment()) && !isUpdate)
        errors.push({
          field: "alertIn",
          msg: "late time",
        });
    } else if (!alertIn)
      errors.push({
        field: "alertIn",
        msg: "is required",
      });

    if (message) {
      if (typeof message !== "string")
        errors.push({
          field: "message",
          msg: "is not a string",
        });
      else if (message.length >= 100)
        errors.push({
          field: "message",
          msg: "length is more than one hundred",
        });
        else if (!message.trim())
        errors.push({
          field: "message",
          msg: "is empty",
        });
    } 
    else if (!message)
      errors.push({
        field: "message",
        msg: "is required",
      });

    if (tag) {
      const tagErrors = validateId(tag, "tag");
      if (tagErrors.length) errors.push(...tagErrors);
      else if (!app.locals.tagsId.includes(tag))
        errors.push({
          field: "tag",
          msg: "id not exist",
        });
    } else if (!tag)
      errors.push({
        field: "tag",
        msg: "is required",
      });

    return errors;
  }
}

export default new NotasControllers();
