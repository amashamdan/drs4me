$("#drawer-button").click(function() {
	$("#drawer").toggleClass("open");
});

$(".section, #drawer-close-button").click(function() {
	$("#drawer").removeClass("open");
})