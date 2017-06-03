var config = {
    apiKey: "AIzaSyDAaxwFEqWX-vPiG5V8q_rTKZPLVir3UBk",
    authDomain: "testrepocah.firebaseapp.com",
    databaseURL: "https://testrepocah.firebaseio.com",
    projectId: "testrepocah",
    storageBucket: "testrepocah.appspot.com",
    messagingSenderId: "906450921448"
};
firebase.initializeApp(config);
let database = firebase.database();
let userRef = database.ref("/users");
let gameRef = database.ref("/games");
let cardRef = database.ref("/cards");
let playerRef = database.ref("/players");
let globalChat = database.ref("/globalChat");
let displayNameRef = database.ref("/users/displayNames");
let blackCardRef = cardRef.child("/blackCards");
let whiteCardRef = cardRef.child("/whiteCards");
let currentPlayerRef = "";
let currentGameRef = "";
let currentChatRef = "";
let currentUid = "";
let currentGame = "";
let currentDisplayName = "";
let localWhiteOrder = "";
let newAvatar = avatarObj.genAvatarURL();
let state = {
    open: 0,
    ready: 1,
    chooseBlack: 2,
    chooseWhite: 3,
    pickWhite: 4,
    showCards: 5,
    nextTurn: 6,
    gameOver: 7,
    quitGame: 8
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $(".front-page").hide();
        $("body").addClass("coffee-table-bg");
        $("#myNav").show()
        $("#main-view").show();
        $(".hide-create").show();
        currentUid = user.uid;
        userRef.child(currentUid).child("displayName").once("value", function(snap) {
            currentDisplayName = snap.val();
        }).then(function() {
            $("#user-name").text(currentDisplayName);
        })
        fireObj.joinGameEvent();
    } else {
        $(".front-page").show();
        $("body").removeClass("coffee-table-bg");
        $("#myNav").hide()
        $("#main-view").hide();
        $(".hide-create").hide();
        $(".hide-waiting").hide();
    }


})
