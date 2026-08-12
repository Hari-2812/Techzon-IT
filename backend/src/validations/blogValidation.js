import Joi from 'joi';

export const blogSchema = Joi.object({
  // Generic open validation for generation (can be restricted later per model)
}).unknown(true);
