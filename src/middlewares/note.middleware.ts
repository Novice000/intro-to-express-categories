import {Request, Response, NextFunction} from 'express';
import NoteAppError from './errorClass';

function notesErrorHandlingMiddleware(err: Error ,req: Request, res: Response, next: NextFunction){
    'just so I can see the error'
    console.log(err);
    if(err instanceof NoteAppError){
        return res.status(err.statusCode).json({status: 'failed', message: err.message});
    }
    else res.status(500).json({status: 'failed', message: 'something went wrong'});
}

export default notesErrorHandlingMiddleware