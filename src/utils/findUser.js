import Notes from "../models/Notes.js";

export default async (_id) => await Notes.findById(_id).populate("userId").lean() 