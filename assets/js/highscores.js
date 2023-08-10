const printHighscores = () => {
  const highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  highscores.sort((a, b) => b.score - a.score);

  const olEl = document.getElementById('highscores');
  olEl.innerHTML = ''; // Clear previous entries

  highscores.forEach((score) => {
    const liTag = document.createElement('li');
    liTag.textContent = `${score.initials} - ${score.score}`;
    olEl.appendChild(liTag);
  });
};

const clearHighscores = () => {
  window.localStorage.removeItem('highscores');
  window.location.reload();
};

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearHighscores);

printHighscores();
