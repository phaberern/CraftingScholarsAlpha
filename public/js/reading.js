$("document").ready(function() {
    //global variables for timer
    var testTime = 2100; //35 minutes = 2100 seconds
    var counter = 2100; //set equal to testTime
    var timerId = null; //to clear interval and stop timer

    var checkedInputs = []; //keep track of every input that is checked

    var multipleChoiceAnswers = ["a", "b", "c", "a", "d", "b", "d", "d", "b", "d"];


    //***************************** MAIN method to kick things off ****************

    $("#timer").text(convertSeconds(counter));
    countdown();
    monitorQuestions();

    $("#done-button").on("click", function() {
        clearInterval(timerId);
        runReport();
    });

    //***************************** function delcarations *************************

    //functions for the timer______________________________________________________
    function countdown() {
        timerId = setInterval(function() {
            counter--;
            if (counter < 0) {
                runReport();
                clearInterval(timerId);
                alert("Time is up!");
            }
            $("#timer").text(convertSeconds(counter));
        }, 1000);
    };

    function convertSeconds(inputSeconds) {
        var minutes = Math.floor(inputSeconds / 60);
        var seconds = inputSeconds - (minutes * 60);
        //return calculation
        return (prettifyRemainingTime(minutes, "0", 2) + ":" + prettifyRemainingTime(seconds, "0", 2));
    };

    function prettifyRemainingTime(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
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



////////////////////////////////////////////////////////

//this is a revealing modular pattern. it keeps all of the variables and functions in scope so nothing leaks out onto the global scope of your webpage.
(function() {

    var theQuestions = (function() {
        var theFile = ['jsonfile.json'];

        loopQuestions = function() {
            //for loop that reads the number of json files in the array 'theFile', so if you have multiple json files and want to keep them separate, this is useful
            //if you only know you'll loop through one json file, you can skip this in the future.
            for (var k = 0; k < 1; k++) {
                //get the json file 'jsonfile.json' -- ideally rename this to something more specific than jsonfile.json
                $.getJSON(theFile[k], function(data) {
                    //for loop to loop through the number of questions in the jsonfile.json
                    for (var i = 0; i < data.questions.length; i++) {
                        //cache the question variable to have cleaner js
                        var question = data.questions[i].question;
                        //append the li to the ol that has the class order-questions-list
                        $('.order-questions-list').append('<li><p>' + question + '</p></li>');
                        //for loop to loop through the answer choices to each question
                        for (var j = 0; j < data.questions[i].answerschoices.length; j++) {
                            //create a value for j
                            var value = j,
                                answerChoice = data.questions[i].answerschoices[j];
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
                                $('.order-questions-list').append('<div class="question"><input type="radio" name="q' + (i + 1) + '" value="' + value + '"><span class="answer-choice-text"><span class="line-reference">&#9432;</span>' + answerChoice + '</span><sup class="mark-wrong">X</sup></div>');
                            } else {
                                $('.order-questions-list').append('<div class="question"><input type="radio" name="q' + (i + 1) + '" value="' + value + '"><span class="answer-choice-text"> ' + answerChoice + '</span><sup class="mark-wrong">X</sup></div>');
                            }
                        }
                    }
                });
            }
            strikeThroughAnswer();
            scrollToLineReference();
        }
        scrollToLineReference = function() {
            $(document).on('click', '.line-reference', function() {
                var $question = $(this).parent().prev();
                var target = ($question[0].name + $question[0].value);
                document.getElementById(target).scrollIntoView();
            });
        };

        strikeThroughAnswer = function() {
            $(document).on('click', '.mark-wrong', function() {
                $(this).siblings().toggleClass('mark-answer-wrong');
            });
        };
        //return what you want to expose. this sets init to fire the loopQuestions function
        return {
            init: loopQuestions
        };
    })(); //self invoking function, fires immediately. known as IIFE.
    theQuestions.init(); //this calls the function to be ran.
})(); //another self invoking function, this function runs when it reads the js. not on dom read.