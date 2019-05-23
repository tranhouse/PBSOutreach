$(window).on('load', function() {

    
    $("button").click(function(){
        if(this.id == 'foo'){
          $("#webStats").toggle();
        }
    });


	$('div div div div').unbind().mouseover(function() {
    
       	alert($(this).children().attr("id"));
    	return false;
   	});
});