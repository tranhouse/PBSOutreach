$(window).on('load', function() {


	//----------------------------- Initalize array of counting questions ---------------------------------------
	
  //-----we need to replicate this array with the one in the grid.ds -- don't know how yet-------
	var eventCat = ['New to the PS','General', 'PIBS', 'Service Buyback','Plan Information', 'Married-Common Law', 'Disability', 'Parenthood', 
                    'Divorce or Seperation', 'WFA-Terminating', 'Death', 'Working past 65', 'Plan Member Responsibilities', 'Preparing for Retirement',
                    'Contribution Rates','LWOP', 'Pension Transfer', 'Bridge Benefits', 'Newly Retired', 'Reaching 65', 'Re-employment', 'Indexing Rates', 'APS',
                    'Deferred Pension Plan', 'Web Tools', 'Surivor and Dependents', 'Pension Centre', 'Forms', 'Phoenix', 'CAF and RCMP',
                    'Eligibility', 'Pay Centre', 'Health Care Plan', 'Dental Care Plan', 'DI', 'PSMIP', 'EX Benefits', 'Living Outside Canada',
                    'Deferred Benefits Plan', 'Remarrying', 'Submit a Claim', 'Rates', 'Contact Info'];

	var quesCount 	= 0;					//Keeps track of all the different questions asked per person, but resets after each new person
	var personCount = 0;					//Keeps track of the number of people spoken to
	var averageQuestions = 0;				//Calculates the average number of questions a person asks
    var questPerPerson = Array(500);		//Keeps track of the number of questions asked PER person
    var totalQuestions = 0;					//Keeps track of the number of questions asked
    var masterCount = new Array(eventCat.length -1);	//Keeps track of all the different questions asked
    var topRank 	= new Array(eventCat.length -1);	//Used to keep track of the top list of questions asked
    
    //Creating a double array
    for(var i=0; i < eventCat.length; i++){
    	masterCount[i] 	= new Array(2);
    	topRank[i]		= new Array(2);
    }
  
  	//initalizing double array and assigning it the event categories 
  	for (var j=0; j< eventCat.length; j++){
  		for (var k=0; k<2; k++){
  			masterCount[j][0] = eventCat[j];
  			masterCount[j][1] = 0;
  		}
  	}
  	//----------------------------------------------------------------------------------------------------------------

    //------------- BUTTONS----------------------------
    $("button").click(function(){
        
        //-------------- webstats menu ---------------
        if(this.id == 'stats'){
          $("#webStats").toggle();
        }
    
    	//---------- calculations of webstats --------
        if(this.id == 'person'){

        	//total up array, find average
        	questPerPerson[personCount] = quesCount;
        	personCount ++;
        	averageQuestions = questPerPerson.reduce(getSum) / personCount;

        	//Create a new copy of the Master
        	topRank =  masterCount.slice();
        	
        	//Calculate descending order of top questions asked
        	topRank.sort(function(a,b){return b[1]-a[1]});

        	//Reset each question from person
        	quesCount 	= 0;
    		
        	//Update webstats divs
  			document.getElementById("numPeople").innerHTML = '<b><u>Number of People Spoken to:</u></b> '				+ personCount;
  			document.getElementById("numQuestions").innerHTML = '<b><u>Number of Questions Asked in Total:</u></b> '	+ questPerPerson.reduce(getSum);
  			document.getElementById("avgQuestions").innerHTML = '<b><u>Average Questions per Person:</u></b> '			+ Math.round(averageQuestions *100)/100;
  			document.getElementById("topQuestions").innerHTML = '<b><u>List of top 5:</u></b> <br/>'					+				
  																		topRank[0][0] + ' : ' + topRank[0][1] + '<br />' +
  																		topRank[1][0] + ' : ' + topRank[1][1] + '<br />' +
  																		topRank[2][0] + ' : ' + topRank[2][1] + '<br />' +
  																		topRank[3][0] + ' : ' + topRank[3][1] + '<br />' +
  																		topRank[4][0] + ' : ' + topRank[4][1] + '<br />';


        } //end if
    });

    //-------------- WHAT TILE WAS CLICKED AND COUNT ------------------------
	$('div').mousedown(function() {
    	if( ($(this).children().attr("id")>0) ){
    		
        //-----change colour-----
          // make a jQ collection of the DOM element from the event
          var $elem = $(this);
          // store the background-color
          var oldBG = $elem.css('background-color');
          // change the background color to what you want
          $elem.css('backgroundColor', '#FFFFFF');
          // after 1 second, change it back
          setTimeout(function() {
            $elem.css('background-color', oldBG);
          }, 50);

    		//After determining which tile was clicked, must subtract 1 to correspond to the array
    		var index = ($(this).children().attr("id")) -1;
    		
    		quesCount++;
    		masterCount[index][1]++;
    	
    	}
   	});

	//To find the sum inside an array
	function getSum(total,num){
		return total + num;
	}



});