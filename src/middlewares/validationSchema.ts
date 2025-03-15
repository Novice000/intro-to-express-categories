import Joi from "joi";

const createNoteSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(5).required(),
  category: Joi.string().min(2).required(),
});

const updateNoteSchema = Joi.object({
  title: Joi.string().min(3),
  content: Joi.string().min(5),
  category: Joi.string().min(2),
}).min(1); // Ensures at least one field is provided

export { createNoteSchema, updateNoteSchema };
