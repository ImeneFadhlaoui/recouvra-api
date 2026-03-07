const Client = require("../models/Client"); 


/*                    ****************ALL Clients****************                     */
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({
      status: "success",
      results: clients.length,
      data: { clients },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/*                    ****************Get Client By Id****************                     */
const getClientById = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/*                    ****************Create Client****************                     */
const createClient = async (req, res) => {
    try{
         const client = await Client.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ client });
    } catch (error){
   res.status(500).json({ message: error.message });
    }
 
};

/*                    ****************Update Client****************                     */
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*                    ****************Delete Client****************                     */
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
