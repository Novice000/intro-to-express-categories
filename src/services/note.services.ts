import mongoose from "mongoose";
import noteModel, { INote } from "../schemas/note.schema";
import categoryModel, { ICategory } from "../schemas/category.schema";
import NoteInterface from "../interfaces/note.interfaces";

// get all notes from db
async function getAllNotes(): Promise<INote[]> {
  return await noteModel.find().populate("category");
}

//get a note by id
async function getNoteById(id: string): Promise<INote | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return await noteModel.findById(id).populate("category");
}

// create a note with title and content
async function createNote(note: INote): Promise<INote | null> {
  return (await noteModel.create(note)).populate("category");
}

//delete a note by id
async function deleteNoteById(id: string): Promise<INote | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return await noteModel.findByIdAndDelete(id);
}

//update a note with title and content
async function updateNoteById(id: string, note: INote): Promise<INote | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const existingNote = await noteModel.findById(id).populate("category");
  if (!existingNote) {
    return null;
  }

  if (note.title !== undefined) existingNote.title = note.title;
  if (note.content !== undefined) existingNote.content = note.content;
  existingNote.updatedAt = new Date();

  return await existingNote.save();
}

async function getNotesByCategory(categoryId: string): Promise<INote[]> {
  return await noteModel.find({ category: categoryId }).populate("category");
}

async function getCategoryByName(name: string): Promise<ICategory | null> {
  return await categoryModel.findOne({ name });
}

async function getCategoryById(id: string): Promise<ICategory | null> {
  return await categoryModel.findById(id);
}

export {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNoteById,
  updateNoteById,
  getNotesByCategory,
  getCategoryByName,
  getCategoryById,
};
