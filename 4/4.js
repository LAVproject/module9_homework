// Получение ширины изображения
const inputWidth = document.querySelector('#input-width');
// Получение высоты изображения
const inputHeight = document.querySelector('#input-height');
// Кнопка отправки значений
const buttonSubmit = document.querySelector('#button-submit');
// Блок вывода текста
const resultText = document.querySelector('#result-text');
// Галерея
const gallery = document.querySelector('#gallery');

// Подписка на событие нажатия кнопки Отправить
buttonSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    // Очистка блоков вывода текста и галереи
    resultText.textContent = ''
    gallery.textContent = ''

    // Получаемая ширина
    const width = parseInt(inputWidth.value);
    // Получаемая высота
    const height = parseInt(inputHeight.value);

    // Проверка диапазона от 100 до 300
    if (width < 100 || width > 300 || height < 100 || height > 300 || isNaN(width) || isNaN(height)) {
        // Вывод сообщения
        resultText.textContent = 'Одно из чисел вне диапазона от 100 до 300';
    }
    else {
        // Шаблон url запроса
        const url = `https://dummyimage.com/${width}x${height}/`;

        // Инициализация запроса
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                // Создание url картинки
                const imageUrl = URL.createObjectURL(blob);
                // Создание элемента картинки
                const img = document.createElement('img');
                // Установка в аттрибут ссылки на картинку
                img.src = imageUrl;
                // Вывод картинки на экран
                gallery.appendChild(img);
            })
            .catch((err) => {
                // Вывод сообщения
                resultText.textContent = 'Произошла ошибка при получении данных';
                // Вывод ошибки в консоль
                console.log('error', err)
            });
    }
})