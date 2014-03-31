window.app = new ChatApp();

  function signinCallback(authResult) {
    if (authResult['status']['signed_in']) {
      // Update the app to reflect a signed in user
      // Hide the sign-in button now that the user is authorized, for example:
      // window.access_token = authResult['access_token'];
      document.getElementById('signinButton').setAttribute('style', 'display: none');
      gapi.client.load('plus','v1', function(){
        var request = gapi.client.plus.people.get( {'userId' : 'me'} );
        request.execute(function(profile){
            window.self = new User({
              name: profile['displayName'],
              gravatarURL: profile['image']['url']
            });
            window.app.server.emit( 'join', profile['displayName'], profile['image']['url'] );
            var toolBar = new UsersView({ collection: new Users });
            window.openChats = new ChatRooms();
          });
        });
      window.parley_uploadFile = function(file, rgravatars, sgravatar, that){
        // var file_blob = new Blob(file);
          console.log(file);
          $.ajax({
            url: "https://www.googleapis.com/upload/storage/v1beta2/b/parley-images/o?uploadType=media&name=" + file.name,
            type: "POST",
            data: file,
            contentType: file.type,
            processData: false,
            headers: {
             Authorization: "Bearer " + authResult['access_token']
            },
            success: function(res){
              console.log(res);
              var msg = '<img src="https://storage.cloud.google.com/parley-images/' + res.name + '" />'
              window.app.server.emit('message', msg, rgravatars, sgravatar);
              that.collection.add({ sender: sgravatar, content: msg });
              that.render();
            }
          });
      }
    } else {
      // Update the app to reflect a signed out user
      // Possible error values:
      //   "user_signed_out" - User is signed-out
      //   "access_denied" - User denied access to your app
      //   "immediate_failed" - Could not automatically log in the user
      console.log('Sign-in state: ' + authResult['error']);
    }
  }


$(function() {

  (function() {
         var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
         po.src = 'https://apis.google.com/js/client:plusone.js';
         var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
       })();

 window.titleNotification = { pageTitle: $('html title').html(), notified: false};

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



