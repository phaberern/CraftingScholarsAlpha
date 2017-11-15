
module.exports = function(app, passport) {

    /*==========================================================================*/
    /*-----------------------------GET ROUTES-----------------------------------*/
    /*==========================================================================*/

    app.get('/', function(req, res) {
        res.render('home', {user: req.user}); // load the index.ejs file
    });

    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('home', { message: req.flash('loginMessage') });
    });

    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('home', { message: req.flash('signupMessage') });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('home', {
            user : req.user // get the user out of session and pass to template
        });
    });

    /*==========================================================================*/
    /*-----------------------------POST ROUTES-----------------------------------*/
    /*==========================================================================*/

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
     app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

};

    /*==========================================================================*/
    /*-----------------------------MIDDLEWARE-----------------------------------*/
    /*==========================================================================*/

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
