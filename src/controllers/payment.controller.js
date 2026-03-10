const Payment = require('../models/payment');
const Invoice = require('../models/Invoice');

exports.createPayment = async (req,res) =>
{
    try
    {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice)
            return res.status(404).json({message: 'cant create, invoice not found'});
        if (invoice.amountPaid + req.body.amount > invoice.amount)
            return res.status(400).json({ message: 'Payment exceeds invoice amount' });
        const payment = await Payment.create
        (
            {
                invoice: invoice._id,
                amount: req.body.amount,
                method: req.body.method,
                createdBy: req.user.id
            }
        );

        invoice.amountPaid += payment.amount;

        invoice.status = 
            invoice.amountPaid == invoice.amount
            ? "paid"
            : "partial";
        await invoice.save()
        res.status(201).json(payment)
    }
    catch(err)
    {
        res.status(500).json({message: 'Server error',error: err.message});
    }
}


exports.getAllPayments = async (req,res) =>

    {
        try
        {
            const payments = await Payment.find().populate("invoice").populate("createdBy");
            res.json(payments);
        }
        catch(err)
        {
            res.status(500).json({message: 'Server error'});
        }
    };

exports.getPayment = async (req,res) =>
{

    try
    {
        const payment = await Payment.findById(req.params.id)
                                    .populate("invoice")
                                    .populate("createdBy");

        if(!payment)
            return res.status(404).json({message: 'payment not found'});
        res.status(200).json(payment);
    }
    catch(err)
    {
        res.status(500).json({message: 'Server error'});
    }
};


exports.deletePayment = async (req,res) =>
{

    try
    {
        await Payment.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Payment deleted successfully'});
    }
    catch(err)
    {

        res.status(500).json({message: 'Server error'});
    }
}