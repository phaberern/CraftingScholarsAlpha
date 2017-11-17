$('document').ready(function() {

    //on click, start exam
    $('#start-button').on('click', function() {
        $('#sat-selection-section').hide();
        console.log('start button fired');
        var selection = $('#section-selection').val();
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
        console.log('loadQuiz fired');
        console.log(quizName);
        $.getJSON(('./data/' + quizName + '.json'), function(data) {
            console.log('getJSON fired');
            console.log(data);
            //load the directions
            for(var i = 0; i < data.directions.length; i++){
                console.log(data.directions[i]);
                $('#directions').append('<p>'+data.directions[i]+'</p>');
            };
            //load the content
            for(var i = 0; i < data.content.length; i++){
                console.log(data.content[i]);
                $('#section-content').append('<p>'+data.content[i]+'</p>');
            };
            //load the questions
            for(var i = 0; i < data.questions.length; i++){
                console.log(data.questions[i]);
                $('#section-questions').append('<div>'+data.questions[i].question+'</div>');
            };
        });

    };

});