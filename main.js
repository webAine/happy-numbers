const gameWrapper = document.querySelector('.game__wrapper');
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const multiplier = 4;

const mathItems = numbers
  .map(
    (num) => `
    <div class="game__items">
        <div class="game__math">
            <div class="game__math-item">
                <span class="game__math-item-number">${multiplier}</span>
                <span class="game__math-item-symbol">×</span>
                <span class="game__math-item-number--2">${num}</span>
                <span class="game__math-item-symbol">=</span>
                <span class="game__math-item-result">${num * multiplier}</span>
                <input type="text" class="game__math-item-input">
            </div>
        </div>
        <div class="game__cubs">
            <div class="game__cubs-item">
                ${Array(multiplier)
                  .fill()
                  .map(() => '<div class="game__cub"></div>')
                  .join('')}
            </div>
        </div>
    </div>
    `
  )
  .join('');

gameWrapper.innerHTML = mathItems;

const mathInputs = document.querySelectorAll('.game__math-item-input');
const mathResults = document.querySelectorAll('.game__math-item-result');
const button = document.querySelector('.game__button');
button.disabled = true;

mathInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    const isEmpty = input.value.trim() === '';
    const isCorrect = input.value === mathResults[index].textContent;

    if (input.style.display !== 'none') {
      button.disabled = isEmpty;
      if (!isEmpty) {
        button.style.backgroundColor = isCorrect ? '#228B22' : '#FA8072';
      }
    }
  });
});

button.addEventListener('click', () => {
  button.disabled = true;
  
  mathInputs.forEach((input, index) => {
    const currentItems = input.closest('.game__items');
    const nextItems = currentItems.nextElementSibling;

    if (input.value === mathResults[index].textContent) {
      input.style.display = 'none';
      mathResults[index].style.display = 'block';
      if (nextItems) {
        nextItems.querySelector('.game__math').style.opacity = 1;
        nextItems.querySelector('.game__cubs').style.opacity = 1;
      }
    } else {
      input.classList.add('wrong-answer');
      input.addEventListener(
        'animationend',
        () => {
          input.classList.remove('wrong-answer');
        },
        { once: true }
      );
    }
  });
});