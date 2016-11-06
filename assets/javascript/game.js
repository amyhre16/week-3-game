// Create the game object. This contains all of the properties (i.e., variables) and methods (i.e., functions)
var game = {
	// these are the properties
	// this is an array of the possible words the user will guess
	words: ["CREEDBRATTON", "PHYLLISVANCE", "KEVINMALONE", "ANDYBERNARD", "DWIGHTSCHRUTE", "MICHAELSCOTT", "PAMHALPERT", "JIMHALPERT"], 
	/*
		these are the sound clips that will play if the user correctly guesses the word. each index is lined up with the indecies of words (same with gifs)
		this ensures that the right clip will play when the word is correctly guess
	*/
	sounds: ["assets/mp3/creed.m4a", "assets/mp3/phyllis.m4a", "assets/mp3/kevin.m4a", "assets/mp3/andy.m4a", "assets/mp3/dwight.m4a", "assets/mp3/michael.m4a", "assets/mp3/pam.m4a", "assets/mp3/jim.m4a"],
	// same idea as w/ the sounds, these are the gifs for each word
	gifs: ["assets/images/creed.gif", "assets/images/phyllis.gif", "assets/images/kevin.gif", "assets/images/andy.gif", "assets/images/dwight.gif", "assets/images/michael.gif", "assets/images/pam.gif", "assets/images/jim.gif"],
	// initialize properties that will be assigned later
	winningSound: "",
	winningGif: "",
	currentWord: "",
	displayWord: "",
	hiddenWord: "",
	guessedLetters: "",
	numOfGuesses: "",
	wins: 0,
	// newPage lets the object know that the page has been reloaded 
	newPage: true,
	// plays when user inputs incorrect guess
	idiot: new Audio('assets/mp3/dwight_idiot.mp3'),
	// plays when user inputs correct guess
	nailedIt: new Audio('assets/mp3/nailed_it.mp3'),
	// plays when user uses all of its guesses
	michael_scott: new Audio('assets/mp3/michael_scott.mp3'),
	// plays when page loads
	// openingSong: new Audio('assets/mp3/the_office.mp3'),
	guess: "",

	// this will start a new game
	startGame: function () {
		// generate random number to select a word to be guessed
		var index = Math.floor(Math.random() * 8);
		this.currentWord = this.words[index];
		this.winningSound = new Audio(this.sounds[index]);
		this.winningGif = this.gifs[index];
		// clear string for guessed letters
		this.guessedLetters = "";
		// reset number of guesses
		this.numOfGuesses = 12;
		// call method to initialize display words
		this.initializeDisplayWords();
	},

	// this method initilizes two words w/ _s, hiddenWord and displayWord
	initializeDisplayWords: function () {
		// this will be the same length as currentWord. It will be used to reveal guessed letters on displayWord later
		this.hiddenWord = "";
		// 	this is used to display the user's correct guesses and the character places that have yet to be guessed
		this.displayWord = "";

		// for every index (except for the last index) in the current word, add an underscore and space to displayWord and an underscore to hiddenword
		for ( var i = 0; i < this.currentWord.length - 1; i++ ) {
			this.displayWord += "_ ";
			this.hiddenWord += "_";
		}
		// add another underscore to the end so the display word does not end with a space
		this.displayWord += "_";
		this.hiddenWord += "_";
	},


	checkGuess: function () {
		// if guess is correct and the user has not already guessed this letter
		if ((this.currentWord.indexOf(this.guess) != -1) && (this.hiddenWord.indexOf(this.guess) == -1)) {

			// update the hidden and display words
			this.updateHiddenWord();
			this.updateDisplayWord();

			/*
				check to see if the user has won
				if they have won, increment wins, play the winning sound, diplay the character's gif, reveal the last (the current) word,
				and reset the game by calling startGame()
			*/
			if (this.hiddenWord == this.currentWord) {
				this.wins++;
				this.winningSound.play();
				document.getElementById('gif').innerHTML = "<img src=" + this.winningGif + " />";
				this.revealLastWord();
				this.startGame();
			}

			// if the user has not won this round, have Andy do his thing #nailedIt #NardDog
			else {
				this.nailedIt.play();
			}
		}

		/*	the guess was incorrect and the user has not already guessed it
			add the guess to guessedLetters, decrease the # of guesses left
		*/
		else if ((this.guessedLetters.indexOf(this.guess) == -1) && (this.currentWord.indexOf(this.guess) == -1)) {
			this.guessedLetters += this.guess + ", ";
			this.numOfGuesses--;

			// if # of guesses is 0, user loses, Michael Scott screams the scream of agony, the last (current) word is revealed and the game is reset
			if (this.numOfGuesses == 0) {
				this.michael_scott.play();
				this.revealLastWord();
				this.startGame();
			}

			// Dwight reminds the user that he/she is an idiot
			else {
				this.idiot.play();
			}
		}
	},

	updateHiddenWord: function () {
		// loop through the current word to reveal the guess in hiddenWord everywhere it appears
		for ( var i = 0; i < this.currentWord.length; i++ ) {
			if (this.currentWord[i] == this.guess) {
				this.hiddenWord = this.hiddenWord.substr(0, i) + this.guess + this.hiddenWord.substr(i + 1);
			}
		}
	},

	updateDisplayWord: function () {
		// assign first character (could be letter or underscore) of hidden word
		this.displayWord = this.hiddenWord.substr(0, 1);

		// loop through hiddenWord starting at second character and put a space between each character
		for ( var i = 1; i < this.hiddenWord.length; i++ ) {
			this.displayWord += " " + this.hiddenWord.substr(i, 1);
		}
	},

	revealLastWord: function () {
		// clear displayWord
		this.displayWord = "";

		// loop through current word and add each character (except for last character) and a space to the end of displayWord
		for ( var i = 0; i < this.currentWord.length - 1; i++ ) {
			this.displayWord += this.currentWord.substr(i, 1) + " ";
		}

		// add final character to displayWord so that it doesn't end with a space
		this.displayWord += this.currentWord.substr(this.currentWord.length - 1);
		// print the word onto the page at #lastWord
		document.getElementById('lastWord').innerHTML = "Last Word: " + this.displayWord;
	}

}

// is triggered every time the user releases a key
document.onkeyup = function(event) {
	// assigns letter assigned to the key code to the guess property of game
	game.guess = String.fromCharCode(event.keyCode);
	// triggered when the page is opened/reopened
	if (game.newPage) {
		// assign false to newPage property so that this condition is no longer triggered until page is reloaded
		game.newPage = false;
		document.getElementById('pressAnyBtn').innerHTML = "Please enter your next guess!";
		// initialize properties by starting game
		game.startGame();
	}

	// triggered when user has already pressed any key to begin game
	else {
		// only check the guess if the key pressed is a letter
		if (event.keyCode >= 65 && event.keyCode <= 90) {
			game.checkGuess();
		}
	}

	// display properties
	document.getElementById('wins').innerHTML = "" + game.wins;
	document.getElementById('currentWord').innerHTML = "" + game.displayWord;
	document.getElementById('numOfGuesses').innerHTML = "" + game.numOfGuesses;
	document.getElementById('guessedLetters').innerHTML = "" + game.guessedLetters;

}