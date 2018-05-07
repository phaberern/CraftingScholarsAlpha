// set up mail object to send emails
var nodemailer = require('nodemailer');
var timer = require('../helpers/timer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'miista.meeseeks@gmail.com',
    pass: 'craftingscholars'
  }
});

var process = function(req){

    // constants
    var answers = ['a','b','c','a','d','b','d','d','b','d','d','a','b','c','a','c','c','a','b','c','c','a','b','c','b','d','d','d','b','c','b','b','a','d','b','b','d','c','a','b','d','c','b','d','c','a','b','d','d','d','a'];
    var correctAnswers = [];
    var incorrectAnswers = [];
    var rawTimeLeft = 0;
    var testTime = 2100;
    // user submissions
    var user = req.user; 
    var userAnswers = req.body;
    
    var prettyAnswer = '';
    
    for(var question in userAnswers){
        // snag the raw answer (will be 0,1,2 or 3) 
        var rawAnswer = userAnswers[question];
        // create a pretty answer - need this hacky if statement because we are sending other info in the body of the req
        if(rawAnswer == '0' || rawAnswer == '1' || rawAnswer == '2' || rawAnswer == '3'){
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
                correctAnswers.push((question + '.) ' + prettyAnswer));
            }else{
                incorrectAnswers.push((question + '.) ' + prettyAnswer));
            }
        }else if(question == 'timer'){
            rawTimeLeft = rawAnswer;
        }     
    }// end of looping through body of request

    // build the email body with the correct and incorrect answers
    var emailBody = '<html><p><strong>USER:</strong> ' + user.local.email + ' has completed the reading section of Crafting Scholars online Baseline exam.</p></br>';
    emailBody += '<p><strong>Correct Answers:</strong><br>';

    // add the questions the student got correct
    for(var i = 0; i < correctAnswers.length; i++){
        emailBody += (correctAnswers[i] + '<br>');
    };

    emailBody += '</p>';
    emailBody += '<p><strong>Incorrect Answers:</strong><br> ';

    // add the questions the student got incorrect 
    for(var i = 0; i < incorrectAnswers.length; i++){
        emailBody += (incorrectAnswers[i] + '<br> ');
    }

    emailBody += '</p>';

    // add the students test time 
    var timeLeft = timer.calculateTestTime(testTime, rawTimeLeft);

    emailBody += "<p><strong>Time:</strong> " + timeLeft + "</p></html>";

    
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
      
};

exports.process = process;