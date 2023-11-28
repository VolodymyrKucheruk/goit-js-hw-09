import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  if (!form) {
    console.error('Form element not found');
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = parseInt(form.elements['delay'].value);
    const step = parseInt(form.elements['step'].value);
    const amount = parseInt(form.elements['amount'].value);

    if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
      console.error('Invalid input values');
      return;
    }

    generatePromises(amount, delay, step);
  });

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
  function generatePromises(amount, initialDelay, step) {
    for (let i = 1; i <= amount; i++) {
      const position = i;
      const delay = initialDelay + (i - 1) * step;

      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }
});
