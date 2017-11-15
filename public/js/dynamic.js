$('document').ready(function(){
		
	//on click, redirect 
	$("#start-button").on("click",function(){
		var selection = $("#sat-section-selection").val();
		
		switch(selection){
			case "mathCalcTemplate":
				window.location.replace("./assets/templates/mathCalcTemplate.html");
				break;
			case "mathNoCalcTemplate":
				window.location.replace("./assets/templates/mathNoCalcTemplate.html");
				break;
			case "readingTemplate":
				window.location.replace("./assets/templates/readingTemplate.html");
				break;
			case "writingTemplate":
				window.location.replace("./assets/templates/writingTemplate.html");
				break;
			default: alert("you screwed up");
		
			};			
		
		});
	
});