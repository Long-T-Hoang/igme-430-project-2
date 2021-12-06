const controllers = require('./controllers');
const path = require('path');

const router = (app) => {
    console.log("in router");

    // GET requests
    app.get('/getKit', controllers.Kit.getKit);
    app.get('/getKits', controllers.Kit.getKits);
    app.get('/getAllKits', controllers.Kit.getAllKits);
    app.get('/getComments', controllers.Comment.getComments);
    app.get('/getToken', controllers.Account.getToken);
    app.get('/getAccountKits', controllers.AccountKit.getAccountKits);
    
    // Return page
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });

    // POST request
    app.post('/addKit', controllers.Kit.addKit);
    app.post('/postComment', controllers.Comment.addComment);
    app.post('/login', controllers.Account.login);
    app.post('/signup', controllers.Account.signup);
    app.post('/addAccountKit', controllers.AccountKit.addAccountKit);

    // DELETE request
    app.delete('/deleteKit', controllers.Kit.deleteKit);

    // PUT request
    app.put('/updateAccountKit', controllers.AccountKit.updateAccountKit);
};

module.exports = router;