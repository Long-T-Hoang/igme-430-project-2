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
    var kit;
    
    Models.AccountKit.AccountKitModel.findByAccountAndID(req.session.account._id, data.kitID, (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }
        kit = doc;
    });

    const kitData = {
        accountID: req.session.account._id,
        quantity: kit ? kit.quantity + data.quantity : data.quantity,
        kitID: data.kitID,
    };

    const newKit = new Models.AccountKit.AccountKitModel(kitData);

    const kitPromise = newKit.save()
    .then(() => res.json({ message: "kit added successfully" }))
    .catch((err) => {
        console.log(err);
        
        return res.status(400).json({ error: 'An error occurred' });
    });
    
    return kitPromise;
}

// UPDATE request
const updateAccountKit = (req, res) => {
    const data = req.body;
    var kit;

    Models.AccountKit.AccountKitModel.findByAccountAndID(req.session.account._id, data.kitID, (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }
        kit = doc;
    });

    // delete kit from account if the new quantity is 0
    if(data.quantity === 0)
    {
        return Models.AccountKit.AccountKitModel.removeByAccountAndID(req.session.account._id, data.kitID, (err, doc) => {
            if (err) {
              console.log(err);
              return res.status(400).json({ error: 'An error occurred' });
            }
            
            return res.status(201).json({ message: 'Kit removed from account successfully' });
        });
    }
    // otherwise update it
    else
    {
        const kitData = {
            accountID: data.accountID,
            quantity: data.quantity,
            kitID: data.kitID,
        };

        const newKit = new Models.AccountKit.AccountKitModel(kitData);

        const kitPromise = newKit.save()
        .catch((err) => {
            console.log(err);
            
            return res.status(400).json({ error: 'An error occurred' });
        });
        
        return kitPromise;
    }
};

module.exports = {
    getAccountKits,
    addAccountKit,
    updateAccountKit,
};