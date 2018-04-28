var process = function(req){
    // constants
    var answers = ['c','b','a','a','c','d','a','c','b','c','c','b','d','a','d'];
    var freeResponseAnswers = [
        [3,6,9],
        [19],
        [12],
        [6],
        [1/4, .25]
    ];
    
    // user submissions
    var user = req.user; 
    var userAnswers = req.body;

    console.log('Submitted user: ' + user.local.email);
    console.log('Submitted answers: ' + userAnswers);
}

exports.process = process;