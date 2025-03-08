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
const mongoose_1 = __importDefault(require("mongoose"));
const note_schema_1 = __importDefault(require("../schemas/note.schema"));
function getAllNotes() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield note_schema_1.default.find();
    });
}
function getNoteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        return yield note_schema_1.default.findById(id);
    });
}
function createNote(note) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield note_schema_1.default.create(note);
    });
}
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Deletes a note by its ID.
 *
 * @param id - The unique identifier of the note to be deleted.
 * @returns The deleted note document, or null if the ID is invalid or the note does not exist.
 */
/******  a331c13b-77de-411c-9805-dffd72f190c1  *******/
function deleteNoteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        return yield note_schema_1.default.findByIdAndDelete(id);
    });
}
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
