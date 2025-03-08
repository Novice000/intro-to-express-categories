"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectToDB;
const mongoose_1 = __importDefault(require("mongoose"));
const connection_uri = process.env.MONGODB_URI || "mongodb+srv://maxwellefemena:XQ73qgt7fFiTluOD@notesdb.9bkwa.mongodb.net/?retryWrites=true&w=majority&appName=NotesDB";
function connectToDB() {
    return mongoose_1.default.connect(connection_uri);
}
