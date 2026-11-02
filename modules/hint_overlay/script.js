class hint_tool {
	/** Unique identifier */
	constructor(uid) {
		this.uid = uid //crypto.randomUUID().replace(/-/g, "_")
	}

	/** Active overlay */
	overlay = undefined
}

/** Attaches hint to the element, click action may be specified */
hint_tool.prototype.register = function (element, click_action) {
	/* This elements now containts "hint dataset element" */
	element.dataset["hint_" + this.uid] = ""

	element["hint_action_" + this.uid] = click_action
}

/**
   Creates a cloned element which mimics original element
    appearence and position, but lies within another parent.
    The original element is hidden unless delete() method is called.
    The impostor element is not linked with the original, thus any
    updates won"t be transfered after one has been created.
 */
hint_tool.prototype.impostor_create = function (element, parent) {
	/* 1. Store original visibility style to restore later */
	const original_visibility = element.style.visibility

	/* 2. Clone the original element (deep clone to include children) */
	const cloned = element.cloneNode(true)

	/* 3. Hide the original element (preserving its space in the layout) */
	element.style.visibility = "hidden"

	/* 4. Remove any ID to prevent duplicate IDs in the DOM */
	cloned.removeAttribute("id")

	/* 5. Append the clone to the specified target parent */
	parent.appendChild(cloned)

	/* 6. Track original element position */
	const position_tracker = setInterval(function () {
		const rect = element.getBoundingClientRect()
		cloned.style.top = rect.top + "px"
		cloned.style.left = rect.left + "px"

		cloned.style.position = "fixed"
		cloned.style.width = `${rect.width}px`
		cloned.style.height = `${rect.height}px`
		cloned.style.margin = 0
	}, 0)

	/* 7. Return an object with the remove and a reference to the clone */
	return {
		element: cloned,

		remove: function () {
			cloned.parentNode.removeChild(cloned)

			/* Restore the original element"s visibility */
			element.style.visibility = original_visibility

			/* Stop position tracker */
			clearInterval(position_tracker)
		},
	}
}

/**
   Enters hint mode. Finds all element containing data-hint field,
    and makes them a hint target
 */
hint_tool.prototype.overlay_enable = function (parent) {
	if (this.overlay) {
		return /* Already enabled */
	}

	this.overlay = document.createElement("div")
	this.overlay.className = "hint_overlay_fade_in"
	parent.appendChild(this.overlay)

	/* Create impostor for each data-hint_ item */
	document.querySelectorAll("[data-hint_" + this.uid + "]").forEach(
		(item) => {
			item.impostor = this.impostor_create(item, parent)

			if (item.classList.contains("hint_custom")) {
				/* Do not set any actions or styles on custom hints
				 */
			} else {
				item.impostor.element.onclick =
					item["hint_action_" + this.uid]
				item.impostor.element.classList.add(
					"hint_target",
				)
			}

			/* Impostor should not have hint property
		       This prevents from false enumeration when removing hints
		     */
			delete item.impostor.element.dataset[
				"hint_" + this.uid
			]
		},
	)
}

/** Return everything to normal */
hint_tool.prototype.overlay_disable = function () {
	/* Remove all impostors */
	document.querySelectorAll("[data-hint_" + this.uid + "]").forEach(
		(item, index) => {
			item.impostor.remove()
			delete item.impostor
		},
	)

	this.overlay.classList.add("hint_overlay_fade_out")
	this.overlay.addEventListener("animationend", () => {
		if (this.overlay.parentNode) {
			this.overlay.parentNode.removeChild(this.overlay)
		}

		delete this.overlay
	})
}

/** Toggles hint on and off */
hint_tool.prototype.overlay_toggle = function (parent) {
	if (this.overlay == undefined) {
		this.overlay_enable(parent)
	} else {
		this.overlay_disable()
	}
}

/** Hint badge created at the top right screen corner */
hint_tool.prototype.badge_create = function hint_badge_create(parent) {
	const badge = document.createElement("div")

	/* Custom hints can not have any actions or hint_target style applied
	   by default */
	badge.classList.add("hint_custom", "hint_badge")

	/* "..." dialog badge */
	badge.innerHTML = "&#128172"
	parent.appendChild(badge)

	/* Badge becomes a valid hint target */
	badge.dataset["hint_" + this.uid] = ""

	badge.onclick = () => {
		this.overlay_enable(parent)

		/* "Overlay_enable" creates impostor for all hint targets,
			including badge element (see above) */
		badge.impostor.element.onclick = () => {
			this.overlay_disable()
		}
	}

	return badge
}
