var app = {
	// Application Constructor
	initialize: function() {
		app.onDeviceReady();
	},
	
	onDeviceReady: function () {
		
		
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
		getGLPosition,
		displayError,
		{enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0});
	} 
	else {
		errState = true;
	}
	

		$.ajax({
			type: 'POST',
			url: 'menu.html',
			cache: true,
			success: function(data) {
				addPages(data);
				ymaps.ready(initYM);
				$.mobile.changePage($('#home'));
			}
		});
		//$.mobile.showPageLoadingMsg();

		//app.showElement('deviceready');
		
		$.mobile.defaultPageTransition = 'none';
		$.mobile.defaultDialogTransition = 'none';
		$.mobile.buttonMarkup.hoverDelay = 0;
	},

	showElement: function (id) {
		document.getElementById(id).style.display = 'block';
	},

	exit: function () {
		//Not possible on PC
	}
};
	