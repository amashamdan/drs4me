$("#drawer-button").click(function() {
	$("#drawer").toggleClass("open");
});

$(".section, #drawer-close-button").click(function() {
	$("#drawer").removeClass("open");
})

$(".cancel-button").click(function(e) {
	e.preventDefault();
	window.location.replace("/dashboard");
})

$("#change-password-form").submit(function(e) {
	e.preventDefault();
	$(".error-message").remove();
	/* To track if an error is found or not. */
	var errorFound = false;
	
	/* Check that password 1 has at least 8 characters. */
	if ($("#password1").val().length < 8) {
		$("#change-password-form").prepend("<p class='error-message'>Password is not 8 or more characters.</p>");
		errorFound = true;
	/* Make sure that the password has a capital letter. */
	}else if (!$("#password1").val().match(/[A-Z]/g)) {
		$("#change-password-form").prepend("<p class='error-message'>Password doesn't contain a capital letter.</p>");
		errorFound = true;
	/* Make sure the password has a number */
	}else if (!$("#password1").val().match(/[0-9]/g)) {
		$("#change-password-form").prepend("<p class='error-message'>Password doesn't contain a number.</p>");
		errorFound = true;
	/* Make sure the password has a special character. */
	}else if (!$("#password1").val().match(/[!@#$%^&*]/g)) {
		$("#change-password-form").prepend("<p class='error-message'>Password doesn't contain a special character.</p>");
		errorFound = true;
	/* Make sure both passwords match. */
	} else if ($("#password1").val() !== $("#password2").val()) {
		$("#change-password-form").prepend("<p class='error-message'>Passwords do not match.</p>");
		errorFound = true;
	}

	/* If errors are found, the form is submitted. */
	if (!errorFound) {
		e.target.submit();
	}
});

$("#edit-info-form").submit(function(e) {
	e.preventDefault();
	$(".error-message").remove();
	/* To track if an error is found or not. */
	var errorFound = false;
	/* Ensure that the phone number is numeric. */
	if (!$.isNumeric($("#phone").val())) {
		/* If the phone is invalid, an error message is prepended and errorFound set to true. */
		$("#edit-info-form").prepend("<p class='error-message'>Please enter a valid phone number.</p>");
		errorFound = true;
	}

	if (!isValidEmailAddress($("#email").val())) {
		$("#edit-info-form").prepend("<p class='error-message'>Please enter a valid email.</p>");
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