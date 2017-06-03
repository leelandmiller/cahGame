///////////////// TESTING BELOW ////////////////////


// CHAT TESTING //
// var sentMessageText = 'This is the Song that never ends...';
// var player1 = 'Tanner';
// var timeSent = '49 mins ago';
//
// var receivedMessageText = '... it just goes on and on again!';
// var player2 = 'Danny';
// var timeReceived = '23 mins ago';
//
// $('#btn-chat').on('click', function() {
//
//     sentMessageText = $('#btn-input').val().trim();
//     console.log(sentMessageText)
//
//     makeElement.buildSentMessage(player1, sentMessageText, timeSent);
//
//     makeElement.buildReceivedMessage(player2, receivedMessageText, timeReceived);
//     $('#btn-input').val('');
// })

/// FLIP CONTAINER TEST //

// Modal Card Listener //
$('#selectedBlack').on('click', '.flip-container', function() {
    cardFlip(this);

    console.log('flip container', this);
});


function cardFlip(el) {

    if ($(el).hasClass('flip')) {
        $(el).removeClass('flip');
    } else {
        $(el).addClass('flip');
    }
    console.log(el.id);
}


// Game Card Listener //
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


$('#urbanDict').on('click', function() {
    $('.chat_input').val('/Urban " "');
    $('.urbantip .tooltiptext').hide();
})

$('#pearsonDict').on('click', function() {
    $('.chat_input').val('/Dict " "');
    $('.urbantip .tooltiptext').hide();
})


$('.urbantip').hover(function() {
    $('.urbantip .tooltiptext').show();
}, function() {
    $('.urbantip .tooltiptext').hide();
})









//////////////////////// TESTING ABOVE //////////////////////////
