
module.exports = function(app, passport) {

//************************************** get routes ******************************************

    app.get('/', function(req, res) {
        res.render('home', {user: req.user, message: req.flash('loginMessage')}); // load the index.ejs file
    });

    app.get('/reading', function(req, res){
        res.render('reading', {user: req.user});
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

//************************************** post routes ******************************************

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
     app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

};

//************************************** get routes ******************************************

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
