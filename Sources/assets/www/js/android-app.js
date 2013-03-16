var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},

	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
		
	onDeviceReady: function () {
		document.addEventListener('offline', this.onDeviceOffline, false);
		document.addEventListener('online', this.onDeviceOnline, false);

		$.ajax({
			type: 'POST',
			url: 'menu.html',
			cache: true,
			success: function(data) {
				addPages(data);
				ymaps.ready(initYM);
				$.mobile.changePage( $( '#home' ) );
			}
		});$.mobile.showPageLoadingMsg();

		$(document).delegate('.ui-map-page', 'pageshow resize orientationchange', function () {
			resizeMap();
		});

		app.showElement('deviceready');

		$.mobile.defaultPageTransition = 'none';
		$.mobile.defaultDialogTransition = 'none';
		$.mobile.buttonMarkup.hoverDelay = 0;
	},

	onDeviceOnline: function () {
		app.showElement('deviceonline');
	},

	onDeviceOffline: function () {
		app.showElement('deviceoffline');
	},

	showElement: function (id) {
		document.getElementById(id).style.display = 'block';
	},

	exit: function () {
			navigator.app.exitApp();
	}
	
};
	