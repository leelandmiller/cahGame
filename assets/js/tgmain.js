$(document).ready(function() {
    let database = firebase.database();
    let userRef = database.ref("/users");
    let gameRef = database.ref("/games");
    let blackCardRef = database.ref("/blackCards");
    let whiteCardREf = database.ref("/whiteCards");


    console.log(userRef.displayNames)
    console.log(gameRef)
    console.log(blackCardRef)
    console.log(whiteCardREf)

    fireObj = {


    }

    makeElement = {


    }


    // $('.flip-container').hide();

    $('.flip-container').on('click', function() {

        if ($(this).hasClass('flip')) {
            $(this).removeClass('flip');
        } else {
            $(this).addClass('flip');
        }
        console.log(this.id);
    })





    var sentMessageText = 'This is the Song that never ends...';
    var player1 = 'Tanner';
    var timeSent = '49 mins ago';

    var receivedMessageText = '... it just goes on and on again!';
    var player2 = 'Danny';
    var timeReceived = '23 mins ago';


    $('#btn-chat').on('click', function() {

        sentMessageText = $('#btn-input').val().trim();

        buildSentMessage(player1, sentMessageText, timeSent);

        buildReceivedMessage(player2, receivedMessageText, timeReceived);
        $('#btn-input').val('');
    })


    function buildSentMessage(player, message, time) {

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
    }

    function buildReceivedMessage(player, message, time) {

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
    }

    // var cardCount = 2;
    var card = 'card2'; //data from obj
    var whiteCard = 'My humps.'; //data from obj

    // console.log(cardCount)
    // console.log(card)


    $('#' + card).on('click', function() {
        newWhiteCard()
    })

    function newWhiteCard() {

        $('#' + card + ' .flipper .back p').html(whiteCard);
        // cardCount++
        // card = 'card' + cardCount;

        // console.log(cardCount)
        // console.log(card)
    }










})
