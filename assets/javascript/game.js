/*
	global vars needed
		-array of words to be guessed
		-string for word to be displayed (including underscores)
		-number of guesses remaining
		-array for letters already guessed
		-number of wins
	if user's guess is correct, does not get subtracted from number of guesses
*/

var words = ["CREEDBRATTON", "PHYLLISVANCE", "KEVINMALONE", "ANDYBERNARD", "DWIGHTSCHRUTE", "MICHAELSCOTT", "PAMHALPERT", "JIMHALPERT"];
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
		displayCorrectGuess();
		updateDisplayWord();
		if (hiddenWord == currentWord) {
			wins++;
			winningSound.play();
			document.getElementById('gif').innerHTML = "<img src=" + winningGif + ">";
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


function updateDisplayWord() {
	displayWord = hiddenWord.substr(0, 1);
	for (i = 1; i < hiddenWord.length; i++) {
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
	document.getElementById('currentWord').innerHTML = "" + displayWord;
	document.getElementById('numOfGuesses').innerHTML = "" + numOfGuesses;
	document.getElementById('guessedLetters').innerHTML = " " + guessedLetters;
}