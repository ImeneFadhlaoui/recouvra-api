const Client = require("../models/Client");
const Invoice = require("../models/Invoice");

/*                    ****************ALL Invoices****************                     */
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json({
      status: "success",
      results: invoices.length,
      data: { invoices },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/*                    ****************Get Invoice By Id****************                     */
const getInvoiceById = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/*                    ****************Create Invoice****************                     */
const createInvoice = async (req, res) => {
  try {
    const client = await Client.findById(req.body.client);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    const invoice = await Invoice.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*                    ****************Update Invoice****************                     */
const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*                    ****************Delete Invoice****************                     */
const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByIdAndDelete(id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
