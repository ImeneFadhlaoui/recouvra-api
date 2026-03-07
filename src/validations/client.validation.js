const Joi = require('joi');

const createClientSchema = Joi.object({
    name: Joi.string().min(2).max(150).required().messages({
        'any.required': 'Le nom est obligatoire',
        'string.min': 'Le nom doit contenir au moins 2 caractères'
    }),
    email: Joi.string().email().required().messages({
        'any.required': "L'email est obligatoire",
        'string.email': "Format d'email invalide"
    }),
    phone: Joi.string().optional(),
    company: Joi.string().optional(),
    status: Joi.string().valid('active', 'inactive', 'blacklisted').default('active')
});

const updateClientSchema = Joi.object({
    name: Joi.string().min(2).max(150).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    company: Joi.string().optional(),
    status: Joi.string().valid('active', 'inactive', 'blacklisted').optional()
}).min(1).messages({
    'object.min': 'Au moins un champ est requis'
});

module.exports = { createClientSchema, updateClientSchema };