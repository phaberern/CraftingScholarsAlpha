// set up mail object to send emails
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'miista.meeseeks@gmail.com',
    pass: 'craftingscholars'
  }
});

var process = function(req){
    // constants
    var answers = ['b','b','a','a','d','d','b','d','b','b','c','b','d','c','c','c','b','b','a','d','d','b','a','b','b','a','d','a','c','c','d','b','d','d','a','d','a','b','c','d','d','c','c','d'];
    var correctAnswers = [];
    var incorrectAnswers = [];
    // user submissions
    var user = req.user; 
    var userAnswers = req.body;
    
    var prettyAnswer = '';
    for(var question in userAnswers){
        // snag the raw answer (will be 0,1,2 or 3) 
        var rawAnswer = userAnswers[question];
        // create a pretty answer 
        switch(rawAnswer){
            case '0': prettyAnswer = 'a';
            break;
            case '1': prettyAnswer = 'b';
            break;
            case '2': prettyAnswer = 'c';
            break;
            case '3': prettyAnswer = 'd';
            break;
        }
        // need to convert the current question from string to a number 
        question = parseInt(question);
        console.log("Question : " + question + " Answer : " + prettyAnswer);
        // need to check to see if answers[question] value is equal to the pretty answer
        if(answers[(question - 1)] == prettyAnswer){
            correctAnswers.push(question);
        }else{
            incorrectAnswers.push((question + '.) ' + prettyAnswer));
        }
    }

    // build the email body with the correct and incorrect answers
    var emailBody = '<html><p><strong>USER:</strong> ' + user.local.email + ' has completed the writing section of Crafting Scholars online Baseline exam.</p></br>';
    emailBody += '<p><strong>Correct Answers:</strong>';

    // add the questions the student got correct
    for(var i = 0; i < correctAnswers.length; i++){
        emailBody += (correctAnswers[i] + ', ');
    };

    emailBody += '</p>';
    emailBody += '<p><strong>Incorrect Answers:</strong> ';

    // add the questions the student got incorrect 
    for(var i = 0; i < incorrectAnswers.length; i++){
        emailBody += (incorrectAnswers[i] + ', ');
    }

    emailBody += '</p></html>';

    
    // set mail subject 
    var mailOptions = {
        from: 'miista.meeseeks@gmail.com',
        to: 'phillip.haberern5@gmail.com',
        subject: 'Crafting Scholars Online Baseline',
        html: emailBody
      };
    
    // send mail 
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

exports.process = process;