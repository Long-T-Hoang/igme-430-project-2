const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

const CommentSchema = new mongoose.Schema({
    postedTime: {
      type: Date,
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    kitID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    }
});

CommentSchema.statics.findByKitID = (kitID , callback) => {
  const search = {
    kitID: kitID,
  };

  return CommentModel.find(search).select('postedTime content').lean().exec(callback);
};

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports.CommentModel = CommentModel;
module.exports.CommentSchema = CommentSchema;

