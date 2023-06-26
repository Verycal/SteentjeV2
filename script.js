const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const countdownElement = document.querySelector('[data-countdown]');
const highscoreSpan = document.querySelector('[data-highscore]');
const resultScreen = document.querySelector('.result-screen');
const resultText = document.querySelector('.result-text');
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '🪨',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '📄',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✂️',
    beats: 'paper'
  }
];

let countdownTimer;
let highscore = 0;

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(selection => selection.name === selectionName);
    
    startCountdown(3, () => {
      makeSelection(selection);
    });
  });
});

function makeSelection(selection) {
  const computerSelection = randomSelection();
  const yourWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  clearSelectionResults();
  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);

  if (yourWinner) {
    incrementScore(yourScoreSpan);
    showResultScreen("You Win!");
  }
  if (computerWinner) {
    incrementScore(computerScoreSpan);
    showResultScreen("You Lose!");
  }
  
  if (parseInt(yourScoreSpan.innerText) > highscore) {
    highscore = parseInt(yourScoreSpan.innerText);
    highscoreSpan.innerText = highscore;
  }
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function clearSelectionResults() {
  const selectionResults = document.querySelectorAll('.result-selection');
  selectionResults.forEach(result => {
    result.remove();
  });
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div');
  div.innerText = selection.emoji;
  div.classList.add('result-selection');
  if (winner) div.classList.add('winner');
  finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}

function startCountdown(seconds, callback) {
  countdownElement.innerText = seconds;

  countdownTimer = setInterval(() => {
    seconds--;
    countdownElement.innerText = seconds;

    if (seconds === 0) {
      clearInterval(countdownTimer);
      countdownElement.innerText = '';

      if (typeof callback === 'function') {
        callback();
      }
    }
  }, 1000);
}

function showResultScreen(result) {
  resultText.innerText = result;
  resultScreen.classList.add('show');

  setTimeout(() => {
    resultScreen.classList.remove('show');
  }, 2000);
}
