import Joi from 'joi';

export const teamSchema = Joi.object({
  // Generic open validation for generation (can be restricted later per model)
}).unknown(true);
