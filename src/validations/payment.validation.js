const joi = require('joi');
exports.createPaymentSchema = joi.object

({
    amount: joi.number().positive().required(),
    method: joi.string().valid("cash","bank_transfer","check").default("cash")
});