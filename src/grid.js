document.addEventListener('DOMContentLoaded', function () {

  //
  // Initialize stuff
  //
	var grid = null;
	var docElem = document.documentElement;
	var demo = document.querySelector('.grid-PBS');
	var gridElement = demo.querySelector('.grid');
	var searchField = demo.querySelector('.search-field');
	var addItemsElement = demo.querySelector('.add-more-items');

  //Categories that have been established in the Event Outreach Program by GEIR
  //----------------------------------------------------------------------------------------------------------------------------------------
	var eventCat = new Array();
	var tileColours = new Array();
	
	var dragOrder = [];
	var uuid = 0;

	var filterFieldValue;
	var sortFieldValue;
	var layoutFieldValue;
	var searchFieldValue;

	var tileSize = 2.0;
	
	var numOfNewTiles = 1;
	var counter = 0;

	var quesCount   = 0;              //Keeps track of all the different questions asked per person, but resets after each new person
	var personCount = 0;              //Keeps track of the number of people spoken to
	var averageQuestions = 0;         //Calculates the average number of questions a person asks
	var questPerPerson = new Array(); //Keeps track of the number of questions asked PER person
	var totalQuestions = 0;           //Keeps track of the number of questions asked
	var masterCount = new Array();    //Keeps track of all the different questions asked
	var topRank   = new Array();      //Used to keep track of the top list of questions asked
	
	// Call request to get categories
	$.ajax('/categories', {method:'GET', contentType:'application/json', async:false}).done(function(data){
	
		// loop to get attribute values
		for (var i = 0; i < data.length; i++) {
			eventCat.push(data[i].en);
		} //end for loop
	}); // end GET request to get categories


	//Call request to get Categories ID to populate colors      -- CRZ : Adding GEIR Colors :: defined in demo-grid.css
	$.ajax('/tileColors', {method:'GET', contentType:'application/json', async: false}).done(function(data){

			// loop to get attribute values
			for (var i = 0; i < data.length; i++) {
				tileColours.push("GEIRColor"+data[i].id);
				console.log("GEIRColor"+data[i].id);
			} //end for loop
	}); // end GET request to get tileColours	
	
	var startNumOfTiles = eventCat.length;

	//Creating a double array
	for(var i=0; i < eventCat.length; i++){
		masterCount[i]  = new Array(2);
		topRank[i]    = new Array(2);
	}

	//initalizing double array and assigning it the event categories
	for (var j=0; j< eventCat.length; j++){
		for (var k=0; k<2; k++){
			masterCount[j][0] = eventCat[j];
			masterCount[j][1] = 0;
		}
	}
	
	// Function to create random colors
	(function () {
		var rdmcolor = '#', i = 0;
		while (i < 6) {
			rdmcolor += (Math.floor(Math.random()*16)).toString(16);
			i++;
		}

	})();
	
	//----------------------------------------------------------------------------------------------------------------------------------------
	function initDemo() {

		initGrid();

		// Set inital search query, active filter, active sort value and active layout.
		searchFieldValue = ''; //searchField.value.toLowerCase();
		filterFieldValue = ''; //filterField.value;
		sortFieldValue = 'order'; //sortField.value;
		layoutFieldValue = 'left-top'; //layoutField.value;

		// Search field binding.
		searchField.addEventListener('keyup', function () {
			var newSearch = searchField.value.toLowerCase();
			if (searchFieldValue !== newSearch) {
				searchFieldValue = newSearch;
				filter();
			}
		});


		// Add/remove items bindings.
		addItemsElement.addEventListener('click', addItems);
		gridElement.addEventListener('click', function (e) {
			if (elementMatches(e.target, '.card-remove, .card-remove i')) {
				removeItem(e);
			}
		});


		//------------- BUTTONS----------------------------
		$("button").click(function(){

			//-------------- webstats menu ----------------
			if(this.id == 'stats'){
				$("#webStats").toggle();
			}

			//---------- calculations of webstats -----------
			if(this.id == 'person'){

				//total up array, find average
				questPerPerson.push(quesCount);
				personCount ++;
				averageQuestions = questPerPerson.reduce(getSum) / personCount;

				//Create a new copy of the Master
				topRank =  masterCount.slice();

				//Calculate descending order of top questions asked
				topRank.sort(function(a,b){return b[1]-a[1]});

				//Reset each question from person
				quesCount   = 0;

				//Update webstats divs
				document.getElementById("numPeople").innerHTML = '<b><u>Number of People Spoken to:</u></b> '       + personCount;
				document.getElementById("numQuestions").innerHTML = '<b><u>Number of Questions Asked in Total:</u></b> '  + questPerPerson.reduce(getSum);
				document.getElementById("avgQuestions").innerHTML = '<b><u>Average Questions per Person:</u></b> '      + Math.round(averageQuestions *100)/100;
				document.getElementById("topQuestions").innerHTML = '<b><u>List of top 5:</u></b> <br/>'          +
					topRank[0][0] + ' : ' + topRank[0][1] + '<br />' +
					topRank[1][0] + ' : ' + topRank[1][1] + '<br />' +
					topRank[2][0] + ' : ' + topRank[2][1] + '<br />' +
					topRank[3][0] + ' : ' + topRank[3][1] + '<br />' +
					topRank[4][0] + ' : ' + topRank[4][1] + '<br />';


				/*
					Number of People Spoken to: - personCount
					Number of Questions Asked in Total: questPerPerson.reduce(getSum));
					Average Questions per Person: Math.round(averageQuestions *100)/100);
					*/

				//---------------AJAX REQUEST----------------
				var data_obj ={masterCount:masterCount};

				$.ajax('/data', {data: JSON.stringify(data_obj), method:'POST', contentType:'application/json'}).done(function(data){
										
					console.log("---------BEFORE--------");
					console.log(JSON.stringify(masterCount));
					
					console.log("---------GET REQUEST----------");
					console.log(data);	
					
					console.log("---------AFTER RESET-------");
					//reset masterCount
						for (var j=0; j< masterCount.length; j++){
								masterCount[j][1] = 0;
						}
					console.log(masterCount);
					
				}); //end ajax request
				
			} //end if button to add individual pressed

		}); //end button listener

		//-------------- WHAT TILE WAS CLICKED AND COUNT ------------------------
		$('.card').mousedown(function() {

			var index = ($(this).attr("id")) -1;
			//-----change colour-----
			// make a jQ collection of the DOM element from the event
			var $elem = $(this);
			// change the background color to what you want
			$elem.css('opacity', '0');
			// after 1 second, change it back
			setTimeout(function() {
				$elem.css('opacity', '1');
			}, 75);

			//After determining which tile was clicked, must subtract 1 to correspond to the array
			quesCount++;
			masterCount[index][1]++;

		});
	}


	//-------------------------------------------To find the sum inside an array--------------------------------------------------------------
	function getSum(total,num){
		return total + num;
	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function initGrid() {

		var dragCounter = 0;

		grid = new Muuri(gridElement, {
			items: generateElements(startNumOfTiles),
			layoutDuration: 400,
			layoutEasing: 'ease',
			dragEnabled: true,
			dragSortInterval: 50,
			dragContainer: document.body,
			dragStartPredicate: function (item, event) {
				var isDraggable = sortFieldValue === 'order';
				var isRemoveAction = elementMatches(event.target, '.card-remove, .card-remove i');
				return isDraggable && !isRemoveAction ? Muuri.ItemDrag.defaultStartPredicate(item, event) : false;
			},
			dragReleaseDuration: 400,
			dragReleseEasing: 'ease'
		})
			.on('dragStart', function () {
			++dragCounter;
			docElem.classList.add('dragging');
		})
			.on('dragEnd', function () {
			if (--dragCounter < 1) {
				docElem.classList.remove('dragging');
			}
		})
			.on('move', updateIndices)
			.on('sort', updateIndices);

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function filter() {

		filterFieldValue = ''; //filterField.value;
		grid.filter(function (item) {
			var element = item.getElement();
			var isSearchMatch = !searchFieldValue ? true : (element.getAttribute('data-title') || '').toLowerCase().indexOf(searchFieldValue) > -1;
			var isFilterMatch = !filterFieldValue ? true : (element.getAttribute('data-color') || '') === filterFieldValue;
			return isSearchMatch && isFilterMatch;
		});

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function sort() {

		// Do nothing if sort value did not change.
		var currentSort = 'order'; //sortField.value;
		if (sortFieldValue === currentSort) {
			return;
		}

		// If we are changing from "order" sorting to something else
		// let's store the drag order.
		if (sortFieldValue === 'order') {
			dragOrder = grid.getItems();
		}

		// Sort the items.
		grid.sort(
			currentSort === 'title' ? compareItemTitle :
			currentSort === 'color' ? compareItemColor :
			dragOrder
		);

		// Update indices and active sort value.
		updateIndices();
		sortFieldValue = currentSort;
	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function addItems() {

		//----push new input value into array----
		eventCat.push(document.getElementById("newTileName").value);

		var catNewLength = eventCat.length;

		masterCount[catNewLength-1]   = new Array(2);
		topRank[catNewLength-1]       = new Array(2);

		masterCount[catNewLength-1][0] = eventCat[catNewLength-1];
		masterCount[catNewLength-1][1] = 0;

		// add tileColour from last increment (length becomes length + 1 after push)
		tileColours.push("GEIRColor" + tileColours.length);
		console.log("GEIRColor" + tileColours.length);
		
		// Ajax POST request to add to event database
		var data_obj ={masterCount:masterCount};
		$.ajax('/addCat', {data: JSON.stringify(data_obj), method:'POST', contentType:'application/json'}).done(function(data){
			console.log(data);
		});

		// Generate new elements.
		var newElems = generateElements(numOfNewTiles);

		// Set the display of the new elements to "none" so it will be hidden by
		// default.
		newElems.forEach(function (item) {
			item.style.display = 'none';
		});

		// Add the elements to the grid.
		var newItems = grid.add(newElems);

		// Update UI indices.
		updateIndices();

		// Sort the items only if the drag sorting is not active.
		if (sortFieldValue !== 'order') {
			grid.sort(sortFieldValue === 'title' ? compareItemTitle : compareItemColor);
			dragOrder = dragOrder.concat(newItems);
		}

		// Finally filter the items.
		filter();

		//--------EVENT LISTENER ASSIGNED TO NEW BUTTON------

		$('#' + uuid).mousedown(function() {

			//find id: must subtract 1 to correspond to the array
			var index = ($(this).attr("id")) -1;

			//-----change colour-----
			// make a jQ collection of the DOM element from the event
			var $elem = $(this);

			// change the background color to what you want
			$elem.css('opacity', '0');
			// after 1 second, change it back
			setTimeout(function() {
				$elem.css('opacity', '1');
			}, 50);

			//After determining which tile was clicked, add to counter 
			quesCount++;
			masterCount[index][1]++;

		});

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function removeItem(e) {

		var elem = elementClosest(e.target, '.item');
		grid.hide(elem, {onFinish: function (items) {
			var item = items[0];
			grid.remove(item, {removeElements: true});
			if (sortFieldValue !== 'order') {
				var itemIndex = dragOrder.indexOf(item);
				if (itemIndex > -1) {
					dragOrder.splice(itemIndex, 1);
				}
			}
		}});
		updateIndices();
	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function changeLayout() {

		layoutFieldValue = 'left-top';//layoutField.value;
		grid._settings.layout = {
			horizontal: false,
			alignRight: layoutFieldValue.indexOf('right') > -1,
			alignBottom: layoutFieldValue.indexOf('bottom') > -1,
			fillGaps: layoutFieldValue.indexOf('fillgaps') > -1
		};
		grid.layout();

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	//
	// Generic helper functions
	//

	function generateElements(amount) {

		var ret = [];

		for (var i = 0; i < amount; i++) {
			ret.push(generateElement(
				++uuid,
				eventCat[counter],
				tileColours[counter],
				tileSize,
				tileSize
			));
			counter = counter + 1;
		}

		return ret;

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function generateElement(id, title, color, width, height) {

		var itemElem = document.createElement('div');
		var classNames = 'item h' + height + ' w' + width + ' ' + color;
		var itemTemplate = '' +
			'<div class="' + classNames + '" data-id="' + id + '" data-color="' + color + '" data-title="' + title + '">' +
			'<div class="item-content">' +
			'<div id="' + id + '" class="card">' +
			'<div class="card-id">' + id + '</div>' +
			'<div class="card-title"><span>' + title + '</span></div>' +
			'<div class="card-remove"><i class="material-icons">&#xE5CD;</i></div>' +
			'</div>' +
			'</div>' +
			'</div>';

		itemElem.innerHTML = itemTemplate;
		return itemElem.firstChild;

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	// https://stackoverflow.com/a/7228322
	function getRandomInt(min,max) {

		return Math.floor(Math.random() * (max - min + 1) + min);

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function compareItemTitle(a, b) {

		var aVal = a.getElement().getAttribute('data-title') || '';
		var bVal = b.getElement().getAttribute('data-title') || '';
		return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function compareItemColor(a, b) {

		var aVal = a.getElement().getAttribute('data-color') || '';
		var bVal = b.getElement().getAttribute('data-color') || '';
		return aVal < bVal ? -1 : aVal > bVal ? 1 : compareItemTitle(a, b);

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function updateIndices() {

		grid.getItems().forEach(function (item, i) {
			item.getElement().setAttribute('data-id', i + 1);
			item.getElement().querySelector('.card-id').innerHTML = i + 1;
		});

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function elementMatches(element, selector) {

		var p = Element.prototype;
		return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector).call(element, selector);

	}

	//----------------------------------------------------------------------------------------------------------------------------------------
	function elementClosest(element, selector) {

		if (window.Element && !Element.prototype.closest) {
			var isMatch = elementMatches(element, selector);
			while (!isMatch && element && element !== document) {
				element = element.parentNode;
				isMatch = element && element !== document && elementMatches(element, selector);
			}
			return element && element !== document ? element : null;
		}
		else {
			return element.closest(selector);
		}

	}

	// Fire it up!
	initDemo();

});
//-------------------------------------------------------------------
