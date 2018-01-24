$('document').ready(function() {
    //global variables
    var testTime;
    var counter;
    var timerId;
    //on click, start exam
    $('#start-button').on('click', function() {
        console.log('start button fired');
        var selection = $('#section-selection').val();
        console.log(selection);
        $('#sat-selection-section').remove();
        loadQuiz(selection);
    });

    //***************************** function delcarations *************************

    //functions for the timer______________________________________________________

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
        //return calculation
        return (prettifyRemainingTime(minutes, '0', 2) + ':' + prettifyRemainingTime(seconds, '0', 2));
    };

    function prettifyRemainingTime(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    };

    //functions for quiz load_______________________________________________________

    function loadQuiz(quizName) {

        $.getJSON(('./data/' + quizName + '.json'), function(data) {
            console.log(data);
            var quiz = data;
            //load the directions
            for (var i = 0; i < quiz.directions.length; i++) {
                console.log(quiz.directions[i]);
                $('#directions').append('<p>' + quiz.directions[i] + '</p>');
                $('#directions').append('<hr>');
            };
            //switch statement to modularize each quiz type load for easier maintainablity
            switch (quiz.name) {
                case 'reading':
                    markupReading(quiz);
                    break;
                case 'writing':
                    markupWriting(quiz);
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

            //set timer
            testTime = quiz.time_allowed
            counter = testTime;
            timerId = null;
            //save timer to sessionStorage

            //start timer
            $("#timer").text(convertSeconds(counter));
            countdown();
        });

    };

    //markup functions for each quiz_______________________________________________________
    function markupReading(quiz) {

        //load content
        for (var i = 0; i < quiz.content.length; i++) {
            //create container div for a single passage
            var $passageContainer = $('<div class="row passage-container" id="passage-container'+(i+1)+'">');
            var $questionContainer = $('<div class="col-md-4 passage-questions" id="questions-for-passage'+(i+1)+'">');
            //create containers for passage and the passage questions
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

            //load content to page
            $('#content').append($passageContainer);
            //style each passage block properly
            var left = $('#passage'+(i+1)).height();
            $('#passage-container'+(i+1)).height(left);
            $('#questions-for-passage'+(i+1)).height(left);
        }
    };

    function markupWriting(quiz) {

        //load content
        for (var i = 0; i < quiz.content.length; i++) {

        }

    };

    function markupMath(quiz) {

        //load notes
        // for(var i = 0; i < quiz.notes.length; i++){
        //
        // }
        console.log(quiz.content[0].questions.length);
        //load content
        for (var i = 0; i < quiz.content[0].questions.length; i++) {
          $('#content').append(renderMultipleChoiceQuestion(quiz.content[0].questions[i], i));
        }

    };

    function markupMathNoCalc(quiz) {

        //load content
        for (var i = 0; i < quiz.content.length; i++) {

        }

    };

    function renderMultipleChoiceQuestion(questionObject, x) {

        var $question = $('<div class="question">');

        $question.append('<p>' + (x + 1) + '.) ' + questionObject.question + '</p>');
        $question.attr('data-passage', questionObject.passage_ref);

        for (var j = 0; j < questionObject.choices.length; j++) {
            var value = j;
            var answerChoice = questionObject.choices[j];
            //switch case to determine if the value attribute should be a, b, c, or d
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
                    //do nothing
            }
            //append the answer choice.
            if (answerChoice.indexOf('Lines') >= 0) {
                $question.append('<div class="multiple-choice-answer"><input type="radio" name="q' + (x + 1) + '" value="' + value + '"><span class="answer-choice-text"><span class="line-reference">&#9432;</span>' + answerChoice + '</span><sup class="mark-wrong">X</sup></div>');
            } else {
                $question.append('<div class="multiple-choice-answer"><input type="radio" name="q' + (x + 1) + '" value="' + value + '"><span class="answer-choice-text"> ' + answerChoice + '</span><sup class="mark-wrong">X</sup></div>');
            }
        }
        return $question;
    };

});
