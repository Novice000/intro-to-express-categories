import {Request, Response, NextFunction} from 'express';
import NoteAppError from './errorClass';
import colors from 'colors';

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

function loggingMiddleWare(req: Request, res: Response, next: NextFunction) {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toLocaleString();

  // Color coding request methods
  let coloredMethod: string;
  switch(method){
      case 'GET':
        coloredMethod = colors.green(method);
        break;
      case 'POST':
        coloredMethod = colors.blue(method);
        break;
      case 'PUT':
        coloredMethod = colors.yellow(method);
        break;
      case 'DELETE':
        coloredMethod = colors.red(method);
        break;
      default:
        coloredMethod = colors.white(method);
  }

  console.log(`${coloredMethod} ${url} at ${timestamp}`);
  next();
}

function noteFormatValidator(req: Request, res: Response, next: NextFunction){
    if(req.method === 'POST'){
        if(!('title' in req.body) || !('content' in req.body) || !('category' in req.body)){
        return next(new NoteAppError('Unable to create note: Invalid body', 400));
        }
    }else if(req.method === 'PUT'){
        if(!('title' in req.body) && !('content' in req.body) && !('category' in req.body)){
        return next(new NoteAppError('Unable to update note: Invalid body', 400));
        }
    }
    next();
}

export {
    notesErrorHandlingMiddleware,
    loggingMiddleWare,
    noteFormatValidator
}