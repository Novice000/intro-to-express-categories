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

export type Note = InferSchemaType<typeof noteSchema>;

export default  mongoose.model<Note>('Notes', noteSchema);
