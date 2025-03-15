import {Request, Response, NextFunction} from 'express';
import NoteAppError from './errorClass';

function notesErrorHandlingMiddleware(err: Error ,req: Request, res: Response, next: NextFunction){
    if(err instanceof NoteAppError){
        return res.status(err.statusCode).json({status: 'failed', message: err.message});
    }
    else {
        //just so I can see the error
        console.log(err);
        res.status(500).json({status: 'failed', message: 'something went wrong'});
    }
}

function loggingMiddleWare(req: Request, res: Response, next: NextFunction){
    console.log(`${req.method} ${req.url} at ${Date.now().toLocaleString()}`);
    next();
}

function noteFormatValidator(req: Request, res: Response, next: NextFunction){
    if(!('title' in req.body) || !('content' in req.body) || !('category' in req.body)){
        return next(new NoteAppError('Unable to create note: Invalid body', 500));
    }
    next();
}

export {
    notesErrorHandlingMiddleware,
    loggingMiddleWare,
    noteFormatValidator
}