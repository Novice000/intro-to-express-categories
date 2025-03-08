"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotesController = getAllNotesController;
exports.getNoteByIdController = getNoteByIdController;
exports.createNoteController = createNoteController;
exports.deleteNoteByIdController = deleteNoteByIdController;
exports.updateNoteByIdController = updateNoteByIdController;
const note_services_1 = require("../services/note.services");
const errorClass_1 = __importDefault(require("../middlewares/errorClass"));
function getAllNotesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notes = yield (0, note_services_1.getAllNotes)();
            res.status(200).json(notes);
        }
        catch (err) {
            next(err);
        }
    });
}
function getNoteByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const note = yield (0, note_services_1.getNoteById)(id);
            if (!note) {
                return next(new errorClass_1.default('notes with id ' + id + ' not found', 404));
            }
            res.status(200).json(note);
        }
        catch (err) {
            next(err);
        }
    });
}
function createNoteController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        if (!('title' in body) || !('content' in body)) {
            return next(new errorClass_1.default('Unable to create note: Invalid body', 500));
        }
        try {
            const newNote = yield (0, note_services_1.createNote)(body);
            if (!newNote) {
                return next(new errorClass_1.default('Unable to create note, please retry', 500));
            }
            res.status(201).json(newNote);
        }
        catch (err) {
            next(err);
        }
    });
}
function deleteNoteByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const note = yield (0, note_services_1.deleteNoteById)(id);
            if (!note) {
                return next(new errorClass_1.default('notes with id ' + id + ' not found', 404));
            }
            res.status(202).json(note);
        }
        catch (err) {
            next(err);
        }
    });
}
function updateNoteByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const body = req.body;
        try {
            const note = yield (0, note_services_1.updateNoteById)(id, body);
            if (!note) {
                return next(new errorClass_1.default('notes with id ' + id + ' not found or invalid request body', 404));
            }
            res.status(201).json(note);
        }
        catch (err) {
            next(err);
        }
    });
}
