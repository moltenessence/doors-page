let pos1 = 0;
let pos2 = 0;

const itemWidth1 = () => document.querySelector('#main-slider .slider-container').clientWidth;
const itemWidth2 = () => document.querySelector('#reviews .slider-container').clientWidth;

const track1 = document.querySelector('#main-slider .slider-track'); 
const track2 = document.querySelector('#reviews .slider-track'); 

const btnNext1 = document.querySelector('#main-slider .btn-next');
const btnPrev1 = document.querySelector('#main-slider .btn-prev');
const btnNext2 = document.querySelector('#reviews .btn-next');
const btnPrev2 = document.querySelector('#reviews .btn-prev');

const act = 'active'; // Класс активности

function btnNext(a) { // Листание вперед (универсальная, в а вписывается номер слайдера), вешать на кнопки
  if (a == 1) pos1 -= itemWidth1(); // Уменьшение константы позиции на шаг прокрутки
  else pos2 -= itemWidth2();
  
  setPos(a); // Сдвиг соответствующего трека на необходимую длину
  checkBtns(a); // Проверка кнопок
}

function btnPrev(a) { // Листание назад (универсальная, в а вписывается номер слайдера), вешать на кнопки
  if (a == 1) pos1 += itemWidth1(); // Умвеличение константы позиции на шаг прокрутки
  else pos2 += itemWidth2();

  setPos(a); // Сдвиг соответствующего трека на необходимую длину
  checkBtns(a); // Проверка кнопок
}

const setPos = (a) => { // Сдвиг соответствующего трека на необходимую длину
  if (a == 1) track1.style.transform = `translateX(${pos1}px)`;
  else track2.style.transform = `translateX(${pos2}px)`;
}

const checkBtns = (a) => { // Проверка кнопок
  if (a == 1) {
    btnPrev1.disabled = pos1 === 0; // "назад" неактивна, если позиция = 0
    btnNext1.disabled = pos1 <= -itemWidth1(); // "вперед" неактивна, если позиция = -шагу трека
  } else {
    btnPrev2.disabled = pos2 === 0; // "назад" неактивна, если позиция = 0
    btnNext2.disabled = pos2 <= -3 * itemWidth2(); // "вперед" неактивна, если позиция = -3 шагам трека
  }
  // В зависимости от кол-ва элементов слайдера разные условия для кнопки "вперед"
}

document.addEventListener("DOMContentLoaded", () => { // Событие при загрузке страницы
  checkBtns(1);
  checkBtns(2);
});

// ЯКОРЬ

const offset = document.documentElement.clientHeight / 2; // Расстояние скролла, при котором показать якорь
const scrollUp = document.querySelector('.scroll-up'); // Собственно, якорь

const getTop = () => window.pageYOffset || document.documentElement.scrollTop; // Считает позицию скролла по У

window.addEventListener('scroll', () => { // Событие при скроллинге страницы
  if (getTop() > offset) scrollUp.classList.add(act); // Если проскроллено больше расстояния скролла - якорь акт
  else scrollUp.classList.remove(act); // Если нет - нет
});

scrollUp.addEventListener('click', () => { // Обработчик клика по якорю (что будет при клике по оном)
  window.scrollTo({ // Проскроллить до самого верха плавно
    top: 0,
    behavior: 'smooth'
  });

  if (scrollUp.classList.contains(act)) scrollUp.classList.remove(act); // Убрать акт класс, если был
  scrollUp.click();
});

function validateNumbersInput(evt) {
  var theEvent = evt || window.event;

  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

