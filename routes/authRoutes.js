//////////////////////////////////////////////////////////////////////////
//ROUTES FOR AUTHENTICATING USERS WITH PASSPORT
//////////////////////////////////////////////////////////////////////////

import passport from 'passport';
import express from 'express';
const authRoute = express.Router();

authRoute.get('/auth/github', passport.authenticate('github'));

authRoute.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log("auth/github/callback reached.");
    res.redirect('/'); //sends user back to login screen; 
                       //req.isAuthenticated() indicates status
  }
);

//LOGOUT route: Use passport's req.logout() method to log the user out and
//redirect the user to the main app page. req.isAuthenticated() is toggled to false.
authRoute.get('/auth/logout', (req, res) => {
    console.log('/auth/logout reached. Logging out');
    req.logout();
    res.redirect('/');
});

//TEST route: Tests whether user was successfully authenticated.
//Should be called from the React.js client to set up app state.
authRoute.get('/auth/test', (req, res) => {
    console.log("auth/test reached.");
    const isAuth = req.isAuthenticated();
    if (isAuth) {
        console.log("User is authenticated");
        console.log("User record tied to session: " + JSON.stringify(req.user));
    } else {
        //User is not authenticated
        console.log("User is not authenticated");
    }
    res.setHeader('Content-Type', 'application/json');
    //Return JSON object to client with results.
    res.json({isAuthenticated: isAuth, user: req.user});
});

//LOGIN route: Attempts to log in user using local strategy
authRoute.post('/auth/login', 
  passport.authenticate('local', { failWithError: true }),
  (req, res) => {
    console.log("/login route reached: successful authentication.");
    //Redirect to app's main page; the /auth/test route should return true
    res.status(200).send("Login successful");
  },
  (err, req, res, next) => {
    console.log("/login route reached: unsuccessful authentication");
    if (req.authError) {
      console.log("req.authError: " + req.authError);
      res.status(401).send(req.authError);
    } else {
      res.status(401).send("Unexpected error occurred when attempting to authenticate. Please try again.");
    }
  });

export default authRoute;