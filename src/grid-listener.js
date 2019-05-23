$(document).ready(function(){
    
    $("button").click(function(){
        if(this.id == 'foo'){
          $("#webStats").toggle();
        }
    });

	$(#tiles).click(function(event) {
    	if($(event.target).is('#1')) {
       		alert("hello");
    	} 
	});

});