jQuery(document).ready(function(){
     $("#questions>div:first-of-type").show();
});
$(function() {
    $('.option').on('click', function() {
        $('#questions>div').each(function() {
            var id = $(this).index();
            if ($(this).is(':visible')) {
                $(this).hide();
                if (id == $('#questions>div').length - 1) {
                    $('#questions>div').eq(0).show();
                } else {
                    $('#questions>div').eq(id + 1).show();
                }
                return false;
            }
        });
    });
});
