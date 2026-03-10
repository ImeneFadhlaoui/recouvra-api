const joi = require('joi');
exports.createRecoverySchema = joi.object

({
    invoice: joi.string().required(),
    type: joi.string().valid("call","email","letter","legal").required().messages
    ({
        'any.only': 'type must be email, call, letter or legal',
        'any.required': 'recovery action type is required'
    }),
    description: joi.string().max(500).messages
    ({
        'string.max': 'desciption length must be less than 500 characters'
    })
});

exports.updateRecoverySchema = joi.object
({
    type: joi.string().valid("call","email","letter","legal").messages
    ({
        'any.only': 'type must be email, call, letter or legal'

    }),
    description: joi.string().max(500).messages
    ({
        'string.max': 'desciption length must be less than 500 characters'
    })
});