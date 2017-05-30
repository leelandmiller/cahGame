// $(document).ready(function() {
//     // alert('ready')



// let database = firebase.database();
// let userRef = database.ref("/users");
// let gameRef = database.ref("/games");
// let blackCardRef = database.ref("/blackCards");
// let whiteCardREf = database.ref("/whiteCards");


// console.log(userRef.displayNames)
// console.log(gameRef)
// console.log(blackCardRef)
// console.log(whiteCardREf)

makeElement = {
    buildSentMessage: function(player, message, time) {

        var messageContainer = $('<div>').addClass('row msg_container base_sent');

        var messageHolder = $('<div>').addClass('col-md-10 col-xs-10');
        messageContainer.append(messageHolder);
        var messageBox = $('<div>').addClass('messages msg_sent');
        messageHolder.append(messageBox);
        var message = $('<p>').html(sentMessageText);
        messageBox.append(message);

        var avatarContainer = $('<div>').addClass('col-md-2 col-xs-2 avatar');
        messageContainer.append(avatarContainer);
        var avatarImage = $('<img>')
        avatarImage.attr('class', 'img-responsive')
        avatarImage.attr('src', 'http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg');
        avatarContainer.append(avatarImage);

        $('#chat').append(messageContainer);
    },
    buildReceivedMessage: function(player, message, time) {

        var messageContainer = $('<div>').addClass('row msg_container base_receive');

        var avatarContainer = $('<div>').addClass('col-md-2 col-xs-2 avatar');
        messageContainer.append(avatarContainer);
        var avatarImage = $('<img>')
        avatarImage.attr('class', 'img-responsive')
        avatarImage.attr('src', 'http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg');
        avatarContainer.append(avatarImage);

        var messageHolder = $('<div>').addClass('col-md-10 col-xs-10');
        messageContainer.append(messageHolder);
        var messageBox = $('<div>').addClass('messages msg_receive');
        messageHolder.append(messageBox);
        var message = $('<p>').html(receivedMessageText);
        messageBox.append(message);

        $('#chat').append(messageContainer);
    },

    newWhiteCard: function() {
        $('#' + card + ' .flipper .back p').html(whiteCard);
    },

    gamesToJoin: function() {

    },

    waitingHost: function() {

    },

    waitingPlayers: function() {

    },

    playerInfo: function() {

    },


}

///////////////// TESTING BELOW ////////////////////

// QUICK HIDE/SHOWS //
$('#hideCards').hide();
// $('.hide-game-center').hide();
$('#waiting').hide();
$('.front-page').hide();






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

// CHAT TESTING //
var sentMessageText = 'This is the Song that never ends...';
var player1 = 'Tanner';
var timeSent = '49 mins ago';

var receivedMessageText = '... it just goes on and on again!';
var player2 = 'Danny';
var timeReceived = '23 mins ago';

$('#btn-chat').on('click', function() {

    sentMessageText = $('#btn-input').val().trim();
    console.log(sentMessageText)

    makeElement.buildSentMessage(player1, sentMessageText, timeSent);

    makeElement.buildReceivedMessage(player2, receivedMessageText, timeReceived);
    $('#btn-input').val('');
})

// FLIP CONTAINER TEST //
$('.flip-container').on('click', function() {

    if ($(this).hasClass('flip')) {
        $(this).removeClass('flip');
    } else {
        $(this).addClass('flip');
    }
    console.log(this.id);
})

// NEW WHITE CARD TEST //
var card = 'card2'; //data from obj
var whiteCard = 'My humps.'; //data from obj

$('#' + card).on('click', function() {
        makeElement.newWhiteCard()
    })
    //////////////////////// TESTING ABOVE //////////////////////////


// })
