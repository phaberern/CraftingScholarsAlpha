var process = function(req){
    // constants
    var answers = ['c','b','a','c','c','b','d','d','a','b','b','d','d','c','a','b','c','c','b','c','d','b','a','a','a','d','d','b','b','a'];
    var freeResponse = [14,7,11,105,15,32,3284,7500];
    
    // user submissions
    var user = req.user; 
    var userAnswers = req.body;

    console.log('Submitted user: ' + user.local.email);
    console.log('Submitted answers: ' + userAnswers);
}

exports.process = process;