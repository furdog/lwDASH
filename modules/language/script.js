class lang_tool {
	/** Unique identifier to link object with DOM globally */
	_uuid = crypto.randomUUID().replace(/-/g, "_")
	
	/** @private default language variant */
	_default_lang   = 'en';

	/** @private preferred language variant (by user) */
	_preferred_lang = 'en';

	/** @private
	    Language literals (can contain localization or service data) */
	_literals = {};
}

/**
 * Adds literals to global literals list. For example:
 * this.add_literal("LC_UNDERSTOOD", {en:"understood", uk:"зрозуміло"});
 *
 * @param {string} name - literal global name
 * @param {object} objects - Language objects in format:
 * 	{langA:"translation", langB:"translation", ...}
 */
lang_tool.prototype.add_literal = function (name, objects)
{
	this._literals[name] = objects;
}

/**
 * Sets default language (fallback && initial)
 */
lang_tool.prototype.set_default_lang = function (lang)
{
	this._default_lang = lang;
}

/**
 * Sets preferred (by user) language
 */
lang_tool.prototype.set_preferred_lang = function (lang)
{
	this._lc_preferred_lang = lang;
}

/**
 * Escapes special HTML characters in a string to prevent XSS attacks.
 * Converts &, <, >, ", and ' to their corresponding HTML entities.
 *
 * @param {string} text - The raw text to escape.
 * @returns {string} The HTML-safe string.
 */
lang_tool.prototype.escape = function (text) {
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
lang_tool.prototype.parse_template = function (tpl, data) {
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
lang_tool.prototype.attach = function (element, key, args = null) {
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
lang_tool.prototype.update = function (element, args) {
	element.dataset.lc_args = JSON.stringify(args)
	element.innerHTML = this.parse_template(this._literals[element.dataset.lc], args)
}

/**
 * Searches the DOM for elements with `data-lc` and applies translations.
 * @param {Object} dict - Dictionary of key-value templates
 * @param {HTMLElement|Document} root - Target container (defaults to whole document)
 */
lang_tool.prototype.apply = function (root = document) {
	const elements = root.querySelectorAll("[data-lc]")

	elements.forEach((element) => {
		this.update(element, JSON.parse(element.dataset.lc_args), this._literals)
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
lang_tool.prototype.create_element = function (tag, key, args = null) {
	const element = document.createElement(tag)
	this.attach(element, key, args)

	return element
}
