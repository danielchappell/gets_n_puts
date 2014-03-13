window.app = new ChatApp();

$(document).ready(function() {
  $('#log_in #join_chat').on('click', function(e){
    e.preventDefault();
    console.log('trying to work');
    window.app.server.emit('join', $("#log_in input[name='name']").val(), $("#log_in input[name='gravatarURL']").val() );
    window.self = new User({
      name: $("#log_in input[name='name']").val(),
      gravatarURL: $("#log_in input[name='gravatarURL']").val()
    });
    $("#log_in input[name='name']").val('');
    $("#log_in input[name='gravatarURL']").val('');
    var toolBar = new UsersView({collection: new Users, url: '/users'});
    window.openChats = new ChatRooms();
  });

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

  $('#button').on('click', function(e) {
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



