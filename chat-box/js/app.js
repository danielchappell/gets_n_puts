$(window).load(function(){
  $("ol.discussion").hide( "fast");
  $('#chat-close').animate({opacity:0},500);

  $(document).ready(function(){
      $("header.top-bar").on('click',function(){
      $('ol.discussion').toggle("fast");
      });
      
    $('header.top-bar').parent().hover(function(){
    $('#chat-close').animate({opacity:1},1000)
        },function(){
            $('#chat-close').animate({opacity:0},500);
        });

    $('#chat-close').click(function(){
        $(this).parent().fadeOut();
    })
    
    $('input,textarea').focus(function(){
       $(this).removeAttr('placeholder');
    });


  });
});
