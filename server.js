'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

//db config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://maverick:maverick5@ds111851.mlab.com:11851/mern-tutorial');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
    res.json({ message: 'API Initialized!'});
});

// adding the /comments route to our /api router
router.route('/comments')
// retrieve all comments from the database
.get((req, res) => {
   //looks at out Comment Scheme
    Comment.find(function(err, comments) {
        if (err)
            res.send(err);
        // responds with json object of our database comments.
        res.json(comments)
    });
})

// post new comment to the database
.post((req, res) => {
    const comment = new Comment();
    // bodyParser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save((err) => {
        if (err)
            res.send(err);
        res.json({ message: 'Comment successfully added!' });
    });
});

router.route('/comments/:comment_id')
// The put method gives us the chance to update our comment
//  based on the ID passed to the router.
    .put((req, res) => {
    Comment.findById(req.params.comment_id, (err, comment) => {
        if(err)
            res.send(err);
        // setting the new author text to whatever was changed. If nothing
        // was changed we will not alter the field
        ( req.body.author ) ? comment.author = req.body.author : null;
        ( req.body.text ) ? comment.text = req.body.text : null;
        // save comment
        comment.save((err) => {
            if(err)
                res.send(err);
            res.json({ message: 'Comment has been updated' });
        });
    });
})

// delete method for removing a comment from our database
.delete((req, res) => {
    // selects the comment by its ID, then removes it.
    Comment.remove({ _id: req.params.comment_id }, (err, comment) => {
        if (err)
            res.send(err);
        res.json({ message: 'Comment has been deleted' })
    })
});

//Use our router configuration when we call /api
app.use('/api', router);

app.listen(port, () => {
    console.log(`api running on port ${port}`)
});