import mongoose, { InferSchemaType} from "mongoose";

const categorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
        unique: true
    }
})

export interface ICategory extends InferSchemaType<typeof categorySchema>{
    _id: mongoose.Types.ObjectId
}

export default mongoose.model<ICategory>('Categories', categorySchema);