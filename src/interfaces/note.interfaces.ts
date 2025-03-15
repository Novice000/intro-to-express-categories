interface ICategory {
    category: string
}

interface NoteInterface extends ICategory{
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date
}

export default NoteInterface