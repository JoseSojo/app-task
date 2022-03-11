'use strict'

jQuery(document).ready(function() {
	console.log('jQuery is Working');
	// $ #

	let submitSignup = [false, false, false, false];

	if($('#alert-msg')) {
		let dev = gsap.timeline();
		dev.from('.alert-msg', {
			scale: 0,
			opacity: 0,
			ease: 'ease'
		})
		dev.to('.alert-msg', {
			delay: 1.5,
			scale: 0,
			opacity: 0,
			ease: 'ease',
		})
	}

	let tl = gsap.timeline();
	tl.from('.card-task', {
    duration: 2,
		scale: 0,
		stagger: .4,
    opacity: 0,
		ease: 'ease',
  });
	tl.from('.title-card', {
		scale: 0,
		opacity: 0,
	});
	tl.to('.title-card', {
		duration: 1,
		color: '#0dfac0',
		ease: 'ease.out'
	})
	tl.from('.text-card', {
		duration: .5,
		opacity: 0,
		scale: 0,
		ease: 'ease'
	});
	tl.from('.btn-card', {
		duration: 1,
		opacity: 0,
		scale: 0,
		stagger: 0
	});

	let log = gsap.timeline();
	log.from('.title-nav', {
		delay: .3,
		duration: 1,
		opacity: 0,
		scale: 1.5
	})
	log.from('.item-nav', {
		duration: 2,
		scale: 2,
		stagger: 0.4,
		opacity: 0,
		ease: 'elastic.out(.8, .3)'
	})

	gsap.from('.smg-welcome', {
		duration: 1,
		opacity: 0,
		y: 90,
		scale: 0,
		ease: 'ease',
		stagger: 1,
	})

	gsap.from('.form', {
		duration: 1,
		opacity: 0,
		y: 50,
		scale: 0,
		ease: 'ease'
	})

	// Valid form singup
	/*
	 * Valid for avalite btn submit
	*/
	const validGsapSingup = ()=>{
		if(submitSignup[0] == true && submitSignup[1] == true && submitSignup[2] == true && submitSignup[3] == true){
			$('#btn-submit-signup').removeClass('disabled');
		} else{
			$('#btn-submit-signup').addClass('disabled');
		}
	}

	/*
	 * Function for valid length the input
	 * @param camp = input to validated
	 *
	 */
	const validInputLength = (camp, length, item) => {
		if(camp.val().length > length) {
			camp.removeClass('valid-danger');
			camp.addClass('valid-success');
			submitSignup[item] = true;
			validGsapSingup();
		} else {
			camp.removeClass('valid-success');
			camp.addClass('valid-danger');
			submitSignup[item] = false;
			validGsapSingup();
		}
	}

	/*
	 * Function for valid password is equal repeat-password
	 * @param camp = input to validated
	 *
	 */
	const validPassword = (password, camp, item) => {
		if(password.val() == camp.val()) {
			camp.removeClass('valid-danger');
			camp.addClass('valid-success');
			submitSignup[item] = true;
			console.log('password: ' + submitSignup)
			validGsapSingup();
		} else {
			camp.removeClass('valid-success');
			camp.addClass('valid-danger');
			submitSignup[item] = false;
			validGsapSingup();
		}
	}

	// fullname => valid => keyup => function
	if($('#fullname-singup')) {
		const fullname = $('#fullname-singup');
		fullname.keyup( (evt) => {
				validInputLength(fullname, 5, 0);
		})
	}
	// username => valid => keyup => function
	if($('#username-singup')) {
		const username = $('#username-singup');
		username.keyup( (evt) => {
			validInputLength(username, 6, 1);
		})
	}
	// password-singup => valid => keyup => function
	if($('#password-singup')) {
		const passwordSignup = $('#password-singup');
		const passwordRepeat = $('#repeat-password-singup');
		passwordSignup.keyup( (evt) => {
			validInputLength(passwordSignup, 7, 2);
			validPassword(passwordSignup, passwordRepeat, 3);
		})
	}
	// password-repear => valid => keyup => function
	if($('#repeat-password-singup')) {
		const passwordSignup = $('#password-singup');
		const passwordRepeat = $('#repeat-password-singup');
		passwordRepeat.keyup((evt)=>{
			validPassword(passwordSignup, passwordRepeat, 3);
		})
	}

	$.ajax({
		url: 'src/router/ajax.js',
		method: 'POST',
		success: async (response) => {
			await console.log(response)
		}
	})

});
