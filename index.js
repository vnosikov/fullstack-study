const express = require('express');
const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');


const app = express();
passport.use(new GoogleStategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
  }
));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
app.get('/auth/google/callback', passport.authenticate('google'));


const PORT = process.env.PORT || 5000;
app.listen(PORT);
