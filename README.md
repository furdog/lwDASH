# lwDASH

## Мінімалістичний веб- дашборд.
<p float="left">
  <img src="https://github.com/user-attachments/assets/bd1c0eb5-c154-4832-aefb-ddda07689c3c" width="30%" />
  <img src="https://github.com/user-attachments/assets/8c0befcd-c550-4726-9a04-c61b1447b313" width="30%" /> 
  <img src="https://github.com/user-attachments/assets/68e5e13e-2f92-4319-a37e-7a26297b5a6c" width="30%" />
</p>

## Головні цілі проекту:
- Встроюваність. Ця бібліотека в першу чергу розроблюється для мікроконтролерів типу ESP32.
- Модульність. Все що не потрібно виключаємо з продукту і залишаємо лише самий сік. Все інше індивідуально, під кожен проект.
- Зручність для розробника. Можливість спростити процес розробки і побудови веб інтерфейсу - головна мета для багатьох розробників.
- Зручність для користувача. Бібліотека повинна включати в себе модулі для роботи з перекладами а також інтерактивну справку по функціоналу інтерфейсу.
- Відсутність залежностей. Залежності рано чи пізно ломаються. Мета автора - підібрати такі інструменти які пройшли випробування щонайменше кількома десятиліттями і досі залишаються актуальними.
- Кодогенерація. Важливо автоматизувати рутинні задачі і зробити кілька макросів які дозволять генерувати шаблони коду, і це не обмежується лише веб сторінкою.

## Що використовується?
- git shell. Проста оболонка з набором UNIX утіліт, більшість з яких POSIX сумісна. Це основний інструмент для збірки, все інше опціонально.
- python. Пайтон не є обов'язковим, використовується лише для тестів серверу і вебсокетів.
- HTML. Відкривається любим браузером :)

## Як користуватися?
- make.sh ім'я_файлу_для_збірки (наприклад: ~./make.sh examples/demo.js)
- Зібраний файл HTML буде знаходитися в директорії build

Проект на початковому етапі розвитку, тому по мірі оновлення будуть добавлятися приклади.
Також майте на увазі що на даному етапі структура проекту буде часто та сильно змінюватися.
