jQuery(document).ready(function(){
     $("#questions>div:first-of-type").show();

// Get child absolute height and change parent (All question divs are absolute for)
var parent = $('#questions'),
child = parent.children('#questions div:first-child');
if (child.height() > parent.height()) {
    parent.height(child.height());
    // can also use parent.height('auto');
}
});

/* Fade in - out questions on click */
$(function() {
    $('.option').on('click', function() {
        $('#questions>div').each(function() {
            var id = $(this).index();
            if ($(this).is(':visible')) {
                $(this).fadeOut(300, function(){

                if (id == $('#questions>div').length - 1) {
                    $('#questions>div').eq(0).fadeIn(150);
                }
                else {
                    $('#questions>div').eq(id + 1).fadeIn(150);
                }
            });
            return false;
            }
        });
    });
});

/* Original - no fade in-out
$(function() {
    $('.option').on('click', function() {
        $('#questions>div').each(function() {
            var id = $(this).index();
            if ($(this).is(':visible')) {
                $(this).fadeOut(1000).promise();

            if (id == $('#questions>div').length - 1) {
                $('#questions>div').eq(0).fadeIn(11250);
                }
            else {
                $('#questions>div').eq(id + 1).fadeIn(1250);
                }
                return false;
            }
        });
    });
});
*/
