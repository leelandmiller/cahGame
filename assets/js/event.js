$('#hideCards').hide();
$('.hide-game-center').hide();
// $('#waiting').hide();
$("#susubmit").on("click", function() {
    let email = $("#emailInput").val().trim();
    let password = $("#pwone").val();
    console.log(email, password)
    if (email === "" || password === "") {
        $(".errormsg").text("password or email is blank").show();
    } else {
        fireObj.signIn(email, password);
    }

})

$("#sisubmit").on("click", function() {
    let email = $("#emailInput").val().trim();
    let password = $("#pwone").val();
    let passConfrim = $("#pwtwo").val();
    let displayName = $("#username").val().trim();
    if (email === "" || password === "" || passConfrim === "" || displayName === "") {
        $(".errormsg").text("field was left blank").show();
    } else {
        fireObj.signUpCheck(email, password, passConfrim, displayName);
    }
})

$("#signOut").on("click", function() {
    firebase.auth().signOut();
})

$("#forceStart").on("click", function() {
    currentGameRef.update({
        state: state.ready
    })
})
$("#btn-global-chat").on("click", function() {
    let message = $("#global-input").val().trim();
    $("#global-input").val("")
    if (message === "") {
        toastr.error('Your message was empty...maybe try typing something...');
    } else {
        globalChat.push().set({
            message: message,
            displayName: currentDisplayName,
            timeStamp: firebase.database.ServerValue.TIMESTAMP
        })

    }
})
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $(".front-page").hide();
        $("body").addClass("coffee-table-bg");
        $("#myNav").show()
        $("#main-view").show();
        $(".hide-create").show();
        fireObj.globalChatOn();
        currentUid = user.uid;
        userRef.child(currentUid).child("displayName").once("value", function(snap) {
            currentDisplayName = snap.val();
        }).then(function() {
            $("#user-name").text(currentDisplayName);
        })
        fireObj.joinGameEvent();
    } else {
        fireObj.joinGameOff()
        fireObj.globalChatOff();
        $(".front-page").show();
        $("body").removeClass("coffee-table-bg");
        $("#myNav").hide()
        $("#main-view").hide();
        $(".hide-create").hide();
        $(".hide-waiting").hide();
    }


})




$("#create-game").on("click", function(event) {
    event.preventDefault();
    let playerCount = $("#numPlayers").val();
    let winCount = $("#numCards").val();
    fireObj.createNewGame(playerCount, winCount);
})

$('#main-view').hide();
$('.hide-create').hide();
$('.hide-waiting').hide();
