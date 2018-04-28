var process = function(req){
    // constants
    var answers = ['b','b','a','a','d','d','b','d','b','b','c','b','d','c','c','c','b','b','a','d','d','b','a','b','b','a','d','a','c','c','d','b','d','d','a','d','a','b','c','d','d','c','c','d'];
    
    // user submissions
    var user = req.user; 
    var userAnswers = req.body;

    console.log('Submitted user: ' + user.local.email);
    console.log('Submitted answers: ' + userAnswers);
}

exports.process = process;