const selector = lw_dash_language_selector(footer.self, [
	{name: "Українська", short_name: "ua", flag: "&#127482;&#127462;"},
	{name: "English",    short_name: "en", flag: "&#127468;&#127463;"}],
	function (lang) { lw_dash_template_language = lang;
			  lw_dash_template_update_all(); console.log(lang); }
);

selector.self.style.marginLeft = "auto";

const c = lw_dash_container_h(document.body);

lw_dash_template_language = 'ua';

const hello = lw_dash_pane(c.self, "^{LC_HELLO}");
lw_dash_template_add_literal("LC_HELLO",
	{en:"Hello world!", ua:"Привіт світ!"});
lw_dash_template_register_element(hello.title);

lw_dash_template_add_literal("LC_ROSES",
	{en:"Roses are red", ua:"Троянди червоні"});

const rrose = lw_dash_text(hello.content, "^{LC_ROSES}");
lw_dash_template_register_element(rrose.self);

const bviol = lw_dash_text(hello.content, "Violets are blue,");

lw_dash_text(hello.content, "Sugar is sweet");
lw_dash_text(hello.content, "And so are you. ");

rrose.self.style = "color: tomato;"
bviol.self.style = "color: cornflowerblue;"


const hello2 = lw_dash_pane(c.self, "Hello, i am the real world!");

const rrose2 = lw_dash_text(hello2.content, "Roses are rotten");
const bviol2 = lw_dash_text(hello2.content, "Violets are glue,");

lw_dash_text(hello2.content, "Sugar is poison");
lw_dash_text(hello2.content, "So dead are you. ");

rrose2.self.style = "color: tomato;"
bviol2.self.style = "color: cornflowerblue;"


const overlay = lw_dash_overlay(document.body);
const dialog  = lw_dash_dialog(overlay.self, "Bye temporal dimension",
			       ["yes", "no", "okeh"]);

dialog.options.yes.style.color = "#0F0";
dialog.options.no.style.color = "#F00";
dialog.options.yes.onclick = function () {
		dialog.remove(); overlay.remove();
};

const rrose3 = lw_dash_text(dialog.content, "Roses are triangles");
const bviol3 = lw_dash_text(dialog.content, "Violets are holes,");

lw_dash_text(dialog.content, "Sugar is plasma");
lw_dash_text(dialog.content, "And so are you.\n ");

lw_dash_loader(dialog.content);

rrose3.self.style = "color: tomato;"
bviol3.self.style = "color: cornflowerblue;"

lw_dash_template_add_literal("LC_SUGARIS",
	{en:"sugar is the", ua:"цукор це"});
lw_dash_template_add_literal("LC_BEER",
	{en:"beer", ua:"пиво"});
for (i = 0; i < 99; i++) {
	const text = lw_dash_text(c.self, "^{LC_SUGARIS} " + i + 
				  " {LC_BEER}!");
	text.self.style.width = "100%";
	lw_dash_template_register_element(text.self);
}

/* Assigns a hint to a web element. 
 * Element becomes highlighted when page is on hint mode 
 * Click action on highlighted item is the second argument */
lw_dash_hint_create(bviol2.self, function() { 
		const overlay = lw_dash_overlay(document.body);
		const dial = lw_dash_dialog(overlay.self,
						"This is a glue!", ["okeh"]);
		dial.options.okeh.onclick = function () {
			overlay.remove();
			dial.remove();
		}

		/* Exits hint mode */
		hint_button.onclick();
	}
);
