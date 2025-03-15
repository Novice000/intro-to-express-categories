import mongoose, {InferSchemaType} from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    content:{
        type: String,
        required: true
    }, 
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    }
    ,
    createdAt:{
        type: Date,
        required: true,
        immutable: true,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        required: true,
        default: Date.now
    },
}
)

//infers the type of note from the schema
export interface INote extends InferSchemaType<typeof noteSchema>{
    _id?: mongoose.Types.ObjectId
}

export default  mongoose.model<INote>('NotesWithCategories', noteSchema);
