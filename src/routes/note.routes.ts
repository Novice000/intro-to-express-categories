import express from 'express';
import {
    getAllNotesController,
    getNoteByIdController,
    createNoteController,
    deleteNoteByIdController,
    updateNoteByIdController
} from '../controllers/note.controller';

const router = express.Router();

router.get('/', getAllNotesController);
router.get('/:id', getNoteByIdController);
router.post('/', createNoteController);
router.delete('/:id', deleteNoteByIdController);
router.put('/:id', updateNoteByIdController);

export default router;