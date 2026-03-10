const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema(
    {
        invoice: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Invoice',
            required: true
        },
        amount:
        {
            type: Number,
            required:true,
            min:0
        },
        method:
        {

            type: String,

            enum:["cash","bank_transfer","check"],
            default: "cash"
        },
        createdBy:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Payment",paymentSchema);