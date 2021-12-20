const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const User = require('../database/models/user')
let uuid = require('uuid').v4;
const faker = require('faker');

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},async (req, email, password, done) => {
    const user = await User.findOne({email: email})
    if(user) {
        return done(null, false, req.flash('signupMessage', 'The Email is already in use.'));
    }
    const newUser = new User()
    newUser.id = uuid()
    newUser.user = `${req.body.username} ${req.body.lastName}` ;
    newUser.email = email
    newUser.salt = faker.datatype.float();
    newUser.password = newUser.encryptPassword(password, newUser.salt)
    await newUser.save()
    done(null, newUser)
}))

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
        return done(null, false, req.flash('signinMessage', 'User or password are incorrect'));
    }
    if(!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'User or password are incorrect'));
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({id: id})
    done(null, user)
})