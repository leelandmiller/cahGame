var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    //buildBlackSelected("this is first word  this is the second right herer?", "bob", "word1", "word2");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function buildBlackSelected() {
    //blackCard, player,  (whiteCard, whiteCard), 
    let text = ""

    if (arguments.length === 3) {

        if (arguments[0].indexOf("_") === -1) {
            text = arguments[0] + "<br>" + "<span class='white-text'>" + arguments[2] + "</span>"
        } else {
            text = arguments[0].replace(/_/g, "<span class='white-text'>" + arguments[2] + "</span>")
        }
    } else if (arguments.length === 4) {
        if (arguments[0].indexOf("_") === -1) {
            text = arguments[0] + "<br>" + "<span class='white-text'>" + arguments[2] + "</span>" + "<br>" + "<span class='white-text'>" + arguments[3] + "</span>"
        } else {
            text = arguments[0].replace(/_/, "<span class='white-text'>" + arguments[2] + "</span>")
            text = text.replace(/_/, "<span class='white-text'>" + arguments[3] + "</span>")
        }
    }

    let cardContainer = $('<div>').addClass('col-md-3');

    let flipContainer = $('<div>').addClass('flip-container');
    cardContainer.append(flipContainer);

    let flipper = $('<div>').addClass('flipper');
    flipContainer.append(flipper);

    let front = $('<div>').addClass('front front-black');
    flipper.append(front);
    let textFront = $('<p>').html('Coders<br>Against<br>Humanity')
    front.append(textFront);

    let back = $('<div>').addClass('back back-black');
    flipper.append(back);
    let textBack = $('<p>').html(text)
    back.append(textBack);
    let name = $("<p>").text(arguments[1]).addClass("black-card-name")
    back.append(name)

    $('#selectedBlack').append(cardContainer);
    cardFlip(cardContainer)
}
