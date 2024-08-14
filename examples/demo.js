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

//Тестуємо шаблони lwDash
lwDashTemplateDefaultLanguage = "en";
lwDashTemplateLanguage = "uk";

//Перевіряємо нашу рідну мову в шаблоні
lwDashTemplates["LC_TEST"] = {en:"test", uk:"тест"};
text = lwDashText(document.body);
lwDashTemplate(text.self, "^{LC_TEST}");

//Перевіряємо мову по замовчуванню (якщо поточна мова не існує в перекладі)
lwDashTemplates["LC_TEST_DEFLANG"] = {en:"test deflang"};
text = lwDashText(document.body);
lwDashTemplate(text.self, "^{LC_TEST_DEFLANG}");

//Перевіряємо форматування
text = lwDashText(document.body);
lwDashTemplate(text.self, "Тут шаблон який починається з малої букви: {LC_TEST}.")
text = lwDashText(document.body);
lwDashTemplate(text.self, "^{LC_TEST_DEFLANG} - починається з великої.");

lwDashTemplateUpdateAll();

@MODULE:uPlot
@SECTION:script.js
let plot = lwDashPane(document.body, "uPlot TEST!");

let xs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
let vals = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10];

let data = [
	xs,
	xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)])
];

const opts = {
	title: 'X or Y (adaptive + omni)',
	x: true, y: true, uni: 50,
	width: 600,
	height: 400,
	scales: {
		x: {
			time: false,
		},
	},
	series: [
		{},
		{
			fill: "rgba(0, 255, 0, .2)",
			stroke: "white"
		}
	],
};

let u = new uPlot(opts, data, plot.content);
