"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorClass_1 = __importDefault(require("./errorClass"));
function notesErrorHandlingMiddleware(err, req, res, next) {
    'just so I can see the error';
    console.log(err);
    if (err instanceof errorClass_1.default) {
        return res.status(err.statusCode).json({ status: 'failed', message: err.message });
    }
    else
        res.status(500).json({ status: 'failed', message: 'something went wrong' });
}
exports.default = notesErrorHandlingMiddleware;
