// $(window).load(function(){
//   $("ol.discussion").hide( "fast");
//   $('#chat-close').animate({opacity:0},500);

//   $(document).ready(function(){
//       $("header.top-bar").on('click',function(){
//       $('ol.discussion').toggle("fast");
//       });

//     $('header.top-bar').parent().hover(function(){
//     $('#chat-close').animate({opacity:1},1000)
//         },function(){
//             $('#chat-close').animate({opacity:0},500);
//         });

//     $('#chat-close').click(function(){
//         $(this).parent().fadeOut();
//     })

//     $('input,textarea').focus(function(){
//        $(this).removeAttr('placeholder');
//     });


//   });
// });


$(function(){
  var dan = new User({
    personName: "Joseph Chappell",
    gitHubId: "photonerddan",
    gravatarId: "http://www.gravatar.com/avatar/426b9a1c8077d92fb7a15a757d8a85da?s=36"
  })
  var matt = new User ({
    personName: "Matt Van Dusen",
    gitHubId: "imagineux",
    graviatarId: "https://1.gravatar.com/avatar/9499e17466ab100d9b4b14b382fe6f29?s=36"
  })

  var chatRoom = new ChatRoomModel({ selfObject: dan, personObject: matt });

  var chatWindow = new ConversationView ({ model: chatRoom, collection: new Conversation})
  $('.discussion').css("min-height", "270px");
  chatWindow.createMessage('letsg et this done!!');
  chatWindow.createMessage('what is going on with guys');

  chatWindow.render();
});