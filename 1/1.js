// Создание экземпляра класса DOMParser.
const parser = new DOMParser();

// Строка XML
const xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`

// Функция преобразует XML в JS-объект
function xml2Obj(xml) {
    // Парсинг XML
    const xmlDOM = parser.parseFromString(xml, "text/xml");

    // Получение DOM-нод
    const listNode = xmlDOM.querySelector("list");
    const studentAllNode = listNode.querySelectorAll("student");

    // Функция парсит данные по студенту
    function parseStudent(studentNode) {
        // Получение DOM-нод
        const nameNode = studentNode.querySelector('name')
        const firstNode = nameNode.querySelector('first')
        const secondNode = nameNode.querySelector('second')
        const ageNode = studentNode.querySelector('age')
        const profNode = studentNode.querySelector('prof')

        // Получение данных из атрибутов
        const langAttr = nameNode.getAttribute('lang');

        // Собрание и возврат объекта с данными по студенту
        return {
            name: `${firstNode.textContent} ${secondNode.textContent}`,
            age: ageNode.textContent,
            prof: profNode.textContent,
            lang: langAttr
        }
    }

    // Создание временного объекта, куда сложим данные по студентам
    const obj = {list: []}

    // Сбор данных во временный объект по студентам
    for (let i = 0; i < studentAllNode.length; i++) {
        obj.list.push(parseStudent(studentAllNode[i]))
    }

    return obj
}

// Преобразование XML в JS-объект
const obj = xml2Obj(xmlString)

// Вывод JS-объекта в консоль
console.log('obj', obj)


