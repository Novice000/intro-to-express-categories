import { NextFunction, Request, Response } from 'express';
import {getAllNotes, getNoteById, createNote, deleteNoteById, updateNoteById} from '../services/note.services';
import NoteAppError from '../middlewares/errorClass';
import { Note } from '../schemas/note.schema';

async function getAllNotesController(req : Request, res: Response, next: NextFunction):Promise<void>{
    try{
        const notes = await getAllNotes();
        res.status(200).json(notes);
    }catch(err){
        next(err);
    }
}

async function getNoteByIdController(req: Request, res: Response, next: NextFunction):Promise<void>{
    const id = req.params.id;
    try{
        const note = await getNoteById(id);
        if(!note){
            return next(new NoteAppError('notes with id ' + id + ' not found', 404));
        }
        res.status(200).json(note);
    }catch(err){
        next(err);
    }
}

async function createNoteController(req: Request, res: Response, next: NextFunction):Promise<void>{
    const body: Note = req.body;
    if(!('title' in body) || !('content' in body)){
        return next(new NoteAppError('Unable to create note: Invalid body', 500));
    }
    try{
        const newNote = await createNote(body);
        if(!newNote){
            return next(new NoteAppError('Unable to create note, please retry', 500));
        }
        res.status(201).json(newNote);
    }catch(err){
        next(err);
    }
}

async function deleteNoteByIdController(req: Request, res: Response, next: NextFunction):Promise<void>{
    const id = req.params.id;
    try{
        const note = await deleteNoteById(id);
        if(!note){
            return next(new NoteAppError('notes with id ' + id + ' not found', 404));
        }
        res.status(202).json(note);
    }catch(err){
        next(err);
    }
}

async function updateNoteByIdController(req: Request, res: Response, next: NextFunction):Promise<void>{
    const id = req.params.id;
    const body: Partial<Note> = req.body
    try {
        const note = await updateNoteById(id, body);
        if(!note){
            return next(new NoteAppError('notes with id '+ id + ' not found or invalid request body', 404));
        }
        res.status(201).json(note);
    } catch(err){
        next(err)
    }
}

export {
    getAllNotesController,
    getNoteByIdController,
    createNoteController,
    deleteNoteByIdController,
    updateNoteByIdController
}