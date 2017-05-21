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