const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');
const Comment = require('./Comment.js');

const convertId = mongoose.Types.ObjectId;

const KitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
  
    releaseYear: {
      type: Number,
      min: 1970,
      required: true,
    },
  
    msrp: {
      type: Number,
      min: 0,
    },
  
    imageURL: {
      type: String,
      trim: true,
    },
});

KitSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    releaseYear: doc.releaseYear,
    msrp: doc.msrp,
    imageURL: doc.imageURL,
});
  
KitSchema.statics.findByNameAndYear = (searchData , callback) => {
    const search = {};

    if(searchData.name) search.name = searchData.name;
    if(searchData.releaseYear) search.releaseYear = searchData.releaseYear;

    return KitModel.find(search).select('name releaseYear msrp imageURL').lean().exec(callback);
};

KitSchema.statics.findAll = (callback) => {
    return KitModel.find().select('name releaseYear msrp imageURL').lean().exec(callback);
}

KitSchema.statics.findByID = (kitID , callback) => {
    const search = {
        _id: convertId(kitID),
    };

    return KitModel.find(search).select('name releaseYear msrp imageURL').lean().exec(callback);
};

KitSchema.statics.removeByID = (id, callback) => {
    const search = {
        _id: convertId(id),
    };
  
    return KitModel.deleteOne(search).exec(callback);
};

KitModel = mongoose.model('Kit', KitSchema);
  
module.exports.KitModel = KitModel;
module.exports.KitSchema = KitSchema;
  