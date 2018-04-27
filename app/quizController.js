

var process = function(submittedAnswers, user){
    console.log("Inside of grade function in controller");
    console.log("Submitted answers: ");
    console.log(submittedAnswers);
    console.log("-------------------------------");
    console.log("Submitted by: ");
    console.log(user);
}

exports.process = process;