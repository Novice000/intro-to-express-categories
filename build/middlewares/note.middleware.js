"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesErrorHandlingMiddleware = notesErrorHandlingMiddleware;
exports.loggingMiddleWare = loggingMiddleWare;
exports.noteFormatValidator = noteFormatValidator;
const errorClass_1 = __importDefault(require("./errorClass"));
function notesErrorHandlingMiddleware(err, req, res, next) {
    if (err instanceof errorClass_1.default) {
        return res.status(err.statusCode).json({ status: 'failed', message: err.message });
    }
    else {
        //just so I can see the error
        console.log(err);
        res.status(500).json({ status: 'failed', message: 'something went wrong' });
    }
}
function loggingMiddleWare(req, res, next) {
    console.log(`${req.method} ${req.url} at ${Date.now().toLocaleString()}`);
    next();
}
function noteFormatValidator(req, res, next) {
    if (!('title' in req.body) || !('content' in req.body) || !('category' in req.body)) {
        return next(new errorClass_1.default('Unable to create note: Invalid body', 500));
    }
    next();
}
