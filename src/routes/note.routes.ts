import express from 'express';
import {
    getAllNotesController,
    getNoteByIdController,
    createNoteController,
    deleteNoteByIdController,
    updateNoteByIdController,
    getNotesByCategoryController,
} from '../controllers/note.controller';
import { noteFormatValidator } from '../middlewares/note.middleware';

const router = express.Router();

//get all notes route
router.get('/', getAllNotesController);

//get single note by id route
router.get('/:id', getNoteByIdController);

//get notes by category route
router.get('/categories/:id', getNotesByCategoryController);

//create note route
router.post('/', noteFormatValidator, createNoteController);

//delete note by id route
router.delete('/:id', deleteNoteByIdController);

//update note by id route
router.put('/:id', noteFormatValidator, updateNoteByIdController);

export default router;