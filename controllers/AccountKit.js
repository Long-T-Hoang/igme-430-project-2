const Models = require("../models");

// GET request
const getAccountKits = (req, res) => {
    return Models.AccountKit.AccountKitModel.findByAccountID(req.session.account._id, (err, docs) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }

        const result = docs.map((kit) => {
            const resultKit = {
                kitID: kit.kitID,
                quantity: kit.quantity,
            };

            return resultKit;
        });

        return res.json({ kits: result });
    });
};

// POST request
const addAccountKit = (req, res) => {
    const data = req.body;
    //console.log(data);
    return Models.AccountKit.AccountKitModel.findAndUpdate(req.session.account._id, data.kitID, data.quantity, (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }
    });
}

// UPDATE request
const updateAccountKit = (req, res) => {
    const data = req.body;
    console.log(data);
    if(Number(data.quantity) === 0)
    {
        return Models.AccountKit.AccountKitModel.removeByAccountAndKit(req.session.account._id, data.kitID, (err, doc) => {
            if (err) {
              console.log(err);
              return res.status(400).json({ error: 'An error occurred' });
            }
    
            return res.json({ message: "updated successfully" });
        });
    }

    return Models.AccountKit.AccountKitModel.findAndReplace(req.session.account._id, data.kitID, data.quantity, (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }

        return res.json({ message: "updated successfully" });
    });
};

module.exports = {
    getAccountKits,
    addAccountKit,
    updateAccountKit,
};