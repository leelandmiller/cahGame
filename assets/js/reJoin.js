let reJoin = function(key) {
    gameRef.child(key).once("value", function(snap) {
        let data = snap.val().state;
        if (data === null) {

        } else {
            /*state = {
                open: 0,
                ready: 1,
                chooseBlack: 2,
                chooseWhite: 3,
                pickWhite: 4,
                showCards: 5,
                nextTurn: 6,
                gameOver: 7,
                quitGame: 8
            }*/
            switch (data) {
                case (state.open)
                fireObj.gameState(key, true)
                break;
                case (data >= state.ready)

                case (data >= state.chooseBlack)

            } //switch
        } //else
    })
}

let buildList = function(key) {
    playerRef.child(snap.val().players).on("child_added", function(snap) {
        //listen for players joining to update the screen
        //call update players screen
        let displayName = snap.val().displayName
        makeElement.buildPlayerList(playerKey, snap.key, displayName);


    });
}
let showHand = function(key, whiteOrder) {
    $("#waiting").hide();
    $("#hideCards").show();
    gameRef.child(key).child("players").once("value", function(snap) {
        playersRef.child(snap.val()).child(currentUid).child("hand").once("value", function(snap) {
            for (let i = 0; i < 7; i++) {
                let cardNum = snap.val()[i]
                let firstChild = Math.floor(cardNum / 50);
                let secondChild = cardNum % 50
                whiteCardsRef.child(firstChild).child(secondChild).once("value", function(snap) {
                    makeElement.newWhiteCard("card" + (i + 1), snap.val(), cardNum)
                })
            }
        })
    })


}

let getBlackCard = function(key) {
    let returnObj = {}
    currentGameRef.child("currentTurn").once("value", function(snap) {
        //display black card
        returnObj.currentTurn = snap.val()
        currentPlayerRef.child(currentTurn).once("value", function(snap) {
            $("#current-turn-name").text(snap.val().displayName)
        })

    })
    currentGameRef.child("blackCount").once("value", function(snap) {
        //find blackCOunt
        let firstNum = Math.floor(snap.val() / 50);
        let secondNum = snap.val() % 50;
        blackNum = blackOrder[firstNum][secondNum]
            //find card location
        let firstChild = Math.floor(blackNum / 50)
        let secondChild = blackNum % 50
        blackCardRef.child(firstChild).child(secondChild).once("value", function(snap) {
            returnObj.pick = snap.val().pick;
            returnObj.currentBlack = snap.val().text;
            makeElement.newWhiteCard("black", currentBlack);
        })
    })
    return returnObj;

}
let rejoin = {
    buildList: buildList,
    getBlackCard: getBlackCard,
}

//if on chooseBlack or picjWhite have host check for disconnected players and 
//id give host option to remove the
// remove player for playersref delete from playerOrder and jump to showCards
