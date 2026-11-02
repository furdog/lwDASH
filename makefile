BUILD_DIR = build
TARGET = $(BUILD_DIR)/index.html
ENV_AWK = awk/ENV.awk

FILES := $(shell find modules -type f ! -name "*example.html")
JS_FILES := $(filter %.js, $(FILES))
CSS_FILES := $(filter %.css, $(FILES))
HTML_FILES := $(filter %.html, $(FILES))

.PHONY: all clean

all: $(TARGET)

$(BUILD_DIR)/bundle.css: $(CSS_FILES) | $(BUILD_DIR)
	{ echo '<style>'; cat $^; echo '</style>'; } > $@

$(BUILD_DIR)/bundle.js: $(JS_FILES) | $(BUILD_DIR)
	{ echo '<script>'; cat $^; echo '</script>'; } > $@

$(BUILD_DIR)/bundle.html: $(HTML_FILES) | $(BUILD_DIR)
	cat $^ > $@

$(TARGET): $(BUILD_DIR)/bundle.css $(BUILD_DIR)/bundle.js $(BUILD_DIR)/bundle.html
	cat $^ | awk -f $(ENV_AWK) > $@

$(BUILD_DIR):
	mkdir -p $@

clean:
	rm -rf $(BUILD_DIR)

format:
	npx prettier --config prettier.json --write modules/
