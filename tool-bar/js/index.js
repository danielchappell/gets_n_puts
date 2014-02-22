$(document).ready(function() {

  function openSidebar() {
    $("#swipe").addClass('isOpen');
  }

  function closeSidebar() {
    $("#swipe").removeClass('isOpen');
  }

  $('#swipe').hammer().on('dragleft', function(e) {
    e.preventDefault();
    closeSidebar();
  });

  $('#swipeme').hammer().on('dragright', function(e) {
    e.preventDefault();
    openSidebar();
  });

  $('#swipe').on('click', function(e) {
    if($('#swipe').hasClass('isOpen')) {
      e.preventDefault();
      closeSidebar();
    }
  });

  $('#swipeme').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();

    if($('#swipe').hasClass('isOpen')) {
      closeSidebar();
    } else {
      openSidebar();
    }

  });

  FastClick.attach(document.body);

});