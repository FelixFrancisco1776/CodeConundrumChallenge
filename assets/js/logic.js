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

const startQuiz = () => {
  const startScreenEl = document.getElementById('start-screen');
  startScreenEl.classList.add('hide');

  questionsEl.classList.remove('hide');

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  getQuestion();
};

const getQuestion = () => {
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
};

const questionClick = (event) => {
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
};

const quizEnd = () => {
  clearInterval(timerId);

  const endScreenEl = document.getElementById('end-screen');
  endScreenEl.classList.remove('hide');

  const finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  questionsEl.classList.add('hide');
};

const clockTick = () => {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
};

const saveHighscore = () => {
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
};

const checkForEnter = (event) => {
  if (event.key === 'Enter') {
    saveHighscore();
  }
};

submitBtn.addEventListener('click', saveHighscore);
startBtn.addEventListener('click', startQuiz);
choicesEl.addEventListener('click', questionClick);
initialsEl.addEventListener('keyup', checkForEnter);







// // variables to keep track of quiz state
// var currentQuestionIndex = 0;
// var time = questions.length * 15;
// var timerId;

// // variables to reference DOM elements
// var questionsEl = document.getElementById('questions');
// var timerEl = document.getElementById('time');
// var choicesEl = document.getElementById('choices');
// var submitBtn = document.getElementById('submit');
// var startBtn = document.getElementById('start');
// var initialsEl = document.getElementById('initials');
// var feedbackEl = document.getElementById('feedback');

// // sound effects
// var sfxRight = new Audio('assets/sfx/correct.wav');
// var sfxWrong = new Audio('assets/sfx/incorrect.wav');

// function startQuiz() {
//   // hide start screen
//   var startScreenEl = document.getElementById('start-screen');
//   startScreenEl.setAttribute('class', 'hide');

//   // un-hide questions section
//   questionsEl.removeAttribute('class');

//   // start timer
//   timerId = setInterval(clockTick, 1000);

//   // show starting time
//   timerEl.textContent = time;

//   getQuestion();
// }

// function getQuestion() {
//   // get current question object from array
//   var currentQuestion = questions[currentQuestionIndex];

//   // update title with current question
//   var titleEl = document.getElementById('question-title');
//   titleEl.textContent = currentQuestion.title;

//   // clear out any old question choices
//   choicesEl.innerHTML = '';

//   // loop over choices
//   for (var i = 0; i < currentQuestion.choices.length; i++) {
//     // create new button for each choice
//     var choice = currentQuestion.choices[i];
//     var choiceNode = document.createElement('button');
//     choiceNode.setAttribute('class', 'choice');
//     choiceNode.setAttribute('value', choice);

//     choiceNode.textContent = i + 1 + '. ' + choice;

//     // display on the page
//     choicesEl.appendChild(choiceNode);
//   }
// }

// function questionClick(event) {
//   var buttonEl = event.target;

//   // if the clicked element is not a choice button, do nothing.
//   if (!buttonEl.matches('.choice')) {
//     return;
//   }

//   // check if user guessed wrong
//   if (buttonEl.value !== questions[currentQuestionIndex].answer) {
//     // penalize time
//     time -= 15;

//     if (time < 0) {
//       time = 0;
//     }

//     // display new time on page
//     timerEl.textContent = time;

//     // play "wrong" sound effect
//     sfxWrong.play();

//     feedbackEl.textContent = 'YOUR WRONG!';
//   } else {
//     // play "right" sound effect
//     sfxRight.play();

//     feedbackEl.textContent = 'YOUR RIGHT!!!!';
//   }

//   // flash right/wrong feedback on page for half a second
//   feedbackEl.setAttribute('class', 'feedback');
//   setTimeout(function () {
//     feedbackEl.setAttribute('class', 'feedback hide');
//   }, 1000);

//   // move to next question
//   currentQuestionIndex++;

//   // check if we've run out of questions
//   if (time <= 0 || currentQuestionIndex === questions.length) {
//     quizEnd();
//   } else {
//     getQuestion();
//   }
// }

// function quizEnd() {
//   // stop timer
//   clearInterval(timerId);

//   // show end screen
//   var endScreenEl = document.getElementById('end-screen');
//   endScreenEl.removeAttribute('class');

//   // show final score
//   var finalScoreEl = document.getElementById('final-score');
//   finalScoreEl.textContent = time;

//   // hide questions section
//   questionsEl.setAttribute('class', 'hide');
// }

// function clockTick() {
//   // update time
//   time--;
//   timerEl.textContent = time;

//   // check if user ran out of time
//   if (time <= 0) {
//     quizEnd();
//   }
// }

// function saveHighscore() {
//   // get value of input box
//   var initials = initialsEl.value.trim();

//   // make sure value wasn't empty
//   if (initials !== '') {
//     // get saved scores from localstorage, or if not any, set to empty array
//     var highscores =
//       JSON.parse(window.localStorage.getItem('highscores')) || [];

//     // format new score object for current user
//     var newScore = {
//       score: time,
//       initials: initials,
//     };

//     // save to localstorage
//     highscores.push(newScore);
//     window.localStorage.setItem('highscores', JSON.stringify(highscores));

//     // redirect to next page
//     window.location.href = 'highscores.html';
//   }
// }

// function checkForEnter(event) {
//   // "13" represents the enter key
//   if (event.key === 'Enter') {
//     saveHighscore();
//   }
// }

// // user clicks button to submit initials
// submitBtn.onclick = saveHighscore;

// // user clicks button to start quiz
// startBtn.onclick = startQuiz;

// // user clicks on element containing choices
// choicesEl.onclick = questionClick;

// initialsEl.onkeyup = checkForEnter;
