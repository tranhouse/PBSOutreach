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
  var eventCat = ['SWAG', 'New to the PS','General', 'PIBS', 'Service Buyback','Plan Information', 'Married-Common Law', 'Disability', 'Parenthood',
                    'Divorce or Seperation', 'WFA-Terminating', 'Death', 'Working past 65', 'Plan Member Resp.', 'Preparing for Retirement',
                    'Contribution Rates','LWOP', 'Pension Transfer', 'Bridge Benefits', 'Newly Retired', 'Reaching 65', 'Re-employment', 'Indexing Rates', 'APS',
                    'Deferred Pension Plan', 'Web Tools', 'Surivor and Dependents', 'Pension Centre', 'Forms', 'Phoenix', 'CAF and RCMP',
                    'Eligibility', 'Pay Centre', 'Health Care Plan', 'Dental Care Plan', 'DI', 'PSMIP', 'EX Benefits', 'Living Outside Canada',
                    'Deferred Benefits Plan', 'Remarrying', 'Submit a Claim', 'Rates', 'Contact Info'];
  //----------------------------------------------------------------------------------------------------------------------------------------

  //135 Unique colours array to choose from
  //----------------------------------------------------------------------------------------------------------------------------------------
  //-- CRZ : STD colors. - Implemented GEIR colors
  /* var tileColours = ['maroon', 'red', 'purple', ' fuchsia', 'green', 'lime', 'olive', 'yellow', 'teal', 'aqua', 'orange', 'aliceblue',
  'antiquewhite', 'aquamarine', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate',
  'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkcyan', 'darkgoldenrod', 'darkgreen', 'darkkhaki',
  'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategrey',
  'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'gainsboro',
  'ghostwhite', 'gold', 'goldenrod', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'khaki', 'lavender', 'lavenderblush',
  'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink',
  'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'limegreen', 'linen', 'magenta',
  'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise',
  'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'oldlace', 'olivedrab', 'orangered', 'orchid', 'palegoldenrod',
  'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'rosybrown', 'royalblue', 'saddlebrown',
  'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan',
  'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'yellowgreen']; */
  //----------------------------------------------------------------------------------------------------------------------------------------

  //-- CRZ : Adding GEIR Colors :: defined in demo-grid.css
    var tileColours = [	'GEIRColor1', 'GEIRColor2', 'GEIRColor3', ' GEIRColor4', 'GEIRColor5', 'GEIRColor6', 'GEIRColor7', 'GEIRColor8', 'GEIRColor9', 'GEIRColor10', 
					   	'GEIRColor11', 'GEIRColor12','GEIRColor13', 'GEIRColor14', 'GEIRColor15', 'GEIRColor16', 'GEIRColor17', 'GEIRColor18', 'GEIRColor19', 'GEIRColor20',
  					   	'GEIRColor21', 'GEIRColor22', 'GEIRColor23', 'GEIRColor24', 'GEIRColor25', 'GEIRColor26', 'GEIRColor27', 'GEIRColor28', 'GEIRColor29','GEIRColor30', 							'GEIRColor31', 'GEIRColor32', 'GEIRColor33', 'GEIRColor34', 'GEIRColor35', 'GEIRColor36', 'GEIRColor37', 'GEIRColor38', 'GEIRColor39', 'GEIRColor40',
					   	'GEIRColor41', 'GEIRColor42', 'GEIRColor43', 'GEIRColor44', 'GEIRColor45', 'GEIRColor46', 'GEIRColor47', 'GEIRColor48', 'GEIRColor49', 'GEIRColor50',
					   	'GEIRColor51', 'GEIRColor52', 'GEIRColor53', 'GEIRColor54', 'GEIRColor55', 'GEIRColor56', 'GEIRColor57', 'GEIRColor58', 'GEIRColor59', 'GEIRColor60',
					   	'GEIRColor61', 'GEIRColor62', 'GEIRColor63', 'GEIRColor64', 'GEIRColor65', 'GEIRColor66', 'GEIRColor67', 'GEIRColor68', 'GEIRColor69', 'GEIRColor70',
					   	'GEIRColor71', 'GEIRColor72', 'GEIRColor73', 'GEIRColor74', 'GEIRColor75', 'GEIRColor76', 'GEIRColor77', 'GEIRColor78', 'GEIRColor79', 'GEIRColor80',
					   	'GEIRColor81', 'GEIRColor82', 'GEIRColor83', 'GEIRColor84', 'GEIRColor85', 'GEIRColor86', 'GEIRColor87', 'GEIRColor88', 'GEIRColor89', 'GEIRColor90',
					   	'GEIRColor91', 'GEIRColor92', 'GEIRColor93', 'GEIRColor94', 'GEIRColor95', 'GEIRColor96', 'GEIRColor97', 'GEIRColor98', 'GEIRColor99', 'GEIRColor100',
					   	'GEIRColor101', 'GEIRColor102', 'GEIRColor103', 'GEIRColor104', 'GEIRColor105', 'GEIRColor106', 'GEIRColor107', 'GEIRColor108', 'GEIRColor109', 								'GEIRColor110', 'GEIRColor111', 'GEIRColor112', 'GEIRColor113', 'GEIRColor114', 'GEIRColor115', 'GEIRColor116', 'GEIRColor117', 'GEIRColor118',
					   	'GEIRColor119', 'GEIRColor120', 'GEIRColor121', 'GEIRColor122', 'GEIRColor123', 'GEIRColor124', 'GEIRColor125', 'GEIRColor126', 'GEIRColor127', 								'GEIRColor128', 'GEIRColor129'];

  var dragOrder = [];
  var uuid = 0;

  var filterFieldValue;
  var sortFieldValue;
  var layoutFieldValue;
  var searchFieldValue;

  var tileSize = 2.0;
  var startNumOfTiles = eventCat.length;
  var numOfNewTiles = 1;
  var counter = 0;

  var quesCount   = 0;              //Keeps track of all the different questions asked per person, but resets after each new person
  var personCount = 0;              //Keeps track of the number of people spoken to
  var averageQuestions = 0;         //Calculates the average number of questions a person asks
  var questPerPerson = Array(500);  //Keeps track of the number of questions asked PER person
  var totalQuestions = 0;           //Keeps track of the number of questions asked
  var masterCount = new Array();    //Keeps track of all the different questions asked
  var topRank   = new Array();      //Used to keep track of the top list of questions asked

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

  //
  // Grid helper functions
  //
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
          questPerPerson[personCount] = quesCount;
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
        } //end if


        if(this.id =='summary'){
			if(personCount!=0){
			  document.write("<b><u>Number of People Spoken to:</u></b>"          + personCount);
			  document.write("<br>");

			  document.write("<b><u>Number of Questions Asked in Total:</u></b>"  + questPerPerson.reduce(getSum));
			  document.write("<br>");

			  document.write("<b><u>Average Questions per Person:</u></b>"        + Math.round(averageQuestions *100)/100);
			  document.write("<br><br>");

			  for(i=0; i<eventCat.length; i++){
				document.write(masterCount[i][0] + "&nbsp - &nbsp" + masterCount[i][1]);
				document.write("<br>");
			  }
        
				//---------------AJAX REQUEST----------------
				var data_obj ={masterCount:masterCount};
				
				$.ajax('/data', {data: JSON.stringify(data_obj), method:'POST', contentType:'application/json'}).done(function(data){
							 console.log(data);
				});
			}//end if to check number of people
		}//end if for summary



    });

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

    //--------EVENT LISTENER------

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

  //
  // Fire it up!
  //

  initDemo();

});
