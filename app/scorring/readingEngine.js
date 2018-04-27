var process = function(req){

    // constants
    var answers = ['a','b','c','a','d','b','d','d','b','d','d','a','b','c','a','c','c','a','b','c','c','a','b','c','b','d','d','d','b','c','b','b','a','d','b','b','d','c','a','b','d','c','b','d','c','a','b','d','d','d','a'];

    // user submissions
    var user = req.user; 
    var userAnswers = req.body;

    console.log('The user of the submitted code is: ');
    console.log(user.local.email);
    console.log('----------------------------------------------------------');
    console.log('The answers the user has submitted are: ');
    console.log(userAnswers);
    console.log('----------------------------------------------------------');
    console.log('User answers in each loop');
    for (var answer in userAnswers){
        console.log(userAnswers[answer]);
    }

};

exports.process = process;