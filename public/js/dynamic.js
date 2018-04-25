$('document').ready(function() {
    // global variables used for reporting
    var testTime;
    var checkedInputs = [];
    var multipleChoiceAnswers = [];
    var freeResponseAnswers = [];
    // global variables used for testing functionality
    var counter;
    var timerId = null;
    
    // on click, start exam
    $('#start-button').on('click', function() {
        var selection = $('#section-selection').val();
        $('#sat-selection-section').remove();
        loadQuiz(selection);
    });

    // done button, create report 
    $('#footer').on('click', '#done', function(){
        console.log('done button has fired');
        runReport();
    });

    // strike through answer choice
    (function strikeThroughAnswer(){
        $(document).on('click', '.mark-wrong', function() {
            $(this).siblings().toggleClass('mark-answer-wrong');
        });
      })();

    //***************************** function delcarations *************************

    // functions for the timer______________________________________________________

    function countdown() {
        timerId = setInterval(function() {
            counter--;
            if (counter < 0) {
                runReport();
                clearInterval(timerId);
                alert('Time is up!');
            }
            $('#timer').text(convertSeconds(counter));
        }, 1000);
    };

    function convertSeconds(inputSeconds) {
        var minutes = Math.floor(inputSeconds / 60);
        var seconds = inputSeconds - (minutes * 60);
        // return calculation
        return (prettifyRemainingTime(minutes, '0', 2) + ':' + prettifyRemainingTime(seconds, '0', 2));
    };

    function prettifyRemainingTime(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    };

    // functions for quiz load_______________________________________________________

    function loadQuiz(quizName) {
        console.log('start of loadQuiz with : ' + quizName);
        $.getJSON(('./data/' + quizName + '.json'), function(data) {
            console.log(data);
            var quiz = data;
            // load the directions
            for (var i = 0; i < quiz.directions.length; i++) {
                console.log(quiz.directions[i]);
                $('#directions').append('<p>' + quiz.directions[i] + '</p>');
                $('#directions').append('<hr>');
            };
            // switch statement to modularize each quiz type load for easier maintainablity
            switch (quiz.name) {
                case 'reading':
                    markupReading(quiz);
                    break;
                case 'writing':
                    console.log('inside switch statement' + quiz);
                    markupReading(quiz);
                    break;
                case 'math':
                    markupMath(quiz);
                    break;
                case 'mathNoCalc':
                    markupMath(quiz);
                    break;
                default:
                    alert('Sorry, quiz is not currenty available. Please contact admin.');
            }

            // set timer
            testTime = quiz.time_allowed
            counter = testTime;
            timerId = null;

            // load done button
            $("#footer").html("<button id=\"done\">DONE</button>");
            

            // start timer
            $("#timer").text(convertSeconds(counter));
            countdown();

            // monitor questions to provide data for report generation
            monitorQuestions();

        });
    console.log('end of loadQuiz with : ' + quizName);
    };

    // markup functions for each quiz_______________________________________________________
    function markupReading(quiz) {

        // load content
        for (var i = 0; i < quiz.content.length; i++) {

            // create container div for a single passage
            var $passageContainer = $('<div class="row passage-container" id="passage-container'+(i+1)+'">');
            var $questionContainer = $('<div class="col-md-4 passage-questions" id="questions-for-passage'+(i+1)+'">');
            
            // create containers for passage and the passage questions
            var $passage = $('<div class="col-md-8 passage" id="passage'+(i+1)+'">');
            var $question = $('<div class="question">');

            for (var j = 0; j < quiz.content[i].passage.length; j++) {
                $passage.append('<p>' + quiz.content[i].passage[j] + '<p>');
            }

            $passageContainer.append($passage);

            for (var k = 0; k < quiz.content[i].questions.length; k++) {
                $questionContainer.append(renderMultipleChoiceQuestion(quiz.content[i].questions[k], k));
            }

            $passageContainer.append($questionContainer);

            // load content to page
            $('#content').append($passageContainer);

            // style each passage block properly
            var left = $('#passage'+(i+1)).height();
            $('#passage-container'+(i+1)).height(left);
            $('#questions-for-passage'+(i+1)).height(left);
        }

        (function strikeThroughAnswer(){
          $(document).on('click', '.mark-wrong', function() {
              $(this).siblings().toggleClass('mark-answer-wrong');
          });
        })();
    };

    function markupWriting(quiz) {

        // load content
        for (var i = 0; i < quiz.content.length; i++) {

        }

    };

    function markupMath(quiz) {

        // load notes
        // for(var i = 0; i < quiz.notes.length; i++){
        //
        // }
        // load content
        for (var i = 0; i < quiz.content[0].questions.length; i++) {
          $('#content').append(renderMultipleChoiceQuestion(quiz.content[0].questions[i], i));
        }

    };

    function markupMathNoCalc(quiz) {

        // load content
        for (var i = 0; i < quiz.content.length; i++) {
          $('#content').append(renderMultipleChoiceQuestion(quiz.content[0].questions[i], i));
        }

    };

    function renderMultipleChoiceQuestion(questionObject, x) {

        var $question = $('<div class="question">');

        $question.append('<p>' + (x + 1) + '.) ' + questionObject.question + '</p>');
        $question.attr('data-passage', questionObject.passage_ref);

        for (var j = 0; j < questionObject.choices.length; j++) {
            var value = j;
            var answerChoice = questionObject.choices[j];
            // switch case to determine if the value attribute should be a, b, c, or d
            switch (value) {
                case 0:
                    value = 'a';
                    break;
                case 1:
                    value = 'b';
                    break;
                case 2:
                    value = 'c';
                    break;
                case 3:
                    value = 'd';
                    break;
                default:
                    // do nothing
            }
            // append the answer choice.
            if (answerChoice.indexOf('Lines') >= 0) {
                $question.append('<div class="multiple-choice-answer"><input type="radio" name="q' + (x + 1) + '" value="' + value + '"><span class="answer-choice-text"><span class="line-reference">&#9432;</span>' + answerChoice + '</span><sup class="mark-wrong">X</sup></div>');
            } else {
                $question.append('<div class="multiple-choice-answer"><input type="radio" name="q' + (x + 1) + '" value="' + value + '"><span class="answer-choice-text"> ' + answerChoice + '</span><sup class="mark-wrong">X</sup></div>');
            }
        }
        return $question;
    };

    //main function to run the report______________________________________________
    function runReport() {
        checkAnswers();
        calculateTestTime();
        calculateCheckedInputs();

    };
    //functions for checking answers_______________________________________________
    function checkAnswers() {
        //variables to hold information to identify what answers were correct and incorrect
        var correctMultipleChoice = [];
        var incorrectMultipleChoice = [];

        //select multiple choice answers
        var $studentMultipleChoiceAnswers = $("input:checked");
        //cycle through the multiple choice answers and check for correct or incorrect and update variables
        for (i = 0; i < $studentMultipleChoiceAnswers.length; i++) {
            if (multipleChoiceAnswers[i] === $studentMultipleChoiceAnswers[i].value) {
                correctMultipleChoice.push($studentMultipleChoiceAnswers[i].name);
            } else {
                incorrectMultipleChoice.push($studentMultipleChoiceAnswers[i].name + ":" + $studentMultipleChoiceAnswers[i].value);
            };
        };
        //print correct answers
        console.log("correct multiple choice answers:");
        for (i = 0; i < correctMultipleChoice.length; i++) {
            console.log(correctMultipleChoice[i]);
        };
        //print incorrect answers
        console.log("incorrect multiple choice answers answers:");
        for (i = 0; i < incorrectMultipleChoice.length; i++) {
            console.log(incorrectMultipleChoice[i]);
        };
    };

    function monitorQuestions() {
        // $('document').on('click', 'input', function() {
        //  console.log('input click');
        //  checkedInputs.push(this.name);
        // });
        $("input").on("click", function() {
            console.log('input');
            checkedInputs.push(this.name);
        });
    };

    function calculateTestTime() {
        var timeUsed = convertSeconds(testTime - counter);
        console.log("Student took " + timeUsed + " to complete this section");
    };

    function calculateCheckedInputs() {
        var counts = {};
        checkedInputs.forEach(function(x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        console.log(counts);
    };



});
