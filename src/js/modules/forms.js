'use strict';

import checkNumInputs from './checkNumInputs';

const forms = (state) => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input');

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Произошла ошибка...'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });

    return await res.text();
  }; // Отправка запроса на сервер, если бы были не только POST запросы, а например и GET, или множество разных запросов, то в таком случае следует создать папку services (в js) и там структурировать (разделя запросы на определенные файлы)

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
  }; // Очистка инпутов

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault(); // Сбрасываем стандартное поведение браузера при отправке формы

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage); // Создаем поле для пользователя со статусом отправки

      const formData = new FormData(item); // Создаем переменную с данными, которые будут отправлены на сервер
      if (item.getAttribute('data-calc') === "end") {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      } // Берём те данные из state, которые уже сформировались, перебираем их и отправляем в formData при помощи метода append

      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 3000);
          // setTimeout(() => {
          //   if (document.querySelector('[data-calc]')){
          //     document.querySelector('.popup_calc_end').style.display = 'none';
          //     document.body.style.overflow = '';
          //   }
          // }, 3000);
        }); // Обрабатываем промис, который вернется, и сбрасываем форму.
    });
  });
};

export default forms;