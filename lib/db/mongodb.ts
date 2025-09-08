"use server"

import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) return;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Erro conexão Mongo:", err);
    throw err;
  }
}
