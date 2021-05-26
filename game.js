const languages = [
  'sql',
  'java',
  'csharp',
  'golang',
  'kotlin',
  'mongodb',
  'javascript',
  'python',
  'html',
  'css',
  'c',
  'ruby',
  'php'
];

let answer = '';
let guessed = [];
let maxWrong = 6;
let mistakes = 0;
let languageStatus = null;

function randomLanguage() {
  answer = languages[Math.floor(Math.random() * languages.length)];
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);
  if (answer.indexOf(chosenLetter) >= 0) {
    guessedLanguage();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangman();
  }
}

function updateMistakes() {
  document.getElementById('wrongGuess').innerHTML = mistakes;
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordspotlight').innerHTML = 'The answer is ' + answer;
    document.getElementById('keypad').innerHTML = 'You lose the Game';
  }
}

function updateHangman() {
  document.getElementById('hangmanPicture').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (languageStatus === answer) {
    document.getElementById('keypad').innerHTML = 'You Won the Game';
  }
}

function resetGame() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPicture').src = './images/0.jpg';
  randomLanguage();
  guessedLanguage();
  updateMistakes();
  generateKeyboard();
}

function guessedLanguage() {
  languageStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  document.querySelector('#wordspotlight').innerHTML = languageStatus;
}

function generateKeyboard() {
  let alpha = 'qwertyuiopasdfghjklzxcvbnm'.split("").map(letter =>
    `<button class="btn btn-lg btn-dark m-2"
        id='` + letter + `'
        onClick = handleGuess('` + letter + `')>
        ` + letter + `
        </button>`
  ).join('');
  document.querySelector('.keypad').innerHTML = alpha;
}

randomLanguage();
generateKeyboard();
guessedLanguage();




