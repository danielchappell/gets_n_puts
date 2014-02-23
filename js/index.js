$(document).ready(function() {


  // function openSidebar() {
  //   $("#swipe").addClass('isOpen');
  // }

  // function closeSidebar() {
  //   $("#swipe").removeClass('isOpen');
  // }

  // $('#swipe').hammer().on('dragleft', function(e) {
  //   e.preventDefault();
  //   closeSidebar();
  // });

  // $('#swipeme').hammer().on('dragright', function(e) {
  //   e.preventDefault();
  //   openSidebar();
  // });

  // $('#swipe').on('click', function(e) {
  //   if($('#swipe').hasClass('isOpen')) {
  //     e.preventDefault();
  //     closeSidebar();
  //   }
  // });

  // $('#swipeme').on('click', function(e) {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   if($('#swipe').hasClass('isOpen')) {
  //     closeSidebar();
  //   } else {
  //     openSidebar();
  //   }

  // });

  FastClick.attach(document.body);

});
  var dan = new User({
    personName: "Joseph Chappell",
    gitHubId: "photonerddan",
    gravatarId: "http://www.gravatar.com/avatar/426b9a1c8077d92fb7a15a757d8a85da?s=30"
  })
  var matt = new User ({
    personName: "Matt Van Dusen",
    gitHubId: "imagineux",
    gravatarId: "https://1.gravatar.com/avatar/9499e17466ab100d9b4b14b382fe6f29?s=30"
  })

$(function(){

  currently_online = new UsersView([dan, matt]);

  var chatRoom = new ChatRoom({ selfObject: self, partnerObject: matt });

  var chatWindow = new ConversationView ({ model: chatRoom, collection: new Conversation})


  chatWindow.render();
});

currently_online = new UsersView([dan, matt]);