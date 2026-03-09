const Invoice = require('../models/Invoice');
const Payment = require('../models/payment');
const Client = require('../models/Client');

exports.getStats = async(req,res) =>
{
    try
    {
        const totalClients = await Client.countDocuments();
        const totalInvoices = await Invoice.countDocuments();
        const unpaidInvoices = await Invoice.countDocuments
                                    ({
                                        status: "unpaid"
                                    });
        const paidInvoices = await Invoice.countDocuments
                                    ({
                                        status: "paid"
                                    });
        const partialInvoices = await Invoice.countDocuments
                                    ({
                                        status: "partial"
                                    });
        const payments = await Payment.aggregate
        ([
            { $group: { _id: null, total: {$sum: "$amount"} } }
        ]);

        const recoveredAmount = payments.length>0
                            ? payments[0].total
                            : 0;
        res.json
        ({
            totalClients,
            totalInvoices,
            unpaidInvoicesm,
            paidInvoices,
            partialInvoices,
            recoveredAmount
        })
    }

    catch(err)
    {
        res.status(500).json({message: 'Server error'});
    }
}