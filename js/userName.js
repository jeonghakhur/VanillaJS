const form = document.querySelector('.user-name');
const input = form.querySelector('input');
const greeting = document.querySelector('.greeting');
const btnDelete = document.querySelector('.btn-name-delete');

const USER_LS = 'currentUser';

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleDelete() {
  localStorage.removeItem(USER_LS);
  greeting.innerText = '';
  loadName();
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = input.value;
  input.value = '';
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add('show');
  form.addEventListener('submit', handleSubmit);
  btnDelete.style.display = 'none';
}

function paintGreeting(text) {
  form.classList.remove('show');
  greeting.classList.add('show');
  greeting.innerText = `Hello ${text}`;
  btnDelete.style.display = 'inline-block';
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
  btnDelete.addEventListener('click', handleDelete);
}

init()