// JSON
const jsonString = `{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`

// Преобразование JSON в JS-объект
const obj = JSON.parse(jsonString)

// Вывод JS-объекта в консоль
console.log('obj', obj)