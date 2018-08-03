var Alloy = require("alloy");
var _ = Alloy._;

//Alloy.Globals.apiUrl = ENV_PROD ?  "http://45.55.210.179/api/" :  "http://104.131.115.135/api/" ;  

var DownloadManager = require('downloadManager');
var url = 'https://randomuser.me/api';
//var userInfosToken = require('accountManager').getUserDetails().token;
//var accountManager = require('accountManager');
//exmple appel ws

function downloadData (requestType, urlString, parameters, manageError, success, ignoreError, exeternalApi) {
    return DownloadManager.downloadData(requestType, urlString, parameters, function(requestResponse ){
            //_.isFunction(handelError) && handelError();
            _.isFunction(manageError) && manageError(requestResponse);
           // require('alertManager').handleError(requestResponse , checkForErrors);
       }, success, ignoreError, exeternalApi);
        
     function checkForErrors(){
     	return DownloadManager.downloadData(requestType, urlString, parameters, function(requestResponse){
            //_.isFunction(handelError) && handelError();
            stringify(urlString, 'checkForErrors');
            _.isFunction(manageError) && manageError(requestResponse);
            //require('alertManager').handleError(requestResponse);
        }, success, ignoreError, exeternalApi);
     }
}

/*function downloadData(requestType, urlString, parameters, manageError, success, ignoreError, exeternalApi) {
	function checkInformation(returnCodes, handelError) {
		var errorCode = _.isArray(returnCodes) ? returnCodes[0] : -1;
		if (require('requiredInformation').isRequiredUpdate(errorCode)) {
			require('requiredInformation').addInformationsRequired(errorCode, function confirmed() {
				_.isFunction(parameters.onUpdateInformation) && parameters.onUpdateInformation();
				downloadData(requestType, urlString, parameters, manageError, success, ignoreError, exeternalApi);
			}, function abort(hideAlert) {
				_.isFunction(manageError) && manageError(returnCodes);
				//hideAlert != true && _.isFunction(handelError) && handelError();
			});
		} else {
			_.isFunction(manageError) && manageError(returnCodes);
			_.isFunction(handelError) && handelError();
		}
	}
	return DownloadManager.downloadData(requestType, urlString, parameters, checkInformation , success, ignoreError, exeternalApi);
}*/

/*
<ActivityIndicator id="activityIndicator"/>
function getDetailsCategories() {
	$.activityIndicator.show();
	$.container.setTouchEnabled(false);
	require("dataHandlers").adDetails(args.detailId, function success(response) {
		subCats = response.ad_details;
		createViews(subCats);

		stringify(response, 'adDetails');
		$.activityIndicator.hide();
		$.container.setTouchEnabled(true);
	}, function error(e) {
		showAlert(e.return_messages[0]);
		$.activityIndicator.hide();
		$.container.setTouchEnabled(true);
	});
}
*/

exports.test = function( success, error) {
	var requestUrl = url;
	downloadData("GET", requestUrl, null, error, success);
};
exports.login = function(params, success, error) {
	var requestUrl = url + "user/login";
	downloadData("POST", requestUrl, params, error, success);
};

exports.signup = function(params, success, error) {
	var requestUrl = url + 'user/signup';
	downloadData("POST", requestUrl, params, error, success);
};

//user/login/google?token=ya29.
exports.googleLogin = function(token, success, error) {
	var requestUrl = url + 'user/login/google?token='+token;
	downloadData("GET", requestUrl, {}, error, success);
};
//user/login/facebook?token=ya29.
exports.facebookLogin = function(token, success, error) {
	var requestUrl = url + 'user/login/facebook?token='+token;
	downloadData("GET", requestUrl, {}, error, success);
};

exports.logout = function(success, error) {
	var requestUrl = url + 'user/logout';
	downloadData("GET", requestUrl, {}, error, success);
};

//api/user/request_reset_password?email=prenom.nom@gmail.com
exports.resetPass = function(email, success, error) {
	var requestUrl = url + 'user/request_reset_password?email='+email;
	downloadData("GET", requestUrl, {}, error, success);
};

exports.deleteAccount = function( success, error) {
	var requestUrl = url + 'user/profile/delete';
	downloadData("POST", requestUrl, {}, error, success);
};

exports.editProfile = function(params, success, error) {
	var requestUrl = url + 'user/profile/edit';
	downloadData("POST", requestUrl, params, error, success);
};

exports.changAvatar = function(params, success, error) {
	var requestUrl = url + 'user/profile/avatar/edit';
	downloadData("POST", requestUrl, params, error, success);
};

exports.deleteAvatar = function(success, error) {
	var requestUrl = url + 'user/profile/avatar/delete';
	downloadData("GET", requestUrl, {}, error, success);
};

exports.forgetPassword = function(_email, success, error) {
	var requestUrl = url + 'user/request_reset_password?email=' + _email;
	downloadData("GET", requestUrl, {}, error, success);
};

exports.getCategories = function(isService, success, error) {
	var requestUrl = url + 'category?for_service=' + isService ;
	downloadData("GET", requestUrl, {}, error, success);
};

exports.addNewNumber = function(phoneNumber, success, error) {
	var requestUrl = url + 'user/phone_number/add?phone_number='+ phoneNumber;
	downloadData("GET", requestUrl, {}, error, success);
};

exports.getAnnonceDetails = function(detailId, success, error) {
	var requestUrl = url + 'annonce/'+ detailId;
	downloadData("GET", requestUrl, {}, error, success);
};

exports.adDetails = function(detailId, success, error) {
	var requestUrl = url + 'annonce_detail?sub_category_id='+ detailId;
	downloadData("GET", requestUrl, {}, error, success);
};

//{{rootDomain_EKROULI}}/api/annonce_detail/add?name=abcs&sub_category_id=1
exports.addNewDetail = function(params, success, error) {
	var requestUrl = url + 'annonce_detail/add?name='+ params.text +'&sub_category_id='+ params.sub_category_id;
	downloadData("GET", requestUrl, {}, error, success);
};

exports.createService = function(params, success, error) {
	var requestUrl = url + "user/annonce/add";
	downloadData("POST", requestUrl, params, error, success);
};

//user/annonce/2/invisible
exports.adStatus = function(params, success, error) {
	var visibility = (params.isVisible) ? 'visible' : 'invisible';
	var requestUrl = url + "user/annonce/"+ params.id +"/"+ visibility ;
	delete params.id; 
	downloadData("GET", requestUrl, {}, error, success);
};

//user/annonce/2/edit
exports.editAd = function(params, success, error) {
	var requestUrl = url + "user/annonce/"+ params.id +"/edit";
	delete params.id; 
	downloadData("POST", requestUrl, params, error, success);
};

exports.addPicture = function(params, success, error) {
	var requestUrl = url + "user/annonce/picture/add";
	downloadData("POST", requestUrl, params, error, success);
};

exports.getAds = function(params, success, error) {
	var requestUrl = url + "annonce?";
	downloadData("GET", requestUrl, params, error, success);
};

exports.contactUs = function(params, success, error) {
	var requestUrl = url + "contact_us?";
	downloadData("POST", requestUrl, params, error, success);
};

exports.terms_of_use = function(success, error) {
	var requestUrl = url + "terms_of_use";
	downloadData("GET", requestUrl, {}, error, success);
};

exports.getMyAds = function(params, success, error) {
	var requestUrl = url + "user/annonce?";
	downloadData("GET", requestUrl, params, error, success);
};

exports.getAdDetail = function(adId, success, error) {
	var requestUrl = url + "user/annonce/"+ adId;
	downloadData("GET", requestUrl, null , error, success);
};

//{{rootDomain_EKROULI}}/api/user/ad/delete?ads[]=2&ads[]=5&ads[]=1
exports.deleteMyAds = function(adID, success, error) {
	var requestUrl = url + "user/annonce/delete?ads[]="+adID;
	downloadData("GET", requestUrl, null , error, success);
};

//api/user/phone_number/2/delete
exports.deleteNewNumber = function(phoneNumber, success, error) {
	var requestUrl = url + 'user/phone_number/'+ phoneNumber + '/delete';
	downloadData("GET", requestUrl, {}, error, success);
};

//api/useruser/notification
exports.getNotifs = function(success, error) {
	var requestUrl = url + 'user/notification' ;
	downloadData("GET", requestUrl, {}, error, success);
};

//user/notification/1/see
exports.seeNotif = function(id, success, error) {
	var requestUrl = url + 'user/notification/'+id+'/see' ;
	downloadData("GET", requestUrl, {}, error, success);
};

///api/annonce/23/rate?rating=4
exports.rateAd = function(params, success, error) {
	var requestUrl = url + 'annonce/'+params.id+'/rate?rating='+params.note ;
	downloadData("GET", requestUrl, {}, error, success);
};

///api/annonce/23/rate?rating=4
exports.getReportReason = function( success, error) {
	var requestUrl = url + 'report_reason';
	downloadData("GET", requestUrl, {}, error, success);
};

exports.reportAd = function(params, success, error) {
	var requestUrl = url + 'annonce/'+ params.id +'/report?report_reason_id='+ params.reasonId;
	downloadData("GET", requestUrl, {}, error, success);
};

//api/global_parameters
exports.globals = function(success, error) {
	var requestUrl = url + "global_parameters";
	downloadData("GET", requestUrl, {}, error, success);
};

//api/survey/1
exports.getSurvey = function(_id , success, error) {
	var requestUrl = url + "survey/"+ _id;
	downloadData("GET", requestUrl, {}, error, success);
};
//api/survey/1
exports.ignoreSurvey = function(_id , success, error) {
	var requestUrl = url + "survey/"+_id+"/ignore";
	downloadData("GET", requestUrl, {}, error, success);
};

//api/survey/1
exports.sendSurvey = function(_id, params , success, error) {
	var requestUrl = url + "survey/"+_id+"/respond";
	downloadData("POST", requestUrl, params , error, success);
};
//api/help?mobile
exports.help = function(success, error) {
	var requestUrl = url + "help?mobile"; // TODO change to website url
	downloadData("GET", requestUrl, {} , error, success);
};

/*
 * 
 * exports.logout = function(success, error) {
	var requestUrl = url + 'user/logout';
	downloadData("GET", requestUrl, null, error, success);
};

exports.profileModify = function(params, success, error) {
	var requestUrl = url + 'user/profile/edit';
	downloadData("POST", requestUrl, params, error, success);
};


exports.changePassword = function(params, success, error) {
	var requestUrl = url + "user/profile/change_password";
	downloadData("POST", requestUrl, params, error, success);
};


exports.resetPassword = function(params, success, error) {
	var requestUrl = url + 'user/password/forgot?email='+params.email;
	downloadData("GET", requestUrl, null, error, success);
};


exports.getCities = function(success, error) {
	var requestUrl = url + "city";
	downloadData("GET", requestUrl, {} , error, success);
};



exports.getAnimators = function(params, success, error) {
	var requestUrl = url + "animator?";
	downloadData("GET", requestUrl, params , error, success);
};

exports.getCourses = function(params, success, error) {
	var requestUrl = url + "course?";
	downloadData("GET", requestUrl, params , error, success);
};

exports.getComments = function(params, success, error) {
	stringify(params, 'params getComments datahandlers');
	var requestUrl = url + "animator/"+ params.id+"/comments?";
	delete params.id;
	downloadData("GET", requestUrl, params , error, success);
};


exports.animatorsDetails = function(params, success, error) {
	var requestUrl = url + "animator/"+params.id;
	downloadData("GET", requestUrl, {} , error, success);
};
exports.classDetails = function(params, success, error) {
	var requestUrl = url + "course/"+params.id;
	downloadData("GET", requestUrl, {} , error, success);
};

exports.createCourseReservation = function(params, success, error) {
	var requestUrl = url + 'course/'+ params.id +'/reservation/create?count='+ params.count;
	if(params.remark){
		requestUrl += "&remark="+ params.remark;
	}
	delete params.id;
	//delete params.count;
	downloadData("GET", requestUrl, null, error, success);
};

exports.createAnimatorReservation = function(params, success, error) {
	var requestUrl = url + 'animator/'+ params.id +'/reservation/create?';
	delete params.id;
	downloadData("GET", requestUrl, params, error, success);
};



exports.getReservations = function(params, success, error) {
	var requestUrl = url + "reservation";
	downloadData("GET", requestUrl, {} , error, success);
};

exports.cancelReservation = function(params, success, error) {
	var requestUrl = url + "reservation/"+params.id+"/cancel";
	downloadData("GET", requestUrl, {} , error, success);
};

exports.rateReservation = function(params, success, error) {
	var requestUrl = url + "reservation/"+ params.id+"/rate?";
	delete params.id ;
	downloadData("GET", requestUrl, params , error, success);
};

exports.payReservation = function(params, success, error) {
	var requestUrl = url + "reservation/"+ params.id+"/pay?";
	delete params.id ;
	downloadData("GET", requestUrl, params , error, success);
};

exports.smsConfimation = function(params, success, error) {
	var requestUrl = url + "sms_confirmation?";
	downloadData("GET", requestUrl, params , error, success);
};

exports.about_app = function(success, error) {
	var requestUrl = url + "about_app";
	downloadData("GET", requestUrl, {} , error, success);
};

exports.terms_conditions = function(success, error) {
	var requestUrl = url + "terms_conditions";
	downloadData("GET", requestUrl, {} , error, success);
};

exports.wire_transfer = function(success, error) {
	var requestUrl = url + "wire_transfer";
	downloadData("GET", requestUrl, {} , error, success);
};

*/




