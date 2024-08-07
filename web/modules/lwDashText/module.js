function lwDashText(parent, title)
{
	// Create a container div for the dashboard panel
	const text = document.createElement('div');
	text.className = 'text';
	text.textContent = title;

	// Append the panel to the body or a specific container
	parent.appendChild(text);

	return {
		self: text
	};
}
