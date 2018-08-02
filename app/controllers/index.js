

var TiIdentity = require('ti.identity');

var win = Ti.UI.createWindow();

var btn = Ti.UI.createButton({
	title: 'authenticate'
});

win.add(btn);
win.open();

btn.addEventListener('click', function(){

	if (!TiIdentity.isSupported()) {
		alert("Touch ID is not supported on this device!");
		return;
	}
	
	TiIdentity.authenticate({
		reason: 'We need your fingerprint to continue.',
		callback: function(e) {
			if (!e.success) {
				alert('Message: ' + e.error);
				
			} else {
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