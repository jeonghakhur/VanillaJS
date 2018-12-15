const form = document.querySelector('.user-name');
const input = form.querySelector('input');
const greeting = document.querySelector('.greeting');


const USER_LS = 'currentUser';

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = input.value;
  localStorage.setItem(USER_LS, currentValue);
  input.value = '';
}

function askForName() {
  form.classList.add('show');
  form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove('show');
  greeting.classList.add('show');
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser)
  }
}

function init() {
  loadName();
}

init()