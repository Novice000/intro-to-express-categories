"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("../controllers/note.controller");
const note_middleware_1 = require("../middlewares/note.middleware");
const router = express_1.default.Router();
//get all notes route
router.get('/', note_controller_1.getAllNotesController);
//get single note by id route
router.get('/:id', note_controller_1.getNoteByIdController);
//get notes by category route
router.get('/categories/:id', note_controller_1.getNotesByCategoryController);
//create note route
router.post('/', note_middleware_1.noteFormatValidator, note_controller_1.createNoteController);
//delete note by id route
router.delete('/:id', note_controller_1.deleteNoteByIdController);
//update note by id route
router.put('/:id', note_middleware_1.noteFormatValidator, note_controller_1.updateNoteByIdController);
exports.default = router;
