const controllers = require('./controllers');
const path = require('path');

const router = (app) => {
    console.log("in router");

    app.get('/getKit', controllers.Kit.getKit);
    app.get('/getKits', controllers.Kit.getKits);
    app.get('/getAllKits', controllers.Kit.getAllKits);
    app.get('/getComments', controllers.Comment.getComments);
    
    // Return page
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });

    // POST request
    app.post('/addKit', controllers.Kit.addKit);
    app.post('/postComment', controllers.Comment.addComment);

    // DELETE request
    app.delete('/deleteKit', controllers.Kit.deleteKit);
};

module.exports = router;