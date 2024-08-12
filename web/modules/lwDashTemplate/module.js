let lwDashTemplateDefaultLanguage = 'en';
let lwDashTemplateLanguage = 'en';

//Шаблони даних (тут можуть бути дані локалізації, або службові дані)
let lwDashTemplates = {};

//Функція для форматування тексту
function lwDashFormatTemplate(template, values) {
	//Якщо наш шаблон це об'єкт, то він вважається мовним літералом. */
	if (typeof template === 'object')
		// Якщо переклад для lwDashTemplateLanguage відсутній, використовуємо lwDashTemplateDefaultLanguage
		template = template[lwDashTemplateLanguage] ?
			template[lwDashTemplateLanguage] : template[lwDashTemplateDefaultLanguage];

	//Якщо це не строка, а число чи щось ще - повернути як є.
	if (typeof template !== 'string')
		return template;
    
	return template.replace(/(\^)?\{(\w+)\}/g, (_, specialChar, key) => {
		let value = lwDashFormatTemplate(values[key], values);
				
		if (specialChar === '^') {
			// Перетворюємо першу букву на заголовкову
			value = value.charAt(0).toUpperCase() + value.slice(1);
		}
		return value;
	});
}

//Додати до елементу новий шаблон та застосувати його
function lwDashTemplate(element, template) {
	element.textContent = lwDashFormatTemplate(template, lwDashTemplates);
	element.dataset.template = template;
}

function lwDashTemplateUpdate(element) {
	lwDashTemplate(element, element.dataset.template);
}

//Застосувати шаблони до всіх елементів з шаблонами повторно
function lwDashTemplateUpdateAll() {
	const elements = document.querySelectorAll('[data-template]');

	elements.forEach(element => { lwDashTemplateUpdate(element) });
}

// Після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
	lwDashTemplateUpdateAll();
});
