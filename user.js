defaultLanguage = 'uk'
globalLanguage = 'uk';

dataTemplatesAppendLocale({
	LC_WELCOME:	"ласкаво просимо до DetecBOX",
	LC_FREQUENCIES:	"частоти",
	LC_AUTO:	"авто",
	LC_CALIBRATION:	"калібрування",
	LC_DROP:	"скинути",
	LC_SENSITIVITY:	"поріг спрацювання (dBm)",
	LC_FORALL:	"для всіх",
	LC_LOG:		"лог (dBm)",
	
	LC_AUTOCALIB_HELP: "Дана кнопка автоматично калібрує значення таким чином що " +
			   "вони налаштовуються в децибелах(dB) відносно рівня фонового шуму. " +
			   "За замовчуванням приймачі отримують RSSI в децибел/мілліватт(dBm) " +
			   "Якщо рівень шуму наприклад -100dBm, то нове калібровочне значення буде рівне " +
			   "+100dBm, а загальний RSSI буде рівний 0dBm"
}, 'uk');

const LED_COUNT = 6;

function createInputFields(container, name, count, readOnly = false) {
        // Функція для обробки змін полів вводу
	function handleInputChange(event) {
		const baseId = event.target.baseId;
		const fieldCount = event.target.fieldCount;
		const values = [];

		for (let i = 0; i < fieldCount; i++)
			values.push(_(`${baseId}${i}`).value);

		// Формуємо повідомлення у форматі ["type", [значення]]
		const message = [baseId, values];
		sendMessage(message[0], message[1]);
	}

	// Отримання контейнера для полів вводу
	container = _(container);

	// Створення і додавання полів вводу в контейнер
	for (let i = 0; i < count; i++) {
		const input = document.createElement('input');
		input.type = 'number';
		input.className = 'freq-field';
		input.id = `${name}${i}`;
		input.placeholder = `${name} ${i}`;
		input.addEventListener('change', handleInputChange);
		input.readOnly = readOnly; // Закриває поле для редагування
		
		//custom properties
		input.baseId = name;
		input.fieldCount = count;
		
		container.appendChild(input);
	}
}

createInputFields("frequency-fields", "freq", LED_COUNT);
createInputFields("calibration-fields", "calib", LED_COUNT);
createInputFields("sensitivity-fields", "sens", LED_COUNT);
createInputFields("sens-for-all-field", "forall", 1);
createInputFields("log-fields", "log", LED_COUNT, true);

function handleAutoCalibration()
{
	console.log("autocalib");
	
	for (let i = 0; i < LED_COUNT; i++)			
		_(`calib${i}`).value = parseInt(_(`calib${i}`).value) +
				      -parseInt(_(`log${i}`).value);
	
	//Емулюємо подію зміни поля
	 _("calib0").dispatchEvent(new Event('change', { bubbles: true }));
}

function handleDropCalibration()
{
	for (let i = 0; i < LED_COUNT; i++)
		_(`calib${i}`).value = 0;
	
	 _("calib0").dispatchEvent(new Event('change', { bubbles: true }));
}

_("auto-calib").addEventListener('click', handleAutoCalibration);
_("drop-calib").addEventListener('click', handleDropCalibration);

//dataTemplates["DB_LOG"] = "";

function receiveMessage(type, message) {
	switch (type) {
	case "freq":
		for (let i = 0; i < 6; i++)
			_(`freq${i}`).value = message[i];
		break;

	case "calib":
		for (let i = 0; i < 6; i++)
			_(`calib${i}`).value = message[i];
		break;

	case "sens":
		for (let i = 0; i < 6; i++)
			_(`sens${i}`).value = message[i];
		break;

	case "log":
		//dataTemplates["DB_LOG"] = String(message);
		//updateDataTemplate(_(type));
		for (let i = 0; i < 6; i++)
			_(`log${i}`).value = message[i];
		break;
	}
}

//function sendMessage(type, message) {
//}
