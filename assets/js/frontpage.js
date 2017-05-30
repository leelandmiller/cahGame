

var titlearea = $('#titlearea');
var cards = $('#maincardarea');
var loginarea = $('#loginarea');
var buttons = $('button');
var username = $('#user').hide();
var email = $('#email').hide();
var password1 = $('#firstpw').hide();
var password2 = $('#secondpw').hide();
var back = $('#back').hide();
var error = $('.errormsg').hide();
var signupSubmit = $('#susubmit').hide();
var signinSubmit = $('#sisubmit').hide();

$("#sibtn").click(function() {
	$(email).show();
	$(password1).show();
	$('#subtn').hide();
	$('#back').show();
	$('#submit').show();
	$('#sibtn').hide();
	$('#susubmit').show();
	$('#sisubmit').hide();
	$('#user').hide();
});

$("#subtn").click(function() {
	$(email).show();
	$(password1).show();
	$(password2).show();
	$('#sibtn').hide();
	$('#back').show();
	$('#sisubmit').show();
	$('#susubmit').hide();
	$('#subtn').hide();
	$('#user').show();
});

$("#back").click(function() {
	$(email).hide();
	$(password1).hide();
	$(password2).hide();
	$('#sibtn').show();
	$('#subtn').show();
	$('#back').hide();
	$('#sisubmit').hide();
	$('#susubmit').hide();
	$('#user').hide();
});

function error(errorMessage){
		$('.errormsg').text(errorMessage);
};

function checkingFields(){
	if ('#email' === '' || '#firstpw' === '' || '#secondpw' === ''){
	}
	else{
		console.log('nothing');
	}
};
