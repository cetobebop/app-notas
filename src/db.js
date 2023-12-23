import mongoose from "mongoose";
import { config } from "dotenv";

config()

const USER_DB = process.env.USER_DB;
const PASSWORD_DB = process.env.PASSWORD_DB;

export default async function() {
  
   try {
    await mongoose.connect(`mongodb+srv://${USER_DB}:${PASSWORD_DB}@cluster0.mpi76g7.mongodb.net/notas`);
    console.log("Database running")
   } catch (error) {
    console.log("la base de datos se fue pa bajo")
    console.log(error)
   }
}