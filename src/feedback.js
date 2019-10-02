jQuery(document).ready(function(){

// Show DEMOGRAPHICS first questions and show next ones when all visible radio is selected
var step_nbr = 2;
var ini_nbr = 6;

$('#demographics').each(function() {
  var divN = $(this).find('>div').length;
  $('<p>'+divN+'</p>').appendTo('#demographics');
  if (divN > 3) {
    $('div', this).eq(5).nextAll().hide().addClass('toggleable');
    $(this).append('<li class="more">More...</li>');
  }
});

$('#demographics').on('click', '.more', function() {
  var visible_lis = $('#demographics>div:visible').length;

  if ($(this).hasClass('less')) {

    $(this).prevAll('div:not(.toggleable)').slice(0, step_nbr).addClass('toggleable').hide();

    if ($('div:visible').length <= (ini_nbr + 1)) {
      $(this).text('More...').removeClass('less');
    }

  } else {
    $(this).siblings('div.toggleable').slice(0, step_nbr).removeClass('toggleable').show();

    if ($('div.toggleable').length == 0) {
      $(this).text('Less...').addClass('less');
    }
  }

});


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
    });*/

