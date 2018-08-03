

var TiIdentity = require('ti.identity');

var win = Ti.UI.createWindow({
	backgroundColor : 'white'
});

var stateBtn = Ti.UI.createButton({
	height : 100,
	width : 100,
	//top : 30,
	borderRadius : 50,
	backgroundColor : '#ecf0f1'
});

var btn = Ti.UI.createButton({
	title: 'AUTHENTICATE',
	backgroundColor : '#20B2AA',
	width : 120,
	bottom : 30
});

$.index.add(stateBtn);
$.index.add(btn);
$.index.open();

btn.addEventListener('click', function(){

	if (!TiIdentity.isSupported()) {
		alert("Touch ID is not supported on this device!");
		return;
	}
	
	TiIdentity.authenticate({
		reason: 'We need your fingerprint to continue.',
		callback: function(e) {
			if (!e.success) {
				stateBtn.backgroundColor = '#ecf0f1';
				//$.fingerAlert.text = 'ID sent';
				
			} else {
				stateBtn.backgroundColor = '#e67e22';
				setTimeout(function(){
					stateBtn.backgroundColor = '#2ecc71';	
					$.fingerAlert.text = 'ID sent';
				},3000);
				_log(e, 'info');
			}
		}
	});

});


function _log (obj, txt, type){
   if(ENV_PROD) return;
   try{
        Ti.API[type || 'info']((txt || '')  + ' > ' + JSON.stringify(obj));
    }catch(e){
        Ti.API.info(e);
    }
};