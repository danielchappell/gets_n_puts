$('input').keyup(function(e){
   if(e.keyCode == 13){
      $(this).trigger('enter');
   }