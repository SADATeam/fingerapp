// fore when remote notification are clicked and the app is closed, Alloy is not required properly, we force it here GLOBALLY.
var Alloy = require("alloy");
var _ = Alloy._;
var handleError = require("alertManager").handleError;

/**
 * This file is responsible for handelling every interaction with the web service.
 */

//Download data for the required url with the specefied parameters.
//suppressAlert is a flag which will be used if set to true to supress alerting the user. useful for operations working in the background.
// contentType and suppressAlert are optionals.

var ignoreWsRequest = false;
exports.ignoreWsRequest = function(flag) {
	ignoreWsRequest = flag;
};
exports.downloadData = function(requestType, urlString, parameters, manageError, success, ignoreError, exeternalApi) {
	if (ignoreWsRequest) {
		_.isFunction(manageError) && manageError();
		return;
	}
	var client = Ti.Network.createHTTPClient();
	client.validatesSecureCertificate = false;
	client.onload = function(succesRequest) {
		try {

			var json = JSON.parse(this.responseText);
			stringify(json, "json");
			if (json.success) {
				
				_.isFunction(success) && success(json);

			} else if (json.status == 'OK') {
				_.isFunction(success) && success(json);
			} else {
				Ti.API.error("Failed Download url is: " + urlString + " params= " + JSON.stringify(parameters));
				_.isFunction(manageError) && manageError(json);
				//handleError(json.error_code, ignoreError);
			}

		} catch(e) {
			Ti.API.error("catch Download url is: " + urlString + " params= " + JSON.stringify(parameters));
			Ti.API.error("catch Download error " + JSON.stringify(e));
			_.isFunction(manageError) && manageError();
		}
	};

	client.onerror = function(errorRequest) {
		try {
			if (errorRequest.code == -1001 || !Ti.Network.online) {//time out
				handleError(0, ignoreError);
			} else {
				handleError(1, ignoreError);
			}
			_.isFunction(manageError) && manageError();
			Ti.API.error('--------------');
			Ti.API.error("request error  : " + errorRequest.code);
			Ti.API.error(errorRequest);
			Ti.API.error('--------------');
		} catch(e) {
			Ti.API.error('catch http on erreur ' + e);
		}
	};

	var addExtraRequest = "";
	/*if(exeternalApi != true){
	 var userId = require('accountManager').getUserId() ;
	 //source = 0 >>> 0 = app mobile
	 var addExtraRequest = "?source_req=1";
	 if(userId){
	 addExtraRequest += '&credt=' + userId;
	 }else if (parameters.forceUserId){
	 addExtraRequest += '&credt=' + parameters.forceUserId;
	 }
	 delete parameters.forceUserId;
	 }*/
	try {

		//requestType = GET, POST, PUT, DELETE
		if (requestType == "GET") {
			//urlString += params;
			var params = '';
			_.each(parameters, function(value, key) {
				params += key + '=' + value + '&';
			});
			if (params[params.length - 1] == "&") {
				params = params.slice(0, -1);
			}
			urlString += params + addExtraRequest;
			Ti.API.info("Download url is: " + urlString);
			client.open(requestType, urlString);
			feedAnalyticsAttributes(client);
			client.send();
		} else {
			urlString += addExtraRequest;
			Ti.API.info("Download url is: " + urlString + " params= " + JSON.stringify(parameters));
			client.open(requestType, urlString);
			feedAnalyticsAttributes(client);
			client.send(parameters);
		}

		return function() {
			ignoreError = true;
			Ti.API.info('°°°°°°°°°°°°°°°°°°°°°  WS aborted °°°°°°°°°°°°°°°°°°°°°°°');
			client.abort();
		};
	} catch(e) {

		_.isFunction(manageError) && manageError();
		Ti.API.info('erreur clien http send catch');
		Ti.API.info(e);
		Ti.API.info('');
		handleError(11, ignoreError);

	}
};

exports.downloadAddress = function(requestType, urlString, parameters, manageError, success, ignoreError, exeternalApi) {
	if (ignoreWsRequest) {
		_.isFunction(manageError) && manageError();
		return;
	}
	var client = Ti.Network.createHTTPClient();
	client.validatesSecureCertificate = false;
	client.onload = function(succesRequest) {
		try {
			var json = JSON.parse(this.responseText);
			if (exeternalApi) {
				success(json);
			}
			//download app setings
		} catch(e) {
			Ti.API.error("catch Download url is: " + urlString + " params= " + JSON.stringify(parameters));
			Ti.API.error("catch Download error " + JSON.stringify(e));
			handleError(500, ignoreError);
			_.isFunction(manageError) && manageError();
		}
	};

	client.onerror = function(errorRequest) {
		try {
			if (errorRequest.code == -1001 || !Ti.Network.online) {//time out
				handleError(0, ignoreError);
			} else {
				handleError(1, ignoreError);
			}
			_.isFunction(manageError) && manageError();
			Ti.API.error('--------------');
			Ti.API.error("request error  : " + errorRequest.code);
			Ti.API.error(errorRequest);
			Ti.API.error('--------------');
		} catch(e) {
			Ti.API.error('catch http on erreur ' + e);
		}
	};

	var addExtraRequest = "";
	if (exeternalApi != true) {
		var userId = require('accountManager').getUserId();
		//source = 0 >>> 0 = app mobile
		var addExtraRequest = "?source_req=1";
		if (userId) {
			addExtraRequest += '&credt=' + userId;
		} else if (parameters.forceUserId) {
			addExtraRequest += '&credt=' + parameters.forceUserId;
		}
		delete parameters.forceUserId;
	}
	try {
		//requestType = GET, POST, PUT, DELETE
		if (requestType == "GET") {
			//urlString += params;
			var params = '';
			_.each(parameters, function(value) {
				params += '/' + value;
			});
			urlString += params + addExtraRequest;
			Ti.API.info("Download url is: " + urlString);
			client.open(requestType, urlString);
			feedAnalyticsAttributes(client);
			client.send();
		} else {
			urlString += addExtraRequest;
			Ti.API.info("Download url is: " + urlString + " params= " + JSON.stringify(parameters));
			client.open(requestType, urlString);
			feedAnalyticsAttributes(client);
			client.send(parameters);
		}
		return function() {
			ignoreError = true;
			Ti.API.info('°°°°°°°°°°°°°°°°°°°°°  WS aborted °°°°°°°°°°°°°°°°°°°°°°°');
			client.abort();
		};
	} catch(e) {

		_.isFunction(manageError) && manageError();
		Ti.API.info('erreur clien http send catch');
		Ti.API.info(e);
		Ti.API.info('');
		handleError(11, ignoreError);

	}
};

function feedAnalyticsAttributes(client) {
	// →
	/*
	//client.setRequestHeader("Content-Type", "application/json");
	//client.setRequestHeader("auth-token", "5c60592bc60d5093b6b6f01ed348f5dc");
	stringify(Ti.App.Properties.getString('sessionId'), "Ti.App.Properties.setString('sessionId', userDetails.auth_token)");
	client.setRequestHeader("auth-token", Ti.App.Properties.getString('sessionId'));
	client.setRequestHeader("app-version", Ti.App.version);
	client.setRequestHeader("os-version", Ti.Platform.version);
	client.setRequestHeader("os-name", OS_IOS ? "ios" : "android");
	//client.setRequestHeader("device-width",Math.min(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight));
	//client.setRequestHeader("device-height",Math.max(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight));
	//client.setRequestHeader("logical-density",Ti.Platform.displayCaps.logicalDensityFactor);
	client.setRequestHeader("environment", Ti.App.deployType);
	client.setRequestHeader("language", Alloy.Globals.isFrench)*/
}
