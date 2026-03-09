const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    invoiceNumber : {
        type: String,
        unique: true,
    },
    client : {
        type: Schema.Types.ObjectId, ref: 'Client'
    },
    amount : {
        type: Number,
        required: true
    },
    amountPaid : {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'partial','paid', 'overdue', 'cancelled'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
},
{timestamps: true},
);

invoiceSchema.pre("save", async function () {
  if (!this.invoiceNumber) {
    const count = await mongoose.model('Invoice').countDocuments();
    const year = new Date().getFullYear();
    this.invoiceNumber = `INV-${year}-${String(count + 1).padStart(4, '0')}`;
  }
});

const Invoice = mongoose.model('Invoice',invoiceSchema)
module.exports= Invoice;