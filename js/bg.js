const bgImage = document.querySelector('.bg-image');

const IMG_NUMBER = 3;

function paintImage() {
  const image = new Image();
  image.src = `./img/${getRandom(1, IMG_NUMBER)}.jpg`;
  bgImage.style.backgroundImage = `url('${image.src}')`;
  bgImage.classList.add('fadeIn');
}

// min (포함) 과 max (포함) 사이의 임의 정수를 반환
function getRandom(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function init() {
  paintImage();
  // console.log(getRandom(1, 3));
}

init();