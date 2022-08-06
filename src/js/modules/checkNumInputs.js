'use strict';

const checkNumInputs = (selector) => {
  const numInputs = document.querySelectorAll(selector);

  numInputs.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, ''); // Ищем все не цифры и заменяем на пустую строку
    });
  }); // Делаем проверку, чтобы в поле телефон вводились только цифры
};

export default checkNumInputs;