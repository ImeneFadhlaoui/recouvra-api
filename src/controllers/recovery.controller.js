const Recovery = require('../models/recovery');


exports.createAction = async (req,res) =>
{
    try
    {
        const recovery = await Recovery.create
        (
            {
                invoice: req.body.invoice,
                type: req.body.type,
                description: req.body.description.Recovery,
                createdBy: req.user._id
            }
        );

        res.status(200).json(recovery);
    }
    catch(err)
    {
        res.status(500).json({message: 'Server error'});
    }
}

exports.getAllActions = async (req,res) =>
{
    try
    {
        const actions = await Recovery.find().populate('invoice').populate('createdBy');
        res.status(201).json(actions)
    }
    catch(err)
    {
        res.status(500).json({message: 'Server error'});
    }
};

exports.getAction = async (req,res) =>
{

    try
    {

        const action = await Recovery.findById(req.params.id);
        if(!action)
            return res.status(404).json({message: 'recovery action not found '});
        
        res.status(200).json(action)
    }
    catch(err)
    {
        res.status(500).json({message: 'Server error'});
    }
};

exports.UpdateAction = async (req,res) =>
{
    try
    {
        const action = await Recovery.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true, runValidators: true});
        if(!action)
            return res.status(404).json({message: 'cant update, recovery action not found'});

        res.status(200).json(action);

    }
    catch(err)
    {
        res.status(500).json({message: 'Server error'});
    }
}

exports.deleteAction = async (req,res) =>
{

    try
    {
        await Recovery.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'recovery action successfully deleted'});
    }
    catch(err)
    {
        res.status(500).json({message: 'Server error'});
    }
};