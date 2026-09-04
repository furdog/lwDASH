/**
 * Escapes special HTML characters in a string to prevent XSS attacks.
 * Converts &, <, >, ", and ' to their corresponding HTML entities.
 *
 * @param {string} text - The raw text to escape.
 * @returns {string} The HTML-safe string.
 */
function lc_escape(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;")
}

/**
 * Replaces placeholders in a template string with data properties.
 *
 * Supports two placeholder types:
 * - `{{{ key }}}`: Unescaped raw HTML injection.
 * - `{{ key }}`: Safe, HTML-escaped text injection via `lc_escape`.
 *
 * @param {string} tpl - The template string containing {{ key }} or {{{ key }}} placeholders.
 * @param {Object|Array} data - Map or array of values corresponding to placeholder keys.
 * @returns {string} The fully interpolated template string.
 */
const lc_parse_template = (tpl, data) => {
	// 1. {{{ key }}} - Do not escape HTML
	let result = tpl.replace(/\{\{\{\s*(\w+)\s*\}\}\}/g, (_, key) =>
		String(data[key] ?? ""),
	)

	// 2. {{ key }} - Always escapes HTML
	return result.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) =>
		lc_escape(String(data[key] ?? "")),
	)
}

/**
 * Attaches lc data attributes to a single DOM element.
 *
 * @param {HTMLElement} element - Target DOM element.
 * @param {string} key - Translation key matching data-lc.
 * @param {Array|Object} [args] - Arguments to store in data-lc_args.
 */
function lc_attach(element, key, args = null) {
	element.dataset.lc = key
	element.dataset.lc_args = JSON.stringify(args ?? {})
}

/**
 * Updates `data-lc_args` and immediately re-applies the template.
 *
 * @param {HTMLElement} element - Target DOM element.
 * @param {Array|Object} args - New arguments to update.
 * @param {Object} dict - Dictionary of key-value templates.
 */
function lc_update(element, args, dict) {
	element.dataset.lc_args = JSON.stringify(args)
	element.innerHTML = lc_parse_template(dict[element.dataset.lc], args)
}

/**
 * Searches the DOM for elements with `data-lc` and applies translations.
 * @param {Object} dict - Dictionary of key-value templates
 * @param {HTMLElement|Document} root - Target container (defaults to whole document)
 */
function lc_apply(dict, root = document) {
	const elements = root.querySelectorAll("[data-lc]")

	elements.forEach((element) => {
		lc_update(element, JSON.parse(element.dataset.lc_args), dict)
	})
}

/**
 * Helper to create an element and attach translation metadata in one step.
 *
 * @param {string} tag - HTML tag name (e.g. 'div', 'span').
 * @param {string} key - Translation key matching data-lc.
 * @param {Array|Object} [args] - Arguments to store in data-lc_args.
 * @returns {HTMLElement}
 */
function lc_create_element(tag, key, args = null) {
	const element = document.createElement(tag)
	lc_attach(element, key, args)

	return element
}
