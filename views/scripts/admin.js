var specialties = ["Heart", "A6fal", "Tawleed", "Bones"];

for (var specialty in specialties) {
	$("select").append("<option class='specialty-option' value='" + specialties[specialty] + "'>" + specialties[specialty] + "</option>");
}

$("#drawer-button").click(function() {
	$("#drawer").toggleClass("open");
});

$(".section, #drawer-close-button").click(function() {
	$("#drawer").removeClass("open");
})

$("#add-admin-form, #add-physician-form").submit(function(e) {
	e.preventDefault();
	$(this).children(".error-message").remove();
	/* To track if an error is found or not. */
	var errorFound = false;

	if ($(this).attr("id") == "add-physician-form")	{
		if (!$.isNumeric($(this).children("#zip").val()) || ($(this).children("#zip").val() > 99999) || ($(this).children("#zip").val() < 10000)) {
			/* If the zip code is invalid, an error message is prepended and errorFound set to true. */
			$(this).prepend("<p class='error-message'>Please enter a valid zip code.</p>");
			errorFound = true;
		}
	}

	/* Ensure that the phone number is numeric. */
	if (!$.isNumeric($(this).children("#phone").val())) {
		/* If the phone is invalid, an error message is prepended and errorFound set to true. */
		$(this).prepend("<p class='error-message'>Please enter a valid phone number.</p>");
		errorFound = true;
	}
	/* Check that password 1 has at least 8 characters. */
	if ($(this).children("#password1").val().length < 8) {
		$(this).prepend("<p class='error-message'>Password is not 8 or more characters.</p>");
		errorFound = true;
	/* Make sure that the password has a capital letter. */
	}else if (!$(this).children("#password1").val().match(/[A-Z]/g)) {
		$(this).prepend("<p class='error-message'>Password doesn't contain a capital letter.</p>");
		errorFound = true;
	/* Make sure the password has a number */
	}else if (!$(this).children("#password1").val().match(/[0-9]/g)) {
		$(this).prepend("<p class='error-message'>Password doesn't contain a number.</p>");
		errorFound = true;
	/* Make sure the password has a special character. */
	}else if (!$(this).children("#password1").val().match(/[!@#$%^&*]/g)) {
		$(this).prepend("<p class='error-message'>Password doesn't contain a special character.</p>");
		errorFound = true;
	/* Make sure both passwords match. */
	} else if ($(this).children("#password1").val() !== $(this).children("#password2").val()) {
		$(this).prepend("<p class='error-message'>Passwords do not match.</p>");
		errorFound = true;
	}

	if (!isValidEmailAddress($(this).children("#email").val())) {
		$(this).prepend("<p class='error-message'>Please enter a valid email.</p>");
		errorFound = true;
	}
	/* If errors are found, the form is submitted. */
	if (!errorFound) {
		e.target.submit();
	}

});

function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	return pattern.test(emailAddress);
}