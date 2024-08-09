@SECTION:style.css
.hint-button {
	border: none;
	border-radius: 50%;
	cursor: pointer;
	
	font-size: 1em;
}

.hint-button:hover {
	background-color: #0056b3;
}

.hint-icon {
	fill: white;
	width: 24px;
	height: 24px;
}

.hint {
	display: none !important;
}

.hint-glow {
	box-shadow: 0 0 1em rgba(32, 255, 0, 0.8);
	transition: box-shadow 0.5s ease-in-out;
}

@SECTION:script.js
let hintMode = false;
let originalHandlers = [];
let hintItems = [];

document.getElementById('hint-button').addEventListener('click', toggleHintMode);

function removeHintItems()
{
	if (hintItems.length === 0 || originalHandlers.length === 0)
		return;
	
	hintItems.forEach((item, index) => {
		item.onclick = originalHandlers[index].handler;
		item.style.pointerEvents = "";
		item.style.position = "";
		item.style.zIndex = "";
		item.classList.remove('hint-glow');
	});
	
	originalHandlers = [];
	hintItems = [];
}

function enterHintMode()
{
	hintMode = true;
	pushOverlay();
	hintItems.forEach(item => {
		/* Ми не показуємо hint для елементів попереднього оверлею. */
		if (item.style.zIndex >= overlayDepth - 1) {
			originalHandlers.push({ element: item, handler: item.onclick });
			item.onclick = showHintDialog;
			item.style.pointerEvents = 'auto';
			item.style.position = "relative";
			item.style.zIndex = overlayDepth;
			item.classList.add('hint-glow');
		}
	});
}

function exitHintMode()
{
	hintMode = false;
	popOverlay();
	removeHintItems();
}

function toggleHintMode() {
	hintItems = document.querySelectorAll('[data-hint]');

	if (!hintMode)
		enterHintMode();
	else
		exitHintMode();
}

function showHintDialog(event) {
	const dialogId = event.currentTarget.getAttribute('data-hint');
	const hintDialog = document.getElementById(dialogId);

	exitHintMode();

	// Перевірка чи dialogId існує
	if (!hintDialog)
		return;

	// Показати dialog
	hintDialog.classList.remove('hint');
	pushOverlay(hintDialog);

	//Завершити показ елементів hint
	let hintMode = false;
	removeHintItems();

	// Перевірка наявності кнопки виходу
	if (!hintDialog.querySelector('.close-button')) {
		// Створення кнопки виходу
		const closeButton = document.createElement('button');
		closeButton.textContent = 'Close';
		closeButton.classList.add('close-button');
		closeButton.addEventListener('click', () => {
			hintDialog.classList.add('hint');
			popOverlay();
		});

		// Додавання кнопки до dialog
		hintDialog.appendChild(closeButton);
	}
}
