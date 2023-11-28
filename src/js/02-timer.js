import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Notiflix.Report.failure(
        'Error',
        'Please choose a date in the future',
        'OK'
      );
      dateInput._flatpickr.clear(); 
    } else {
      if (!timerInterval) {
        startButton.removeAttribute('disabled');
      }
    }
  },
};
flatpickr(dateInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function startTimer() {
  const selectedDate = dateInput._flatpickr.selectedDates[0];

  if (!selectedDate) {
    Notiflix.Report.failure('Error', 'Please choose a date', 'OK');
    return;
  }
  function updateTimer() {
    const timeDiff = selectedDate.getTime() - Date.now();
    if (timeDiff <= 0) {
      clearInterval(timerInterval);
      timerFields.days.textContent = '00';
      timerFields.hours.textContent = '00';
      timerFields.minutes.textContent = '00';
      timerFields.seconds.textContent = '00';
      Notiflix.Report.success('Success', 'Timer finished!', 'OK', resetTimer);
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDiff);
      timerFields.days.textContent = addLeadingZero(days);
      timerFields.hours.textContent = addLeadingZero(hours);
      timerFields.minutes.textContent = addLeadingZero(minutes);
      timerFields.seconds.textContent = addLeadingZero(seconds);
    }
  }
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
  startButton.setAttribute('disabled', 'disabled');
}
function resetTimer() {
  dateInput._flatpickr.clear();
  startButton.removeAttribute('disabled');
  timerFields.days.textContent = '00';
  timerFields.hours.textContent = '00';
  timerFields.minutes.textContent = '00';
  timerFields.seconds.textContent = '00';
  clearInterval(timerInterval); 
  timerInterval = null; 
}
startButton.addEventListener('click', startTimer);
