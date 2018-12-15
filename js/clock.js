const clockContainer = document.querySelector('.clock');
const clockTitle = clockContainer.querySelector('h1');

function getTime() {
  const date = new Date();
  // date.setHours(1);
  // date.setMinutes(1);
  // const minutes = date.getMinutes();
  // const hours = date.getHours();
  // const seconds = date.getSeconds();
  // clockTitle.innerText = `${hours}:${minutes}:${seconds}`
  // clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  const minutes = lengthCheck(date.getMinutes(), 10);
  const hours = lengthCheck(date.getHours(), 10);
  const seconds = lengthCheck(date.getSeconds(), 10);
  clockTitle.innerText = `${hours}:${minutes}:${seconds}`
}

function lengthCheck(str, length) {
  return str < length ? '0' + str : str;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();