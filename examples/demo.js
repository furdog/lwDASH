//Нам не обовязково включати секцію @ SECTION:script.js,
//вона йде по замовчуванню в початку кожного файлу lwDASH
@SECTION:script.js
console.log("HELLO LWDASH");

/* Підключаємо модуль, який описує бекграунд з українським прапором і черепом
   Контент модулю вставляється частинами у різні секції
   В даному випадку в це місце вставиться все що описано
   в секції @SECTION:script.js модуля uk_skull_bg, звісно якщо вона не порожня.
*/
@MODULE:uk_skull_bg

//Вставляємо в цю секцію все що містить файл web/core/hello.js
//Майте на увазі що всі шляхи до файлів відносно корневого каталогу!
@INCLUDE:web/core/hello.js

//Оголошуємо нову секцію STYLE
@SECTION:style.css
.my_style { /* Цей стиль буде використовуватися в help dialog */
	background: darkblue;
}

/*Оголошуємо нову секцію HTML
  Використовуємо попередньо описаний стиль а також макрос @ ENV:GIT_REPO_VERSION
  Який заміняє себе на поточну версію директорії GIT. */
@SECTION:body.html
<div class="hint dialog my_style" id="version-help" data-template="Тут зазначена версія: @ENV:GIT_REPO_VERSION"></div>
<!-- Тут коментар HTML (Не JS!!! Будьте уважні з секціями) -->

@SECTION:script.js
/* Одинакових секцій може бути багато. Вони просто продовжать попередні.
   Ви також можете створювати кастомні секції і вставляти їх за допомогою директиви
   @ INCLUDE:build/section/назва_секції
   По замовчуванню в код вставляються лише три секції (body.html, style.css, script.js) */

@MODULE:lwDashCore /* Підключаємо основні модулі lwDash з основними віджетами. */

let hello = lwDashPane(document.body, "Hello world!");

rrose = lwDashText(hello.content, "Roses are red");
bviol = lwDashText(hello.content, "Violets are blue,");

lwDashText(hello.content, "Sugar is sweet");
lwDashText(hello.content, "And so are you. ");

rrose.self.style = "color: tomato;"
bviol.self.style  = "color: cornflowerblue;"
