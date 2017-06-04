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
    let blackNum = 0;
    $(".hide-create").hide();
    $(".hide-waiting").show();

    currentGameRef = gameRef.child(key);
    currentChatRef = currentGameRef.child('chat');
    currentChatRef.on('child_added', function(snap) {
        if (snap.key === 'chat') {} else {
            let newDiv = $("<div>");
            let message = $("<p>").text(snap.val().message);
            let name = $("<strong>").text(snap.val().displayName + ": ");
            message.prepend(name);
            newDiv.append(message);
            $("#chat").append(newDiv)
        }
    });
    currentGameRef.once("value", function(snap) {

            //grab all data needed to have stored
            blackOrder = snap.val().blackOrder;
            localWhiteOrder = snap.val().whiteOrder;
            whiteOrder = localWhiteOrder;
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
            $("#waiting-host-table").html("<tr><th>Host</th><th class='text-center'>Players Joined</th><th class='text-center'>Cards</th></tr>")
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
                        currentGameRef.child("state").off()
                        currentChatRef.off();
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
                                fireObj.globalChatOff();
                                //TODO: hide game list
                                $("#current-turn-name").text("");
                                for (var i = 0; i < 4; i++) {
                                    $("#row" + i).html("");
                                }
                                $("#waiting-player-table").html("<tbody><tr> <th>Players</th></tr></tbody>");
                                if (!host) {
                                    // if not the host build and add player object based on player uid
                                    fireObj.buildPlayerObj(key, playerKey)
                                }
                                // currentGameRef.child("totalPlayers").on("value", function(snap) {
                                //         $("#currentPlay").text(snap.val());

                                //     })

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
                                    $("#waiting-player-table tbody").append(newTr);
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
                                currentGameRef.child("totalPlayers").off()
                                currentPlayerRef.off()
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

                                break;

                                // break;
                            case (state.pickWhite):
                                //display all choosed white cards to everyone in random order
                                fireObj.showAllChoices(currentBlack, currentTurn, pick, host);


                                if (currentTurn === (host ? "host" : currentUid)) {
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
                                $(".black-card-name").show()
                                currentGameRef.child("winner").once("value", function(snap) {
                                    currentPlayerRef.child(snap.val()).once("value", function(snap) {
                                        console.log(snap.key, snap.val().displayName)
                                        $("#" + snap.val().displayName + " .flipper .back").css("background", "gold");
                                    })
                                    if (snap.val() === (host ? "host" : currentUid)) {
                                        currentPlayerRef.child((host ? "host" : currentUid)).child("blackCards").child(blackNum).set(true)
                                        currentPlayerRef.child((host ? "host" : currentUid)).child("playerBlackCount").transaction(function(snap) {
                                            return snap + 1
                                        })
                                    }
                                    currentPlayerRef.child((host ? "host" : currentUid)).update({
                                        chosenWhiteCard1: "",
                                        chosenWhiteCard2: "",
                                    })
                                })
                                if (host) {
                                    setTimeout(function() {
                                        currentGameRef.update({
                                            state: state.nextTurn
                                        })
                                    }, 5000)
                                }
                                // show owner of each white card
                                //award black card to winner
                                break;
                            case (state.nextTurn):
                                modal.style.display = "none";
                                $('#selectedBlack').html("")
                                if (host) {
                                    playerTurnCount++;
                                    if (playerTurnCount === playerOrder.length) {
                                        playerTurnCount = 0;
                                    }
                                    currentGameRef.update({
                                        currentTurn: playerOrder[playerTurnCount]
                                    })
                                }
                                if (host) {
                                    currentPlayerRef.once("value", function(snap) {

                                        let winner = false;
                                        snap.forEach(function(snap) {
                                            if (snap.val().playerBlackCount === winLimit) {
                                                //winner(snap.key)

                                                winner = true;

                                            }

                                        })
                                        if (winner) {
                                            currentGameRef.update({
                                                state: state.gameOver
                                            })
                                        } else {
                                            currentGameRef.update({
                                                state: state.chooseBlack
                                            })
                                        }
                                    })
                                }
                                //check if somebody had reached score limit
                                //if not start from state.chooseBlack
                                //else go to state.gameOver
                                break;
                            case (state.gameOver):
                                currentPlayerRef.once("value", function(snap) {
                                        snap.forEach(function(childSnap) {
                                            currentPlayerRef.child(childSnap.key).child("blackCount").off()
                                        })
                                    })
                                    //allow users to return to match making screen
                                break;
                            case (state.quitGame):
                                if (host) {
                                    currentGameRef.remove()
                                    currentPlayerRef.remove()
                                }
                                currentGameRef.child("state").off()
                                fireObj.globalChatOn();
                                $("#waiting").hide();
                                $(".hide-waiting").hide();
                                $(".hide-create").show();
                                $("#hideCards").hide();

                                break;
                        } //switch
                    } //else

                }) //currentgame.on
        }) //then
}
