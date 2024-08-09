@SECTION:style.css
.pane {
	background: #444a;
	margin: 1em;
	border-radius: 1em;
	box-shadow: rgb(0 0 0) 0.1em 0.1em 0.5em;
}

.pane-title {
	background: linear-gradient(90deg, #000, transparent);
	padding: 0.25em;
	font-size: 1.25em;
	text-align: center;
}

.pane-content {
	padding: 0.5em;
}

@SECTION:script.js
function lwDashPane(parent, title)
{
	// Create a container div for the dashboard panel
	const dashPane = document.createElement('div');
	dashPane.className = 'pane';

	// Create the title element
	const titleElement = document.createElement('div');
	titleElement.className = 'pane-title';
	titleElement.textContent = title;

	// Create a content div inside the dashboard panel
	const contentContainer = document.createElement('div');
	contentContainer.className = 'pane-content';

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
