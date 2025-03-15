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
exports.getAllNotes = getAllNotes;
exports.getNoteById = getNoteById;
exports.createNote = createNote;
exports.deleteNoteById = deleteNoteById;
exports.updateNoteById = updateNoteById;
exports.getNotesByCategory = getNotesByCategory;
exports.getCategoryByName = getCategoryByName;
exports.getCategoryById = getCategoryById;
const mongoose_1 = __importDefault(require("mongoose"));
const note_schema_1 = __importDefault(require("../schemas/note.schema"));
const category_schema_1 = __importDefault(require("../schemas/category.schema"));
// get all notes from db
function getAllNotes() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield note_schema_1.default.find().populate("category");
    });
}
//get a note by id
function getNoteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        return yield note_schema_1.default.findById(id).populate("category");
    });
}
// create a note with title and content
function createNote(note) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield note_schema_1.default.create(note)).populate("category");
    });
}
//delete a note by id
function deleteNoteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        return yield note_schema_1.default.findByIdAndDelete(id);
    });
}
//update a note with title and content
function updateNoteById(id, note) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        const existingNote = yield note_schema_1.default.findById(id);
        if (!existingNote) {
            return null;
        }
        if (note.title !== undefined)
            existingNote.title = note.title;
        if (note.content !== undefined)
            existingNote.content = note.content;
        existingNote.updatedAt = new Date();
        return yield existingNote.save();
    });
}
function getNotesByCategory(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield note_schema_1.default.find({ category: categoryId }).populate("category");
    });
}
function getCategoryByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield category_schema_1.default.findOne({ name });
    });
}
function getCategoryById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield category_schema_1.default.findById(id);
    });
}
