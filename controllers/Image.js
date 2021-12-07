const Models = require('../models');

const findImage = (req, res) => {
    Model.Image.find({}, (err, docs) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    })
};

const uploadImage = (req, res, next) => {
    const obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.json({ redirect: "/" });
        }
    });
};

module.exports = {
    findImage,
    uploadImage,
};