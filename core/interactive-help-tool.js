let helpMode = false;
let originalHandlers = [];
let helpItems = [];

document.getElementById('help-button').addEventListener('click', toggleHelpMode);

function removeHelpItems()
{
	if (helpItems.length === 0 || originalHandlers.length === 0)
		return;
	
	helpItems.forEach((item, index) => {
		item.onclick = originalHandlers[index].handler;
		item.style.pointerEvents = "";
		item.style.position = "";
		item.style.zIndex = "";
		item.classList.remove('glow');
	});
	
	originalHandlers = [];
	helpItems = [];
}

function enterHelpMode()
{
	helpMode = true;
	pushOverlay();
	helpItems.forEach(item => {
		/* Ми не показуємо help для елементів попереднього оверлею. */
		if (item.style.zIndex >= overlayDepth - 1) {
			originalHandlers.push({ element: item, handler: item.onclick });
			item.onclick = showHelpDialog;
			item.style.pointerEvents = 'auto';
			item.style.position = "relative";
			item.style.zIndex = overlayDepth;
			item.classList.add('glow');
		}
	});
}

function exitHelpMode()
{
	helpMode = false;
	popOverlay();
	removeHelpItems();
}

function toggleHelpMode() {
	helpItems = document.querySelectorAll('[data-help]');

	if (!helpMode)
		enterHelpMode();
	else
		exitHelpMode();
}

function showHelpDialog(event) {
	const dialogId = event.currentTarget.getAttribute('data-help');
	const helpDialog = document.getElementById(dialogId);

	exitHelpMode();

	// Перевірка чи dialogId існує
	if (!helpDialog)
		return;

	// Показати dialog
	helpDialog.classList.remove('help');
	pushOverlay(helpDialog);

	//Завершити показ елементів help
	let helpMode = false;
	removeHelpItems();

	// Перевірка наявності кнопки виходу
	if (!helpDialog.querySelector('.close-button')) {
		// Створення кнопки виходу
		const closeButton = document.createElement('button');
		closeButton.textContent = 'Close';
		closeButton.classList.add('close-button');
		closeButton.addEventListener('click', () => {
			helpDialog.classList.add('help');
			popOverlay();
		});

		// Додавання кнопки до dialog
		helpDialog.appendChild(closeButton);
	}
}
