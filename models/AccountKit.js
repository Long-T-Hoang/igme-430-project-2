const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

const convertId = mongoose.Types.ObjectId;

const AccountKitSchema = new mongoose.Schema({
    accountID: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
  
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
  
    kitID: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
});

AccountKitSchema.statics.findByAccountID = (accountID , callback) => {
    const search = {
        accountID: accountID,
    };
  
    return AccountKitModel.find(search).select('quantity kitID').lean().exec(callback);
};

AccountKitSchema.statics.findByAccountAndID = (accountID, kitID, callback) => {
    const search = {
        accountID: accountID,
        kitID: kitID,
    };

    return AccountKitModel.find(search).select('quantity').lean().exec(callback);
}

AccountKitSchema.statics.removeByAccountAndKit = (accountID, kitID, callback) => {
    const search = {
        kitID: kitID,
    };
    
    if(accountID) search.accountID = accountID;
    console.log(search);
    return AccountKitModel.deleteOne(search).exec(callback);
};

AccountKitSchema.statics.findAndUpdate = (accountID, kitID, newQuantity, callback) => {
    const search = {
        accountID: accountID,
        kitID: kitID,
    };

    const update = {
        $inc: {'quantity': newQuantity}
    };
    
    return AccountKitModel.updateOne(search, update, { upsert: true }).exec(callback);
};

AccountKitSchema.statics.findAndReplace = (accountID, kitID, newQuantity, callback) => {
    const search = {
        accountID: accountID,
        kitID: kitID,
    };

    const update = {
        quantity: newQuantity,
    };
    
    return AccountKitModel.updateOne(search, update).exec(callback);
};

const AccountKitModel = mongoose.model('AcountKit', AccountKitSchema);

module.exports.AccountKitSchema = AccountKitSchema;
module.exports.AccountKitModel = AccountKitModel;