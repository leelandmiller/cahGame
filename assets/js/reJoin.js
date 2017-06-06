let buildList = function(key) {
    playerRef.child(key).on("child_added", function(snap) {
        //listen for players joining to update the screen
        //call update players screen
        let displayName = snap.val().displayName
        makeElement.buildPlayerList(key, snap.key, displayName);


    });
}
let showHand = function(key, whiteOrder) {
    $("#waiting").hide();
    $("#hideCards").show();
    gameRef.child(key).child("players").once("value", function(snap) {
        playerRef.child(snap.val()).child(currentUid).child("hand").once("value", function(snap) {
            for (let i = 0; i < 7; i++) {
                let cardNum = snap.val()[i]
                let firstChild = Math.floor(cardNum / 50);
                let secondChild = cardNum % 50
                whiteCardRef.child(firstChild).child(secondChild).once("value", function(snap) {
                    makeElement.newWhiteCard("card" + (i + 1), snap.val(), cardNum)
                })
            }
        })
    })


}

let getBlackCard = function(key, blackOrder) {
    console.log(blackOrder)
    let returnObj = {}
    currentGameRef.child("currentTurn").once("value", function(snap) {
        //display black card
        returnObj.currentTurn = snap.val()
        currentPlayerRef.child(returnObj.currentTurn).once("value", function(snap) {
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
let reJoin = {
    buildList: buildList,
    getBlackCard: getBlackCard,
    showHand: showHand
}

//if on chooseBlack or picjWhite have host check for disconnected players and 
//id give host option to remove the
// remove player for playersref delete from playerOrder and jump to showCards
