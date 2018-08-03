var Alloy = require("alloy");
var _ = Alloy._;

exports.showAlertIncompletForm = function(message) {
	showSimpleAlert(L("incompletForm"));
};

var lastAlert = {
	time : 0,
	code : 0
};
var messageCode = {
	1 : 'Success',
	2 : 'Erreur inconnue',
	3 : 'Manque de paramètres',
	4 : 'Login Failed. Either pseudo or password is incorrect',
	5 : 'Confirmation du mot de passe ne correspond pas',
	6 : 'Adresse mail déjà utilisée',
	7 : 'Pseudo déjà utilisé',
	8 : 'Sorry but your email address is blocked by website admin',
	9 : 'Sorry but your mobile number is blocked by website admin',
	10 : 'Sorry but your mobile number is already exist in our records',
	11 : "L'email n'existe pas",
	100 : L('a_valid_token_is_Required'),
	110 : L('a_valid_token_is_Required'),
	111 : L('a_valid_token_is_Required'),
	112 : L('a_valid_token_is_Required'),
	113 : L('a_valid_token_is_Required'),
	114 : L('a_valid_token_is_Required'),
	115 : L('a_valid_token_is_Required'),
	116 : L('a_valid_token_is_Required'),
	117 : L('phone_is_numeric'),
	118 : L('phone_is_numeric'),
	159 : L('email_not_exist'),
	155 : L('code_promo_error'),
	156 : L('code_promo_error'),
	157 : L('code_promo_error')
};

exports.handleError = function(errorsResponse, checkForErrors) {
	if (!errorsResponse)
		return;
	stringify(errorsResponse, "handleError");
	var errors = errorsResponse.return_codes;
	for (var key in errors) {
		if (key == "422" || key == "423") {
			// function(path, params, isModal, _isAds) {
			require('accountManager').userDisconnect();
			require('windowManager').open('connexion/principal', {
				checkForErrors : checkForErrors
			}, true);
		}
	}
	/*var time = new Date().getTime();
	//TODO enlever le code
	var messageError = messageCode[code] ? messageCode[code] : L('serverError');
	if (!ignoreError && (time - lastAlert.time > 1000 )) {
	showSimpleAlert(messageError);
	lastAlert = {
	time : time,
	code : code
	};
	} else {
	Ti.API.info('alert ignored : ' + messageError);
	}*/

	//if()
};

function showSimpleAlert(text, title) {
	/*if (OS_ANDROID) {
	 var toast = Titanium.UI.createNotification({
	 duration : Ti.UI.NOTIFICATION_DURATION_LONG,
	 message : text
	 });
	 toast.show();
	 } else */
	{
		//IOS
		Ti.UI.createAlertDialog({
			message : text,
			ok : 'OK',
			title : title || "",
			persistent : true
		}).show();
	}
}

exports.showSimpleAlert = showSimpleAlert;

exports.showYesNoAlert = function(message, clickYes, clickNo, btnNameYes, btnNameNo, _title) {

	var alert = Titanium.UI.createAlertDialog({
		//title : title all alert's titles are suppressed in this project.
		title : _title || '',
		message : message,
		buttonNames : [btnNameNo || "Non", btnNameYes || "Oui"],
		persistent : true,
		cancelled : false
		//cancel : -1
	});

	alert.addEventListener('click', function(e) {
		switch(e.index) {
		case 0 :
			_.isFunction(clickNo) && clickNo();
			break;
		case 1 :
			_.isFunction(clickYes) && clickYes();
			break;
		default :
		}
	});
	alert.show();
};

exports.showDeletAlert = function(_title, message, clickYes, clickNo, btnNameYes, btnNameNo) {

	var alert = Titanium.UI.createAlertDialog({
		//title : title all alert's titles are suppressed in this project.
		title : _title || '',
		message : message,
		buttonNames : [btnNameNo || "Non", btnNameYes || "Oui"],
		persistent : true,
		cancelled : true,
		cancel : 0
	});

	alert.addEventListener('click', function(e) {
		switch(e.index) {
		case 0 :
			_.isFunction(clickNo) && clickNo();
			break;
		case 1 :
			_.isFunction(clickYes) && clickYes();
			break;
		default :
		}
	});
	alert.show();
};
/*{
 "success": 0,
 "return_inputs": {
 "email": {
 "416": "email ne correspend à aucun compte"
 },
 "password": {
 "414": "password doit etre plus de 5 chars et moins de 256 chars"
 }
 }
 }*/
//return_codes":

exports.showFormAlert = function(_obj) {
	if(!_obj) return;
	var return_inputs = _obj.return_inputs || _obj.return_codes;
	var errors = [];
	for (var key in return_inputs) {
		if (return_inputs.hasOwnProperty(key)) {
			var input = return_inputs[key];
			if(typeof input == 'string' ){
				errors.push(input);
			}else{
				for (var key2 in input) {
					if (input.hasOwnProperty(key2)) {
						errors.push(input[key2]);
					}
				}
			}
		}
	}

	errors[0] && showSimpleAlert(errors[0]);
};
