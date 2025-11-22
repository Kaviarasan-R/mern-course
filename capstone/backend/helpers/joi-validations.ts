import Joi from "joi";

export const registerDto = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Name must be at least 2 characters long",
    "any.required": "Name is required",
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.alphanum": "Username must contain only alphanumeric characters",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be less than 30 characters",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+=-]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-30 characters and include only letters, numbers, or !@#$%^&*()_+=-",
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
}).strict();

export const loginDto = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
}).strict();

export const createPostDto = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  body: Joi.string().required().messages({
    "any.required": "Body is required",
  }),
}).strict();

export const updatePostDto = Joi.object({
  title: Joi.string().optional(),
  body: Joi.string().optional(),
}).strict();
