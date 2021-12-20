const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticated = require('../../lib/authenticated');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/registered',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/singup', (req, res) => {
    res.render('singUp');
});

router.post('/singup', passport.authenticate('local-signup', {
    successRedirect: '/registered',
    failureRedirect: '/singup',
    failureFlash: true
}));

router.get('/logout', authenticated, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/registered', authenticated, (req, res) => {
    res.render('registered');
});

module.exports = router;