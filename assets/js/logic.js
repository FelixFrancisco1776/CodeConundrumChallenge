// Quiz state variables
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// DOM element references
const questionsEl = document.getElementById('questions');
const timerEl = document.getElementById('time');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit');
const startBtn = document.getElementById('start');
const initialsEl = document.getElementById('initials');
const feedbackEl = document.getElementById('feedback');

// Sound effects
// const sfxRight = new Audio('assets/sfx/correct.wav');
// const sfxWrong = new Audio('assets/sfx/incorrect.wav');

function startQuiz() {
  const startScreenEl = document.getElementById('start-screen');
  startScreenEl.classList.add('hide');
  questionsEl.classList.remove('hide');

  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = '';

  currentQuestion.choices.forEach((choice, index) => {
    const choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);
    choiceNode.textContent = `${index + 1}. ${choice}`;
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick(event) {
  const buttonEl = event.target;

  if (!buttonEl.matches('.choice')) {
    return;
  }

  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = 'INCORRECT!';
  } else {
    feedbackEl.textContent = 'CORRECT!';
  }

  feedbackEl.classList.add('feedback');
  setTimeout(() => {
    feedbackEl.classList.remove('feedback');
  }, 1000);

  currentQuestionIndex++;

  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  const endScreenEl = document.getElementById('end-screen');
  endScreenEl.classList.remove('hide');

  const finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  questionsEl.classList.add('hide');
}

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  const initials = initialsEl.value.trim();

  if (initials !== '') {
    const highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    const newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'highscores.html';
  }
}

function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

submitBtn.addEventListener('click', saveHighscore);
startBtn.addEventListener('click', startQuiz);
choicesEl.addEventListener('click', questionClick);
initialsEl.addEventListener('keyup', checkForEnter);
