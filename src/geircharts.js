document.addEventListener('DOMContentLoaded', function () {
	// ---- populate dropdown list ----

	// Call request to get dates
	$.ajax('/dates', {method:'GET', contentType:'application/json'}).done(function(data){

		data.forEach(function(element){
			//When receiving Date from GET request, it comes with Time stamp. Removed it withs split
			document.getElementById("dates").innerHTML += "<option>"+ element.dates.split('T')[0] +"</option>";
		});

		//listen to find dropdown list was selected
		document.getElementById("dates").onchange=function() {

		// Remove and recreate the canvas to clear previous graph data :: fix mouse hover on graph labels to show previous grpah
			$('#graph').remove(); // Let's remove the canvas to clear any previous graph data
  			$('<canvas id="graph"></canvas>').appendTo('section'); // Let's recreate a brand new empty canvas
		//
            var dateSelected = this.value;
			var totalQuestions = 0;

			// ---- initiation of Chart ----
			var ctx = document.getElementById('graph').getContext('2d');
			var xAxis = new Array();
			var yAxis = new Array();

			//

			var date_Obj = {dateAttrib: dateSelected};
			//---- STEP 1: Find corresponding categories from date selected (date -> ID -> categories)
			$.ajax('/eventCat', {data: JSON.stringify(date_Obj), contentType:'application/json', method:'POST'}).done(function(data){


				//---- STEP 2: Push event names into an array for graph
				data.forEach(function(element){
					console.log(element.en + ": " + element.count);
					//When receiving Date from GET request, it comes with Time stamp. Removed it withs split
					xAxis.push(element.en);
					yAxis.push(element.count);
					totalQuestions +=element.count;
				});

				//----Update Website Stats Divs-----
document.getElementById("numQuestions").innerHTML = '<b><u>Number of Questions Asked in Total:</u></b> ' + totalQuestions;
$.ajax('/spoken', {data: JSON.stringify(date_Obj), contentType:'application/json', method:'POST'}).done(function(data){
document.getElementById("numPeople").innerHTML = '<b><u>Number of People Spoken to:</u></b> ' + data[0].numPeople;
document.getElementById("avgQuestions").innerHTML = '<b><u>Average Questions per Person:</u></b> ' + Math.round(totalQuestions/data[0].numPeople *100)/100;
});

				//----------- STEP 3: MAKE GRAPH -----------
				var chart = new Chart(ctx, {
					// The type of chart we want to create
					type: 'bar',

					// The data for our dataset
					data: {
						labels: xAxis,
						datasets: [{
							label: 'Frequency',
							backgroundColor: 'rgb(56, 150, 176)',
							borderColor: 'rgb(56, 150, 176)',
							data: yAxis
						}]
					},
					// Configuration options go here
					options: {
						scales: {
							yAxes: [{
								ticks: {
									min: 0
								}
							}]
						}
    				}
				});//--------------END GRAPH----------------

			}); // end GET request for events and count

		} // END downdown listner
	}); // end FIRST GET request for dates
});