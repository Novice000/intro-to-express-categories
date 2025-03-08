import mongoose from "mongoose";
import noteModel, { Note } from "../schemas/note.schema";


async function getAllNotes(){
    return await noteModel.find();
}

async function getNoteById(id: string){
    if(!mongoose.Types.ObjectId.isValid(id)){
        return null;
    }
    return await noteModel.findById(id);
}

async function createNote(note: Note){
    return await noteModel.create(note);
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Deletes a note by its ID.
 * 
 * @param id - The unique identifier of the note to be deleted.
 * @returns The deleted note document, or null if the ID is invalid or the note does not exist.
 */

/******  a331c13b-77de-411c-9805-dffd72f190c1  *******/
async function deleteNoteById(id: string){
    if(!mongoose.Types.ObjectId.isValid(id)){
        return null;
    }
    return await noteModel.findByIdAndDelete(id);
}

async function updateNoteById(id: string, note: Partial<Omit<Note, 'createdAt'>>) {
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