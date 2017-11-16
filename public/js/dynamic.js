$('document').ready(function(){

	//on click, start exam
	$("#start-button").on("click",function(){
		console.log('start button fired');
		var selection = $("#sat-section-selection").val();
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

    //functions for quiz load_______________________________________________________
    function loadQuiz(quizName){
    	console.log('loadQuiz fired');
    	$.getJSON(('./data/'+ quizName + '.json'), function(data){
    		console.log(data);
    		$('#intro').append('<h1>'+data.name+'</h1>');
    	});
    };












});