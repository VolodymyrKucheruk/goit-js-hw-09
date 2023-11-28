function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  let intervalId = null;

  startButton.addEventListener('click', startChangingColor);
  stopButton.addEventListener('click', stopChangingColor);

  function startChangingColor() {
    if (intervalId === null) {
      startButton.disabled = true;
      stopButton.removeAttribute('disabled');
      intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
    }
  }

  function stopChangingColor() {
    if (intervalId !== null) {
      startButton.removeAttribute('disabled');
      stopButton.disabled = true;
      clearInterval(intervalId);
      intervalId = null;
    }
  }
