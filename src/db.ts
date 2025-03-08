import mongoose from "mongoose";

const connection_uri = process.env.MONGODB_URI || "mongodb+srv://maxwellefemena:XQ73qgt7fFiTluOD@notesdb.9bkwa.mongodb.net/?retryWrites=true&w=majority&appName=NotesDB";


export default function connectToDB(){
   return mongoose.connect(connection_uri);
}