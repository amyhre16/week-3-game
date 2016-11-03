/*
	global vars needed
		-array of words to be guessed
		-string for word to be displayed (including underscores)
		-number of guesses remaining
		-array for letters already guessed
		-number of wins
	if user's guess is correct, does not get subtracted from number of guesses
*/

/*var words = ["CREEDBRATTON", "PHYLLISVANCE", "KEVINMALONE", "ANDYBERNARD", "DWIGHTSCHRUTE", "MICHAELSCOTT", "PAMHALPERT", "JIMHALPERT"];
var sounds = ["assets/mp3/creed.m4a", "assets/mp3/phyllis.m4a", "assets/mp3/kevin.m4a", "assets/mp3/andy.m4a", "assets/mp3/dwight.m4a", "assets/mp3/michael.m4a", "assets/mp3/pam.m4a", "assets/mp3/jim.m4a"];
var gifs = ["assets/images/creed.gif", "assets/images/phyllis.gif", "assets/images/kevin.gif", "assets/images/andy.gif", "assets/images/dwight.gif", "assets/images/michael.gif", "assets/images/pam.gif", "assets/images/jim.gif"]
var winningSound;
var winningGif;
var currentWord;
var displayWord;
var numOfGuesses;
var guessedLetters;
var wins = 0;
var newPage = true;
var idiot = new Audio('assets/mp3/dwight_idiot.mp3');
var nailedIt = new Audio('assets/mp3/nailed_it.mp3');
var michael_scott = new Audio('assets/mp3/michael_scott.mp3');
var guess;
var hiddenWord;

function startGame() {
	var index = Math.floor(Math.random() * 8);
	currentWord = words[index];
	winningSound = new Audio(sounds[index]);
	winningGif = gifs[index];
	guessedLetters = "";
	numOfGuesses = 12;
	initializeDisplayWords();
}

function initializeDisplayWords () {
	hiddenWord = "";
	displayWord = "";
	for (var i = 0; i < currentWord.length - 1; i++) {
		displayWord += "_ ";
		hiddenWord += "_";
	}
	displayWord += "_";
	hiddenWord += "_";
}


function checkGuess() {
	// if the guess is correct, then display the guess
	if ((currentWord.indexOf(guess) != -1) && (hiddenWord.indexOf(guess) == -1)) {
		displayCorrectGuess();*/
/*		updateDisplayWord();
		if (hiddenWord == currentWord) {
			wins++;
			winningSound.play();
			document.getElementById('gif').innerHTML = "<img src=" + winningGif + ">";
			// lastWord = currentWord;
			revealLastWord();
			startGame();
		}
		else {
			nailedIt.play();
		}
	}

	else if ((guessedLetters.indexOf(guess) == -1) && (currentWord.indexOf(guess) == -1)) {
		// if the guess is incorrect
		guessedLetters += guess + ", ";
		numOfGuesses--;
		if (numOfGuesses == 0) {
			michael_scott.play();
			revealLastWord();
			startGame();
		}
		else {
			idiot.play();
		}
	}

}


function displayCorrectGuess() {

	// loop through the display word to display the guess at all places it exists in the current word
	for (var i = 0; i < currentWord.length; i++) {
		// check to see if the guess matches the current index. If so, then replace the index w/ the guess
		if (currentWord[i] == guess) {
			hiddenWord = hiddenWord.substr(0, i) + guess + hiddenWord.substr(i + 1);
		}
	}
}

function revealLastWord() {
	displayWord = "";
	for (var i = 0; i < currentWord.length - 1; i++) {
		displayWord += currentWord.substr(i, 1) + " ";
	}
	displayWord += currentWord.substr(currentWord.length - 1);
	document.getElementById('lastWord').innerHTML = "Last Word: " + displayWord;
}

function updateDisplayWord() {
	displayWord = hiddenWord.substr(0, 1);
	for (var i = 1; i < hiddenWord.length; i++) {
		displayWord += " " + hiddenWord.substr(i, 1);
	}
}


document.onkeyup = function(event) {
	guess = String.fromCharCode(event.keyCode);
	if (newPage) {
		newPage = false;
		startGame();
	}

	else {
		// if the guess is a letter and has not already been guessed, reguardless if it was a correct guess
		if (event.keyCode >= 65 && event.keyCode <= 90) {
			checkGuess();
		}
	}

	document.getElementById('wins').innerHTML = "" + wins;
	// document.getElementById('lastWord').innerHTML = "Last Word: " + displayWord;
	document.getElementById('currentWord').innerHTML = "" + displayWord;
	document.getElementById('numOfGuesses').innerHTML = "" + numOfGuesses;
	document.getElementById('guessedLetters').innerHTML = " " + guessedLetters;
}
*/


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
		/* 	this is used to display the user's correct guesses and the character places that have yet to be guessed
			
		*/
		this.displayWord = "";
		for ( var i = 0; i < this.currentWord.length - 1; i++ ) {
			this.displayWord += "_ ";
			this.hiddenWord += "_";
		}
		this.displayWord += "_";
		this.hiddenWord += "_";
	},

	checkGuess: function () {
		if ((this.currentWord.indexOf(this.guess) != -1) && (this.hiddenWord.indexOf(this.guess) == -1)) {
			this.displayCorrectGuess();
			this.updateDisplayWord();
			if (this.hiddenWord == this.currentWord) {
				this.wins++;
				this.winningSound.play();
				document.getElementById('gif').innerHTML = "<img src=" + this.winningGif + " />";
				this.revealLastWord();
				this.startGame();
			}
			else {
				this.nailedIt.play();
			}
		}

		else if ((this.guessedLetters.indexOf(this.guess) == -1) && (this.currentWord.indexOf(this.guess) == -1)) {
			this.guessedLetters += this.guess + ", ";
			this.numOfGuesses--;
			if (this.numOfGuesses == 0) {
				this.michael_scott.play();
				this.revealLastWord();
				this.startGame();
			}

			else {
				this.idiot.play();
			}
		}
	},

	displayCorrectGuess: function () {
		for ( var i = 0; i < this.currentWord.length; i++ ) {
			if (this.currentWord[i] == this.guess) {
				this.hiddenWord = this.hiddenWord.substr(0, i) + this.guess + this.hiddenWord.substr(i + 1);
			}
		}
	},

	revealLastWord: function () {
		this.displayWord = "";
		for ( var i = 0; i < this.currentWord.length - 1; i++ ) {
			this.displayWord += this.currentWord.substr(i, 1) + " ";
		}
		this.displayWord += this.currentWord.substr(this.currentWord.length - 1);
		document.getElementById('lastWord').innerHTML = "Last Word: " + this.displayWord;
	},

	updateDisplayWord: function () {
		this.displayWord = this.hiddenWord.substr(0, 1);
		for ( var i = 1; i < this.hiddenWord.length; i++ ) {
			this.displayWord += " " + this.hiddenWord.substr(i, 1);
		}
	}
}

// game.openingSong.play();

document.onkeyup = function(event) {
	game.guess = String.fromCharCode(event.keyCode);
	console.log(game);
	if (game.newPage) {
		game.newPage = false;
		// game.openingSong.pause();
		game.startGame();
	}

	else {
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