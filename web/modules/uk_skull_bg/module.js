@SECTION:style.css
.background {
	z-index: -1;
}

.flag {
	background: linear-gradient(to bottom, #0057b777 50%, #ffd70077 50%);
}

.skull {
	filter: opacity(50%);
	width: 80%;
}

.vignette {
	background: radial-gradient(ellipse at 100% 0%, #fff0 0%, #000c 100%, #000 0%);
}

@SECTION:body.html
<div id="background" class="background fullpage">
	<div class="background fullpage flag"></div>
	<div class="background centered skull">
		@INCLUDE:web/modules/uk_skull_bg/skull.svg
	</div>
	<div class="background fullpage vignette"></div>
</div>
