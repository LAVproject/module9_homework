// Получение номера страницы
const inputPageNumber = document.querySelector('#input-page_number');
// Получение лимита
const inputLimit = document.querySelector('#input-limit');
// Кнопка отправки запроса
const buttonSubmit = document.querySelector('#button-submit');
// Блок вывода текста
const resultText = document.querySelector('#result-text');
// Галерея
const gallery = document.querySelector('#gallery');
// Бэкап данных для восстановления при перезагрузке
const backup = localStorage.backup

// Функция выводит картинки в галерею
function loadImg2Gallery(data) {
    try {
        // Перебор объекта с данными
        for (let i = 0; i < data.length; i++) {
            // Создание элемента картинки
            const img = document.createElement('img');
            // Установка в аттрибут ссылки на картинку
            img.src = data[i].url;
            // Вывод картинки на экран
            gallery.appendChild(img);
        }
    }
    // Обработка ошибок
    catch (err) {
        // Вывод ошибки в консоль
        console.log('err', err)
    }
}

// Проверка наличия бэкапа
if (localStorage.backup) {
    // Вывод картинок из бэкапа в галерею
    loadImg2Gallery(JSON.parse(backup))
}

// Подписка на событие нажатия кнопки Отправить
buttonSubmit.addEventListener('click', () => {
    // Получаемый номер страницы
    const pageNumber = parseInt(inputPageNumber.value);
    // Получаемый лимит
    const limit = parseInt(inputLimit.value);

    // Очистка блока вывода текста и галереи
    resultText.textContent = ''
    gallery.textContent = ''

    // Проверка первого и второго input на диапазоны и числа - диапазон от 1 до 10
    if ((pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        // Вывод сообщения
        resultText.textContent = 'Номер страницы и лимит вне диапазона от 1 до 10';
    }
    // Проверка первого input на диапазон и число - диапазон от 1 до 10
    else if (pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) {
        // Вывод сообщения
        resultText.textContent = 'Номер страницы вне диапазона от 1 до 10';
    }
    // Проверка второго input на диапазон и число - диапазон от 1 до 10
    else if (limit < 1 || limit > 10 || isNaN(limit)) {
        // Вывод сообщения
        resultText.textContent = 'Лимит вне диапазона от 1 до 10';
    }
    else {
        // Шаблон url запроса
        const url = `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${limit}`;

        // Инициализация запроса
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // Очистка бэкапа
                localStorage.clear()
                // Запись бэкапа
                localStorage.setItem('backup', JSON.stringify(data))

                // Вывод картинок в галерею
                loadImg2Gallery(data)
            })
            // Обработка ошибок
            .catch((err) => {
                // Вывод сообщения
                resultText.textContent = 'Произошла ошибка при получении данных';
                // Вывод ошибки в консоль
                console.log('error: ', err)
            });
    }
})

