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
exports.getNotesByCategoryController = getNotesByCategoryController;
const note_services_1 = require("../services/note.services");
const errorClass_1 = __importDefault(require("../middlewares/errorClass"));
const category_schema_1 = __importDefault(require("../schemas/category.schema"));
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
                return next(new errorClass_1.default("notes with id " + id + " not found", 404));
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
        if (!body.title || !body.content || !body.category) {
            return next(new errorClass_1.default("Unable to create note: Invalid body", 400));
        }
        try {
            // Convert category name to lowercase for consistency
            const categoryName = body.category.toLowerCase();
            // Use findOneAndUpdate to prevent duplicate key errors
            let category = yield category_schema_1.default.findOneAndUpdate({ category: categoryName }, // Search for existing category
            { category: categoryName }, { upsert: true, new: true } // Upsert: create if doesn't exist
            );
            // Create the note with the category ID
            const newNote = yield (0, note_services_1.createNote)(Object.assign(Object.assign({}, body), { category: category._id }));
            if (!newNote) {
                return next(new errorClass_1.default("Unable to create note, please retry", 500));
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
                return next(new errorClass_1.default("notes with id " + id + " not found", 404));
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
        let note;
        try {
            if (!("title" in body) && !("content" in body) && !("category" in body)) {
                return next(new errorClass_1.default("Unable to update note: Invalid body", 500));
            }
            if (body.category !== undefined) {
                let category = yield (0, note_services_1.getCategoryByName)(body.category.toLowerCase());
                if (!category) {
                    category = yield category_schema_1.default.create({ category: body.category.toLowerCase() });
                }
                note = yield (0, note_services_1.updateNoteById)(id, Object.assign(Object.assign({}, body), { category: category._id }));
            }
            else {
                note = yield (0, note_services_1.updateNoteById)(id, Object.assign({}, body));
                ;
            }
            if (!note) {
                return next(new errorClass_1.default("notes with id " + id + " not found or invalid request body", 404));
            }
            res.status(201).json(note);
        }
        catch (err) {
            next(err);
        }
    });
}
function getNotesByCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const notes = yield (0, note_services_1.getNotesByCategory)(id);
            if (notes.length === 0) {
                return next(new errorClass_1.default("notes with category " + id + " not found", 404));
            }
            res.status(200).json(notes);
        }
        catch (err) {
            next(err);
        }
    });
}
