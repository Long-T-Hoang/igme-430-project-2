const Models = require('../models');

// GET requests
const getKits = (req, res) => {
    const kitData = req.query;
    console.log(kitData);

    if(kitData.name === '') kitData.name = undefined;
    if(kitData.releaseYear === '') kitData.releaseYear = undefined;

    return Models.Kit.KitModel.findByNameAndYear(kitData, (err, docs) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }
        return res.json({ kits: docs });
    });
};
  
const getAllKits = (req, res) => {
    return Models.Kit.KitModel.findAll((err, docs) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }
        return res.json({ kits: docs });
    });
};
  
const getKit = (req, res) => {
    const kitData = req.query;
    return Models.Kit.KitModel.findByID(kitData.id, (err, docs) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }
        return res.json({ kits: docs });
    });
};
  
// POST requests
const addKit = (req, res) => {
    const kitData = req.body;
    
    if (!kitData.name || !kitData.releaseYear || !kitData.msrp) {
      return res.status(400).json({ error: 'name, releaseYear and msrp are required' });
    }
    
    const newKit = new Models.Kit.KitModel(kitData);

    const kitPromise = newKit.save();

    kitPromise.catch((err) => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(400).json({ error: 'Kit already exists.' });
        }
    
        return res.status(400).json({ error: 'An error occurred' });
    });
    
    return kitPromise;
};

// DELETE request
const deleteKit = (req, res) => {
    return Models.Kit.KitModel.removeByID(req.query.id, (err, docs) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }
        return res.json({ kits: docs });
    });
};

module.exports = {
    getKits,
    getAllKits,
    getKit,
    addKit,
    deleteKit,
};