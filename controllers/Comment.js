const Models = require('../models');

const addComment = (req, res) => {
    const commentData = {
        kitID: req.body.kitID,
        postedTime: req.body.postedTime, 
        content: req.body.content, 
    };
    if (!commentData.content) {
      return res.status(400).json({ message: "comment cannot be empty" });
    }
    
    const newComment = new Models.Comment.CommentModel(commentData);

    const commentPromise = newComment.save();

    commentPromise.then(() => res.json({ message: "comment added successfully" }));

    commentPromise.catch((err) => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(400).json({ error: 'Comment already exists.' });
        }
    
        return res.status(400).json({ error: 'An error occurred' });
    });
    
    return commentPromise;
};

const getComments = (req, res) => {
    const searchData = req.query;

    return Models.Comment.CommentModel.findByKitID(searchData.id, (err, docs) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }
        return res.json({ comments: docs });
    });
};

module.exports = {
    addComment,
    getComments,
};