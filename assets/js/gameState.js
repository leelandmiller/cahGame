gameState = function(key) {
    let host = false;
    let blackOrder = [];
    let whiteOrder = [];
    let winLimit = 0;
    let blackCount = 0;
    let whiteCount = 0;
    let playerKey = "";
    let playerOrder = [];
    let playerMax = 0;
    let playerTurnCount = 0;
    let totalPlayers = 0;
    let pick = 0;
    let currentTurn = "";
    let currentBlack = "";
    $(".hide-create").hide();
    $(".hide-waiting").show();

    currentGameRef = gameRef.child(key);
    currentGameRef.once("value", function(snap) {

            //grab all data needed to have stored

            blackOrder = snap.val().blackOrder;
            whiteOrder = snap.val().whiteOrder;
            winLimit = snap.val().winLimit;
            playerKey = snap.val().players;
            playerMax = snap.val().playerLimit;
            if (snap.val().host.toString() === currentDisplayName) {
                //set true if you are the host
                host = true;
            }
            //add host name to top of waiting for players
            let newTr = $("<tr>");
            let name = $("<td>").text(snap.val().host);
            let player = $("<td>").html("<span id ='waitPlayers'>1</span>/" + playerMax);
            player.addClass('text-center');
            let win = $("<td>").text(winLimit);
            win.addClass('text-center');
            newTr.append(name);
            newTr.append(player);
            newTr.append(win);
            $("#waiting-host-table").append(newTr);
            //update total player count
            currentGameRef.child("totalPlayers").on("value", function(snap) {
                $("#waitPlayers").text(snap.val());
            })




        }).then(function() {
            currentPlayerRef = playerRef.child(playerKey);
            currentGameRef.onDisconnect().remove();
            currentPlayerRef.onDisconnect().remove();
            currentGameRef.child("state").on("value", function(snap) {
                    let data = snap.val();
                    if (data === null) {
                        //TODO: call quitgame functions
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
                            case (state.open):

                                //TODO: hide game list

                                if (!host) {
                                    // if not the host build and add player object based on player uid
                                    fireObj.buildPlayerObj(key, playerKey)
                                }
                                currentGameRef.child("totalPlayers").on("value", function(snap) {
                                        $("#currentPlay").text(snap.val());

                                    })
                                    //show waitng for game to start screen
                                currentPlayerRef.on("child_added", function(snap) {
                                    //listen for players joining to update the screen
                                    //call update players screen
                                    let displayName = snap.val().displayName
                                    makeElement.buildPlayerList(playerKey, snap.key, displayName);
                                    if (host) playerOrder.push(snap.key);
                                    if (snap.key != "host") {


                                    }
                                    let newPlayer = $("<th>").text(displayName);
                                    let newTr = $("<tr>");
                                    newTr.append(newPlayer);
                                    $("#waiting-player-table").append(newTr);
                                    if (host) {

                                        if (playerOrder.length >= 4) {
                                            $("#loading-gif").hide();
                                            $("#forceStart").show();

                                            //if player count >= 4 allow host to start

                                        }
                                        // if the host listen for player count to playerLimit
                                    } //if

                                }); //currentPlayerRef.on()


                                //the host starts game and changes to next state
                                break;
                            case (state.ready):
                                fireObj.dealSevenCards(playerKey, whiteOrder, host);
                                $("#waiting").hide();
                                $("#hideCards").show();
                                // deal out cards
                                // display cards their cards
                                //call next state
                                break;
                            case (state.chooseBlack):

                                currentGameRef.child("currentTurn").once("value", function(snap) {
                                    //display black card
                                    currentTurn = snap.val()
                                })
                                currentGameRef.child("blackCount").once("value", function(snap) {
                                    //find blackCOunt
                                    let firstNum = Math.floor(snap.val() / 50);
                                    let secondNum = snap.val() % 50;
                                    //find card location
                                    let firstChild = Math.floor(blackOrder[firstNum][secondNum] / 50)
                                    let secondChild = blackOrder[firstNum][secondNum] % 50
                                    blackCardRef.child(firstChild).child(secondChild).once("value", function(snap) {
                                        pick = snap.val().pick;
                                        currentBlack = snap.val().text;
                                        makeElement.newWhiteCard("black", currentBlack);
                                    }).then(function() {
                                        if (currentTurn !== (host ? "host" : currentUid)) {
                                            // set you as chooser of white card
                                            // need to deal with 1 or 2 clicks
                                            makeElement.mainClick(pick, host, currentTurn);

                                        } //if
                                    })
                                })

                                //currentGameRef
                                //black card get pulled from cardRef
                                //display black card to all
                                break;
                                // case (state.chooseWhite):
                                //     currentGameRef.child("currentTurn").once("value", function(snap) {
                                //             //display black card
                                //             if (snap.val() === (host ? "host" : currentUid)) {
                                //                 // set you as chooser of white card
                                //                 currentGameRef.child("blackCount").transaction(function(snap) {
                                //                     return snap + 1
                                //                 })
                                //             } //if
                                //         }) //currentGameRef
                                //     blackCount++;

                                //     //setup card listen to add white card choice
                                //     //add picked card to player object in currentGameRef
                                //     //if host have count that increase by 1 everytime ad player chooses a card by listening to the player objects in database
                                //     //once hosts count equals player cound-1 change state
                                // break;
                            case (state.pickWhite):
                                //display all choosed white cards to everyone in random order
                                fireObj.showAllChoices(currentBlack, currentTurn, pick);
                                // currentPlayerRef.once("value", function(snap) {
                                //     //create a obj to sotre all teh cards
                                //     let blackCards = {};
                                //     snap.forEach(function(childSnap) {
                                //             if (currentTurn !== childSnap.key) {
                                //                 let key = childSnap.key
                                //                 blackCards[key] = {}
                                //                     //add display name

                                //                 blackCards[key].name = childSnap.val().displayName;
                                //                 let firstPick = childSnap.val().chosenWhiteCard1;
                                //                 let secondPick = childSnap.val().chosenWhiteCard2;
                                //                 //get first pick text
                                //                 if (pick >= 1) {
                                //                     let firstNum = Math.floor(firstPick / 50)
                                //                     let secondNum = firstPick % 50
                                //                     whiteCardRef.child(firstNum).child(secondNum).once("value", function(card) {
                                //                         blackCards[key].firstpick = card.val()
                                //                         console.log(card.val(), " card1")

                                //                     })

                                //                 }
                                //                 //second picks text
                                //                 if (pick === 2) {
                                //                     let firstNum = Math.floor(secondPick / 50)
                                //                     let secondNum = secondPick % 50
                                //                     whiteCardRef.child(firstNum).child(secondNum).once("value", function(card) {
                                //                         blackCards[key].secondPick = card.val()
                                //                     })
                                //                 }
                                //             }
                                //         })
                                //         //get a array of all the players
                                //     let players = Object.keys(blackCards)
                                //     for (var i = 0; i < totalPlayers; i++) {
                                //         let rand = Math.floor(Math.random() * players.length)
                                //         if (pick === 1) {
                                //             console.log("test")
                                //             buildBlackSelected(currentBlack, blackCards[players[rand]].name, blackCards[players[rand]].firstPick)
                                //         } else {
                                //             buildBlackSelected(currentBlack, blackCards[players[rand]].name, blackCards[players[rand]].firstPick, blackCards[players[rand]].secondPick)
                                //         }
                                //         players.splice(i, 1)
                                //     }
                                // })

                                if (currentTurn === currentUid) {
                                    currentGameRef.child("blackCount").transaction(function(snap) {
                                            return snap + 1
                                        })
                                        // set you as chooser of white card
                                } //if
                                //currentGameRef
                                //current player turn chooses a white card to win
                                // set min time or wait 5sec after pick
                                break;
                            case (state.showCards):
                                // show owner of each white card
                                //award black card to winner
                                break;
                            case (state.nextTurn):
                                if (host) {
                                    playerTurnCount++;
                                    if (playerTurnCount === playerOrder.length) {
                                        playerTurnCount = 0;
                                    }
                                    currentGameRef.update({
                                        currentTurn: playerOrder[playerTurnCount]
                                    })
                                }
                                currentPlayerRef.forEach(function(snap) {
                                        if (snap.val().playerBlackCount == winLimit) {
                                            //winner(snap.key)
                                            if (host) {
                                                //change gamestate
                                            }
                                        }

                                    })
                                    //check if somebody had reached score limit
                                    //if not start from state.chooseBlack
                                    //else go to state.gameOver
                                break;
                            case (state.gameOver):
                                //allow users to return to match making screen
                                break;
                            case (state.quitGame):
                                break;
                        } //switch
                    } //else

                }) //currentgame.on
        }) //then
}
