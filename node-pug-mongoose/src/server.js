const express = require('express');
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path');
const routes = require('./routes/routes');

const app = express();
require('./database/database')
require('./passport/local-auth')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }))

app.use(session({ 
    secret: 'secretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.signinMessage = req.flash('signinMessage')
    app.locals.user = req.user;
    console.log(app.locals)
    next()
})

app.use(routes);

app.listen(3000, () => {
    console.log('escuchando el puerto 3000');
})