function lwDashPane(parent, title)
{
	// Create a container div for the dashboard panel
	const dashPane = document.createElement('div');
	dashPane.className = 'dash';

	// Create the title element
	const titleElement = document.createElement('div');
	titleElement.className = 'info';
	titleElement.textContent = title;

	// Create a content div inside the dashboard panel
	const contentContainer = document.createElement('div');
	contentContainer.className = 'content';

	// Append the title and content to the panel
	dashPane.appendChild(titleElement);
	dashPane.appendChild(contentContainer);

	// Append the panel to the body or a specific container
	parent.appendChild(dashPane);

	return {
		self:    dashPane,
		title:   titleElement,
		content: contentContainer
	};
}
