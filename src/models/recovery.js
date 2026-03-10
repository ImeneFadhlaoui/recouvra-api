const mongoose = require('mongoose');
const recoverySchema = new mongoose.Schema
(
    {
        invoice:
        {
            type:mongoose.Schema.Types.ObjectId,

            ref:'Invoice',
            required:true
        },

        type:
        {
            type:String,
            enum: ["call","email","letter","legal"],
            required: true

        },
        description:
        {

            type:String
        },
        actionDate:
        {


            type:Date,

            default: Date.now
        },
        createdBy:
        {
            type: mongoose.Schema.Types.ObjectId,

            ref: "User"
        }
    },

    {timestamps: true}
);


module.exports = mongoose.model("Recovery",recoverySchema)