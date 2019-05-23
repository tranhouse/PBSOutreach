$(window).on('load', function() {

	//initalize array of counting questions
	var masterCount = Array(50).fill(0);
	var quesCount 	= Array(50).fill(0);

	var personCount = 0;
    var questPerPerson = Array(500);

    //------------- BUTTONS----------------------------
    $("button").click(function(){
        if(this.id == 'stats'){
          $("#webStats").toggle();
        }
    
        if(this.id == 'person'){

        	//total up array
        	questPerPerson[personCount] = quesCount.reduce(getSum);
        	personCount ++;

        	//Reset each question from person
        	quesCount 	= Array(50).fill(0);
    		
    		console.log(questPerPerson);
        	//Update webstats divs
        }
    });

    //------------WHAT TILE WAS CLICKED AND COUNT ------------------------
	$('div').mousedown(function() {
    	if( ($(this).children().attr("id")>0) ){
    		
    		quesCount[($(this).children().attr("id")) -1]++;
    		masterCount[($(this).children().attr("id")) -1]++;
    		
    		console.log(quesCount);
    		console.log(masterCount);
    	}
   	});

	function getSum(total,num){
		return total + num;
	}

});