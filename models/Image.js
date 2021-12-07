const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

const imageModel = mongoose.model("Image", imageSchema);

module.exports.imageSchema = imageSchema;
module.exports.imageModel = imageModel;