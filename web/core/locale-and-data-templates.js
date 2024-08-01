let defaultLanguage = 'en';
let globalLanguage = 'en';

// Шаблони даних (тут можуть бути дані локалізації, або службові дані)
// Мовні літерали мають префікс LC_
let dataTemplates = {
	LC_LANGUAGE: {
		en: "english",
		uk: "українська"
	},

	DB_COUNTER: 0, // Службовий літерал, що не потребує перекладу
	TEST_LC: { // Для перевірки локалізації і заміни літералів
		en: "^{LC_LANGUAGE} is my native language (Counter: {LC_COUNTER})",
		uk: "Моя рідна мова це ^{LC_LANGUAGE}! (Counter: {LC_COUNTER})"
	}
};

// Об'єднує список локалізації зі списком dataTemplates
function dataTemplatesAppendLocale(newEntries, locale) {
    for (let key in newEntries) {
        if (dataTemplates[key] === undefined) {
            dataTemplates[key] = {};
        }
        
        if (typeof dataTemplates[key] === 'object' && !Array.isArray(dataTemplates[key])) {
            dataTemplates[key][locale] = newEntries[key];
        } else {
            console.warn(`Key "${key}" is a service literal and cannot have locales added.`);
        }
    }
}

// Функція для форматування тексту
function formatDataTemplate(template, values) {
	//Якщо наш шаблон це об'єкт, то він вважається мовним літералом. */
	if (typeof template === 'object')
		// Якщо переклад для globalLanguage відсутній, використовуємо defaultLanguage
		template = template[globalLanguage] ?
			template[globalLanguage] : template[defaultLanguage];

	//Якщо це не строка, а число чи щось ще - повернути як є.
	if (typeof template !== 'string')
		return template;
    
	return template.replace(/(\^)?\{(\w+)\}/g, (_, specialChar, key) => {
		let value = formatDataTemplate(values[key], values);
		if (specialChar === '^') {
			// Перетворюємо першу букву на заголовкову
			value = value.charAt(0).toUpperCase() + value.slice(1);
		}
		return value;
	});
}

// Оновити шаблон даних елементу (якщо дані або мова інтерфейсу міняються)
function updateDataTemplate(element) {
        const template = element.getAttribute('data-template');

	if (template)
		element.textContent = formatDataTemplate(template, dataTemplates);

	return element;
}

// Після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
	const elements = document.querySelectorAll('[data-template]');

	elements.forEach(element => {
		updateDataTemplate(element);
	});
});
