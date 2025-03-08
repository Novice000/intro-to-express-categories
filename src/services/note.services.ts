import mongoose from "mongoose";
import noteModel, { Note } from "../schemas/note.schema";


// get all notes from db
async function getAllNotes(): Promise<Note[]> { 
    return await noteModel.find();
}


//get a note by id
async function getNoteById(id: string):Promise<Note|null>{
    if(!mongoose.Types.ObjectId.isValid(id)){
        return null;
    }

    return await noteModel.findById(id);
}


// create a note with title and content
async function createNote(note: Note): Promise<Note|null> {

    return await noteModel.create(note);
}


//delete a note by id
async function deleteNoteById(id: string):Promise<Note|null>{

    if(!mongoose.Types.ObjectId.isValid(id)){
        return null;
    }

    return await noteModel.findByIdAndDelete(id);
}


//update a note with title and content
async function updateNoteById(id: string, note: Partial<Omit<Note, 'createdAt'>>):Promise<Note|null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    const existingNote = await noteModel.findById(id);
    if (!existingNote) {
        return null; 
    }

    if (note.title !== undefined) existingNote.title = note.title ;
    if (note.content !== undefined) existingNote.content = note.content;
    existingNote.updatedAt = new Date();

    return await existingNote.save();
}


export {
    getAllNotes,
    getNoteById,
    createNote,
    deleteNoteById,
    updateNoteById
}