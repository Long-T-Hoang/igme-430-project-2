const controllers = require('./controllers');
const path = require('path');
const mid = require('./middleware.js');
const multer = require('multer');

// multer set up for uploading files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null, true);
    }
    else
    {
        cb(null, false);
    }
};

const upload = multer({ 
        storage: storage, 
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter,
    });

const router = (app) => {
    console.log("in router");

    // GET requests
    app.get('/getKit', mid.requiresSecure, controllers.Kit.getKit);
    app.get('/getKits', mid.requiresSecure, controllers.Kit.getKits);
    app.get('/getAllKits', mid.requiresSecure, controllers.Kit.getAllKits);
    app.get('/getComments', mid.requiresSecure, controllers.Comment.getComments);
    app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
    app.get('/getAccountKits', mid.requiresLogin, controllers.AccountKit.getAccountKits);
    app.get('/logout', mid.requiresLogin, controllers.Account.logout);
    app.get('/image', controllers.Image.findImage);

    app.get('/uploads/:image', (req, res) => {
        res.sendFile(path.join(__dirname, 'uploads', req.params.image));
    })

    // Return page
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });

    // POST request
    app.post('/addKit', mid.requiresSecure, upload.single('image'), controllers.Kit.addKit);
    app.post('/postComment', mid.requiresSecure, controllers.Comment.addComment);
    app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
    app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
    app.post('/addAccountKit', controllers.AccountKit.addAccountKit);

    // DELETE request
    app.delete('/deleteKit', mid.requiresSecure, controllers.Kit.deleteKit);

    // PUT request
    app.put('/updateAccountKit', mid.requiresLogin, controllers.AccountKit.updateAccountKit);
};

module.exports = router;