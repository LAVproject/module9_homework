// Получение числа из input
const inputNumber = document.querySelector('#input-number');
// Кнопка отправки числа
const buttonSubmit = document.querySelector('#button-submit');
// Блок вывода текста
const resultText = document.querySelector('#result-text');
// Галерея
const gallery = document.querySelector('#gallery');

// Подписка на нажатие кнопки Отправить
buttonSubmit.addEventListener('click', () => {
    // Получаемое число
    const number = parseInt(inputNumber.value);

    // Очистка блока вывода текста и галереи
    resultText.textContent = ''
    gallery.textContent = ''

    // Проверка диапазона от 1 до 10
    if (number < 1 || number > 10 || isNaN(number)) {
        // Вывод сообщения
        resultText.textContent = 'Число вне диапазона от 1 до 10';
    }
    else {
        // Шаблон url запроса
        const url = `https://jsonplaceholder.typicode.com/photos?_limit=${number}`;

        // Создание экземпляра класса XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Инициализация запроса
        xhr.open('GET', url);

        // Обработка ответа
        xhr.onload = () => {
            // Успешный запрос
            if (xhr.status === 200) {
                // Парсинг ответа в объект
                const data = JSON.parse(xhr.responseText);

                // Перебор объекта с данными
                for (let i = 0; i < data.length; i++) {
                    // Создание элемента картинки
                    const img = document.createElement('img');
                    // Установка в аттрибут ссылки на картинку
                    img.src = data[i].url
                    // Вывод картинки на экран
                    gallery.appendChild(img);
                }
            }
            else {
                // Вывод в консоль статус ответа
                console.log('Статус ответа: ', xhr.status)
            }
        };

        // Обработка ошибки
        xhr.onerror = () => {
            // Выводим сообщение
            resultText.textContent = 'Произошла ошибка при получении данных';
        }

        // Отправка запроса
        xhr.send();
    }
});