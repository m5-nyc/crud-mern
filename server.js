'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Post = require('./model/posts');

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

// adding the /posts route to our /api router
router.route('/posts')
// retrieve all posts from the database
.get((req, res) => {
   //looks at out Post Scheme
    Post.find(function(err, posts) {
        if (err)
            res.send(err);
        // responds with json object of our database posts.
        res.json(posts)
    });
})

// post new post to the database
.post((req, res) => {
    const post = new Post();
    // bodyParser lets us use the req.body
    post.title = req.body.title;
    post.description = req.body.description;

    post.save((err) => {
        if (err)
            res.send(err);
        res.json({ message: 'Post successfully added!' });
    });
});

router.route('/posts/:post_id')
// The put method gives us the chance to update our comment
//  based on the ID passed to the router.
    .put((req, res) => {
    Post.findById(req.params.post_id, (err, post) => {
        if(err)
            res.send(err);
        // setting the new title description to whatever was changed. If nothing
        // was changed we will not alter the field
        ( req.body.title ) ? post.title = req.body.title : null;
        ( req.body.description ) ? post.description = req.body.description : null;
        // save post
        post.save((err) => {
            if(err)
                res.send(err);
            res.json({ message: 'Post has been updated' });
        });
    });
})

// delete method for removing a post from our database
.delete((req, res) => {
    // selects the post by its ID, then removes it.
    Post.remove({ _id: req.params.post_id }, (err, post) => {
        if (err)
            res.send(err);
        res.json({ message: 'Post has been deleted' })
    })
});

//Use our router configuration when we call /api
app.use('/api', router);

app.listen(port, () => {
    console.log(`api running on port ${port}`)
});