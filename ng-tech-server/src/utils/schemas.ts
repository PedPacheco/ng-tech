import Joi from "joi";

export const schemas = { 
  user: Joi.object().keys({ 
    username: Joi.string().required().min(3),
    password: Joi.string().regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)).required()
  }) 
}; 
