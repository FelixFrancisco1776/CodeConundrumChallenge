function createQuestion(title, choices, answer) {
  return {
    title: title,
    choices: choices,
    answer: answer,
  };
}

var questions = [
  createQuestion(
    'Commonly used data types DO NOT include:',
    ['strings', 'booleans', 'alerts', 'numbers'],
    'alerts'
  ),
  createQuestion(
    'The condition in an if / else statement is enclosed within ____.',
    ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    'parentheses'
  ),
  createQuestion(
    'Arrays in JavaScript can be used to store ____.',
    ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    'all of the above'
  ),
  createQuestion(
    'String values must be enclosed within ____ when being assigned to variables.',
    ['commas', 'curly brackets', 'quotes', 'parentheses'],
    'quotes'
  ),
  createQuestion(
    'A very useful tool used during development and debugging for printing content to the debugger is:',
    ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    'console.log'
  ),
];
