const Joi = require('joi');

const createInvoiceSchema = Joi.object({
    client: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': 'Le client est obligatoire',
        'string.pattern.base': 'ID client invalide'
    }),
    amount: Joi.number().positive().required().messages({
        'any.required': 'Le montant est obligatoire',
        'number.positive': 'Le montant doit être positif'
    }),
    dueDate: Joi.date().greater('now').required().messages({
        'any.required': "La date d'échéance est obligatoire",
        'date.greater': "La date doit être dans le futur"
    }),
    description: Joi.string().optional(),
    status: Joi.string().valid('pending', 'partial', 'paid', 'overdue', 'cancelled').default('pending')
});

const updateInvoiceSchema = Joi.object({
    amount: Joi.number().positive().optional(),
    dueDate: Joi.date().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('pending', 'partial', 'paid', 'overdue', 'cancelled').optional()
}).min(1);

module.exports = { createInvoiceSchema, updateInvoiceSchema };