# cahGame

mainDatabase
	black-cards
		card0
			text
			pick
	white-cards
		card0
			text

	users
		$uid
			displayNmae
			joinedGame
			whiteCards
			blackCards
			winCount: []
			totalBlackCard
			uid
			profile
				info
				pic
	game
		$gameid
			host
			gameState
			playerTurn
			maxUser
			connectedUsers
			blackCardOrder
			whiteCardOrder
			chat
				message
					name
					text
					timeCreated
			users
				$uid
					blackCards
					whitecards


/--/ Game Flow /--/

login.html
account.html
game.html

1. User sees login/signup page 
	a. User chooses to login with account info
	OR User chooses to create account
2. Account info is sent to firebase and confirmed or created
	a. If the account exists, give confirmation and load account page 
	b. else create account and load account page
		i. conditionals to validate information
3. Account page is loaded (options to play games -- global chat)
	a. User can join existing game
		i. User is taked to game.html
	b. User can create a game
		i. User waits for min-users(3)
		OR host starts the game and is then taken to game.html
4. Game is loaded
	a. Each user is given #? of white cards 
	b. Host chooses black card (order by joined)
		i. Selected player flips a black card
	c. Black card is shown to users
	d. Users choose #of cards === black card blanks (on time limit -- dislay timeOut warning to users)
		i. Users get white card to replace chosen cards
	e. All players get shown cards (one at a time on interval)
	f. Selected user chooses from white cards (on time limit)
	g. Seleced users choice is highlighted and owners or white cards is revealed
		i. score is updated

REPEATE FROM SET B UNTIL GAME OVER

5. Game Over
	a. Show game results
	b. display larger chat group
	c. click to return to account.html
















