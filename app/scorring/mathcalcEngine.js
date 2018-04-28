var process = function(req){
    // constants
    var answers = [];
    
    // user submissions
    var user = req.user; 
    var userAnswers = req.body;

    console.log('Submitted user: ' + user.local.email);
    console.log('Submitted answers: ' + userAnswers);
}

exports.process = process;