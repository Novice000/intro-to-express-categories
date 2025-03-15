import express, { NextFunction, Request, Response } from "express";
import connectToDB from "./db";
import noteRouter from './routes/note.routes'
import {notesErrorHandlingMiddleware, loggingMiddleWare} from './middlewares/note.middleware'
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/notes', noteRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction)=> {
    notesErrorHandlingMiddleware(err, req, res, next)
});

connectToDB()
.then(()=>{
    app.listen(port, () => {console.log('Express server running on port ' + port)});
    console.log('port should be: ' + process.env.PORT);
}).catch((err)=>{
    console.log('Error connecting to database: ' + err);
    process.exit(1);
});



