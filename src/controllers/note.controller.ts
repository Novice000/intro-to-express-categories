import { NextFunction, Request, Response } from "express";
import {
    getAllNotes,
    getNoteById,
    createNote,
    deleteNoteById,
    updateNoteById,
    getNotesByCategory,
    getCategoryByName,
} from "../services/note.services";
import NoteAppError from "../middlewares/errorClass";
import { INote } from "../schemas/note.schema";
import NoteInterface from "../interfaces/note.interfaces";
import categoryModel from "../schemas/category.schema";

async function getAllNotesController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const notes = await getAllNotes();
        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
}

async function getNoteByIdController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const id = req.params.id;
    try {
        const note = await getNoteById(id);
        if (!note) {
            return next(new NoteAppError("notes with id " + id + " not found", 404));
        }
        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
}

async function createNoteController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const body: NoteInterface = req.body;

    if (!body.title || !body.content || !body.category) {
        return next(new NoteAppError("Unable to create note: Invalid body", 400));
    }

    try {
        // Convert category name to lowercase for consistency
        const categoryName = body.category.toLowerCase();

        let category = await categoryModel.findOneAndUpdate(
            { category: categoryName }, // Search for existing category
            { category: categoryName },
            { upsert: true, new: true } // Upsert: create if doesn't exist
        );
        // Create the note with the category ID
        const newNote = await createNote({
            ...body,
            category: category._id,
        } as INote);

        if (!newNote) {
            return next(new NoteAppError("Unable to create note, please retry", 500));
        }

        res.status(201).json(newNote);
    } catch (err) {
        next(err);
    }
}


async function deleteNoteByIdController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const id = req.params.id;
    try {
        const note = await deleteNoteById(id);
        if (!note) {
            return next(new NoteAppError("notes with id " + id + " not found", 404));
        }
        res.status(202).json(note);
    } catch (err) {
        next(err);
    }
}

async function updateNoteByIdController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const id = req.params.id;
    const body: Partial<NoteInterface> = req.body;
    let note: INote | null;
    try {
        if (!("title" in body) && !("content" in body) && !("category" in body)) {
            return next(new NoteAppError("Unable to update note: Invalid body", 500));
        }
        if (body.category !== undefined) {
            let category = await getCategoryByName(body.category.toLowerCase());
            if (!category) {
                category = await categoryModel.create({ category: body.category.toLowerCase() });
            }
            note = await updateNoteById(id, { ...body, category: category._id } as INote);
        } else {
            note = await updateNoteById(id, { ...body } as unknown as INote);;
        }
        if (!note) {
            return next(
                new NoteAppError(
                    "notes with id " + id + " not found or invalid request body",
                    404
                )
            );
        }
        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
}

async function getNotesByCategoryController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const id = req.params.id;
    try {
        const notes = await getNotesByCategory(id);
        if (notes.length === 0) {
            return next(
                new NoteAppError("notes with category " + id + " not found", 404)
            );
        }
        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
}

export {
    getAllNotesController,
    getNoteByIdController,
    createNoteController,
    deleteNoteByIdController,
    updateNoteByIdController,
    getNotesByCategoryController,
};
