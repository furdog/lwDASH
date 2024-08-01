let overlayDepth = 0;

function pushOverlay(element) {
	overlayDepth++;

	const overlay = document.getElementById('dark-overlay');
	const footer = document.querySelector('.footer');

	overlay.style.zIndex = overlayDepth;
	overlay.classList.remove('hidden');

	if (element) element.style.zIndex = overlayDepth;
	footer.style.zIndex = overlayDepth;
}

function popOverlay()
{
	const overlay = document.getElementById('dark-overlay');
	const footer = document.querySelector('.footer');

	if (overlayDepth > 0) {
		overlayDepth--;
		if (overlayDepth == 0) overlay.classList.add('hidden');
	}
		
	overlay.style.zIndex = overlayDepth;
	footer.style.zIndex = overlayDepth;
}
