var express = require('express');
var passport = require('passport');
var router = express.Router();

// import routes
var newDrawingRouter = require('./newDrawingRouter');

// import controllers
var registerCtrl = require('../controllers/registerCtrl');
var apiCtrl = require('../controllers/apiCtrl');

// new_drawing (post)
router.use('/new_drawing', newDrawingRouter);

// register
router.post('/register', registerCtrl.post);

// login
router.post('/login',
            passport.authenticate('local'),
            function(req, res) {
                console.log(req.user.username + " is logged in");
                res.json(req.user);
});

// logout
router.get('/logout', function(req, res) {
    req.logout();
    res.send("Logout successfully!")
});

// API
// drawings
router.get('/api/drawings', apiCtrl.drawings);

// categories
router.get('/api/categories', apiCtrl.categories);

// category:url
router.get('/api/category/:url', apiCtrl.category);

// 'any uri, because we use react-router'
// Should be placed at the very end for the rest 'get' requests work
router.get('*', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});


module.exports = router;
