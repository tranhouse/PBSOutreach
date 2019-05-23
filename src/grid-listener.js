$(document).ready(function(){
    
    $("button").click(function(){
        if(this.id == 'foo'){
          $("#webStats").toggle();
        }
    });

    $("#tiles div").click(function(){
      alert($(this).attr("id"));
    return false; // avoid parents divs if you have nested divs
    });

});

