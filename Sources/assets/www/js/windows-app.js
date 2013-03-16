var app = {
	// Application Constructor
	initialize: function() {
		app.onDeviceReady();
	},
	
	onDeviceReady: function () {
		$.ajax({
			type: 'POST',
			url: 'menu.html',
			cache: true,
			success: function(data) {
				addPages(data);
				ymaps.ready(initYM);
				$.mobile.changePage( $( '#home' ) );
			}
		});
		//$.mobile.showPageLoadingMsg();

		$(document).delegate('.ui-map-page', 'pageshow resize orientationchange', function () {
			resizeMap();
		});

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
	