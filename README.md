<p align="center"><img src="https://raw.githubusercontent.com/defrizletov/dicewheel/main/docs/logo.svg?sanitize=true"></p>
<p align="center">
<a href="https://www.npmjs.com/package/dicewheel"><img src="https://img.shields.io/npm/v/dicewheel.svg?style=flat-square" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/dicewheel"><img src="https://img.shields.io/npm/dt/dicewheel.svg?style=flat-square" alt="NPM downloads"></a>
</p>

<div align="center">

**Модуль** для удобного использования **[DiceWheel API](https://vk.com/@dw_bot-api)**.
  
От **[AdepT-Hub](https://adept-hub.ru)** с ❤.

</div>

## 📦 Установка

```sh
npm i dicewheel
```

<br/>

## 🚀 Использование

```js
const { DiceWheel, DiceWheelCallback } = require('dicewheel');

// token - ваш ключ авторизации, полученный в приложении.
const diceWheel = new DiceWheel({ token: process.env.TOKEN });

// Запрос для примера, получение баланса нашего аккаунта.
// Потом вывод ответа или ошибки в консоль.
diceWheel.getBalance().then(console.log).catch(console.error);

// Подключение callback.

// Создаем сервер с нашим callback_secret.
const diceWheelCallback = new DiceWheelCallback(process.env.CALLBACK_SECRET);

// Устанавливаем обработчик, который выполнится, когда придёт пополнение.
// Эта функция выведет объект события в консоль.
diceWheelCallback.on(event => console.log(event));

// Запуск сервера на порт 3000 и хост localhost (порт 3000 стоит по умолчанию).
// Потом, если все успешно, пишем в консоль, что сервер запустился, в противном случае выводим ошибку в консоль.
diceWheelCallback.start(3000, 'localhost').then(console.log('DiceWheel Callback has been started.')).catch(console.error);
```