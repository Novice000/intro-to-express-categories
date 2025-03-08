import express from 'express';
import {
    getAllNotesController,
    getNoteByIdController,
    createNoteController,
    deleteNoteByIdController,
    updateNoteByIdController
} from '../controllers/note.controller';

const router = express.Router();

//get all notes route
router.get('/', getAllNotesController);

//get single note by id route
router.get('/:id', getNoteByIdController);

//create note route
router.post('/', createNoteController);

//delete note by id route
router.delete('/:id', deleteNoteByIdController);

//update note by id route
router.put('/:id', updateNoteByIdController);

export default router;