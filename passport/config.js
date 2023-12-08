import passport from 'passport';
import session from 'express-session';
import githubStrategy from './githubStrategy.js';
import User from '../models/User.js';

const passportConfig = (app) => {

    passport.use(githubStrategy);

    passport.serializeUser((user, done) => {
      console.log("In serializeUser.");
      let userObject = {
        id: user.username,
        provider: user.provider,
        profileImageUrl: user.photos[0].value
      };
      done(null, userObject);
    });
        
    passport.deserializeUser((user, done) => {
        console.log("In deserializeUser.");
        //without any database lookup.
        done(null, user);
      });
    app.use(session({secret: process.env.SESSION_SECRET, 
                resave: false,
                saveUninitialized: false,
                cookie: {maxAge: 1000 * 60}}))
        .use(passport.initialize())
        .use(passport.session());
}

export default passportConfig;