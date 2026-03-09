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
        res.json(payment);
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
        res.json({message:'Payment deleted successfully'});
    }
    catch(err)
    {

        res.status(500).json({message: 'Server error'});
    }
}