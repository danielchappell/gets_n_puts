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


$(function(){

  var dan = {
    personName: "Joseph Chappell",
    gitHubId: "photonerddan",
    gravatarId: "http://www.gravatar.com/avatar/426b9a1c8077d92fb7a15a757d8a85da?s=38"
  },
   matt = {
    personName: "Matt Van Dusen",
    gitHubId: "imagineux",
    gravatarId: "https://1.gravatar.com/avatar/9499e17466ab100d9b4b14b382fe6f29?s=38"
  },
  bill = {
    personName: "Bill Fienberg",
    gitHubId: "billfienberg",
    gravatarId: "https://0.gravatar.com/avatar/6a3b08042f0eddaa9f2ba323e13ceb33?s=38"
  },
  gilad = {
    personName: "Gilad Salmon",
    gitHubId: "GilUpstream",
    gravatarId: "https://2.gravatar.com/avatar/e6ba15bad6ba794926197178efd38b91?s=38"
  },
  kathryn = {
    personName: "Kathryn Beaty",
    gitHubId: "kabeaty",
    gravatarId: "https://1.gravatar.com/avatar/60ca895c49585fd9d060cc820b293d99?s=38"
  },
  denton = {
    personName: "Matt Denton",
    gitHubId: "mddenton",
    gravatarId: "https://1.gravatar.com/avatar/f9c07b3e514c92af64e6e13c39dbb599?s=38"
  },
  patrick = {
    personName: "Patrick Brennan",
    gitHubId: "ulbanata",
    gravatarId: "https://1.gravatar.com/avatar/9967d9a1eaea0fbf653508c68d46f51e?s=38"
  },
  beth= {
    personName: "Bethany Nagel",
    gitHubId: "bethanynagel",
    gravatarId: "https://1.gravatar.com/avatar/2b458fee8cfdb96f4872a583d52a55c4?s=38"
  },
  brad = {
    personName: "Brad Hubbard",
    gitHubId: "bhubbard98",
    gravatarId: "https://1.gravatar.com/avatar/68257ca48c6ff275bd7a6c737d67cf95?s=38"
  },
  drew = {
    personName: "Drew Robinson",
    gitHubId: "Drewbie345",
    gravatarId: "https://0.gravatar.com/avatar/e9aa8ad97fb6b7ebe56bb729fc28058a?s=38"
  },
  donovan = {
    personName: "Donovan Whitworth",
    gitHubId: "dwhitworth",
    gravatarId: "https://2.gravatar.com/avatar/07f46580462f46c60fd5d697b78a0436?s=38"
  },
  michael = {
    personName: "Michael Young",
    gitHubId: "bhubbard98",
    gravatarId: "https://1.gravatar.com/avatar/68257ca48c6ff275bd7a6c737d67cf95?s=38"
  },
  neil = {
    personName: "Neil Mithipati",
    gitHubId: "mithipati",
    gravatarId: "https://1.gravatar.com/avatar/9cacd8db8c42d57f50f0bc16403220df?s=38"
  }
  currently_online = new UsersView([dan, matt, bill, gilad, kathryn, denton, patrick, beth, brad, drew, donovan, michael, neil ]);

  var chatRoom = new ChatRoom({ selfObject: self, partnerObject: matt });

  var chatWindow = new ConversationView ({ model: chatRoom, collection: new Conversation})


  chatWindow.render();
});
