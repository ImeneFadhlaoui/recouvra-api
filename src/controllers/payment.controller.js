const Payment = require('../models/payment');
const Invoice = require('../models/Invoice');

exports.createPayment = async (req,res) =>
{
    try
    {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice)
            return res.status(404).json({message: 'cant create, invoice not found'});
        const payment = await Payment.create
        (
            {
                invoice: invoice._id,
                amount: req.body.amount,
                method: req.body.method,
                createdBy: req.user.id
            }
        );
        if(invoice.amountPaid + payment.amount > invoice.amount)
            return res.status(400).json({message: 'Payment exceeds invoice amount'});

        invoice.amountPaid += payment.amount;

        invoice.status = 
            invoice.amountPaid == invoice.amount
            ? "paid"
            : "partial";
        await invoice.save()
        res.json(payment)
    }
    catch(err)
    {
        res.status(500).json({message: 'Server error'});
    }
}