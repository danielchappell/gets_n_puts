$(window).load(function(){
  $("#toggle-wrapper").hide( "fast");

  $(document).ready(function(){
      $("#chat-toggle").on('click',function(){
      $('#toggle-wrapper').toggle("fast");
      });
      
      $('#chat-toggle').parent().hover(function(){
    $('#toggle-close').animate({opacity:1},1000)
        },function(){
            $('#toggle-close').animate({opacity:0},500)
        }
                  )
    $(function() {    $('.discussion').scrollTop($('.discussion').height());
});
    $('#close').click(function(){
        $(this).parent().fadeOut()
    })

    
    $('input,textarea').focus(function(){
       $(this).removeAttr('placeholder');
    });


  });
  $('.discussion').animate({
    scrollTop: $('.discussion li:last-child').offset().top + 'px'
}, 1000);
});

