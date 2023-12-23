import mongoose from "mongoose";
import Notas from "../models/Notes.js";
import Prueba from "../models/pruebaSchema.js";

import app from "../app.js";

import parsePhoneNumber from "libphonenumber-js";

import moment from "moment";

export async function createNote() {
  const nota = await new Notas().save();

  // const ahora = typeof moment.tz("America/Caracas").add(5,"m")
  // console.log(ahora)
  console.log(nota);
}

export async function createPruebas() {
  let i = 0;
  console.log(
    "longitud total de documentos: " + (await Prueba.countDocuments())
  );

  if (!(await Prueba.countDocuments())) {
    try {
      while (i < 50) {
        i++;

        await new Prueba({ index: i }).save();
      }
    } catch (error) {
      console.log("hubo un error createPruebas()");
    } finally {
      console.log("pruebas creadas");
    }
  }
}

export function appLocal(){
  app.locals.blavla = {a:"1", b:"2"}

  console.log(app.locals.blavla)
} 

export async function queries() {
  const query = Prueba.find({tags: {$in: [""]}});

  // query.all("tags", ["gato"]).setOptions({
  //   limit: 10,
  //   skip: 0,
  // });

  query.setOptions({
    limit: 10,
    skip: 0,
  });

  const prueba = await query.exec();

  // const ahora = typeof moment.tz("America/Caracas").add(5,"m")
  // console.log(ahora)
  console.log(prueba);
  console.log("longitud retornada: " + prueba.length);
}

export function momentDate() {
  const date = moment("2013-02-08 09:30:26");
  console.log(date.isBefore(moment()));
  console.log(date.format());
  console.log(date.isValid());
}

export function objectIds(id) {
  console.log(id);
  const isValid = mongoose.Types.ObjectId.isValid(id);
  console.log(isValid);
  if (isValid) console.log(new mongoose.Types.ObjectId(id) === id);
}

export function phone() {
  const phoneNumber = parsePhoneNumber("1544564", "US");
  if (phoneNumber) {
    phoneNumber.country === "VE";
    phoneNumber.number === "+584120997581";
    phoneNumber.isPossible() === true;
    phoneNumber.isValid() === true;
    console.log(phoneNumber)
    console.log(phoneNumber.isValid() === true)
    // Note: `.getType()` requires `/max` metadata: see below for an explanation.
    
  }
}
