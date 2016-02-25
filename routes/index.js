var express = require('express');
var passport = require('passport');
var User = require('../server/models/user');
var Drawing = require('../server/models/drawing');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { })
});

router.post('/register', function(req, res) {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        function (err, action) {
            if (err) {
                return res.render('register', {});
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
});

router.get('/login', function(req, res) {
    res.render('login', { user: req.user });
});

router.post('/login',
            passport.authenticate('local'),
            function(req, res) {
                res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send('pong!');
});

router.get('/new', function (req, res) {
    res.render('newDrawing');
});

router.post('/new', function (req, res) {
    var drawing = new Drawing({
        title: req.body.title,
        author: req.user ? req.user.username : 'anonymous',
        description: req.body.description,
        category: req.body.category,
        drawing_composition: req.body.drawing_composition.split(','),
        tags: req.body.tags.split(','),
        other: {
            foo: 'bar',
            baz: 42
        }
    });
    drawing.save(function (err, drawing) {
        if (err) { throw err; }
        console.log(drawing);
        res.send('Success');
    });
});

module.exports = router;