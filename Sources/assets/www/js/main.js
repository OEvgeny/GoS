	var myMap;
	var lat;
	var lon;
	var errState;
	var myPlacemark;
	var timeoutVal = 10 * 1000 * 1000;

		
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
		getGLPosition,
		displayError,
		{enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0});
	} 
	else {
		errState = true;
	}
	

	function getGLPosition(position) {
		lat = position.coords.latitude;
		lon = position.coords.longitude;
	}

	function getYMPosition() {
		lat = ymaps.geolocation.latitude;
		lon = ymaps.geolocation.longitude;
	}

	function displayPosition(position) {
		alert("Широта: " + position.coords.latitude + ", Долгота: " + position.coords.longitude);
	}

	function displayError(error) {
		var errors = {
			1: 'Нет прав доступа',
			2: 'Местоположение невозможно определить',
			3: 'Таймаут соединения'
		};
		//alert("Ошибка: " + errors[error.code]);
	}

	function catchError(error) {
		errState = true;
		displayError(error);
	}

	function initYM() {
		//if (errState == true) ugly trick  for debug:)
		//getYMPosition();

		//alert(lat+' '+lon);

		myMap = new ymaps.Map ("map-obj", {
			center: [lat, lon],
			zoom: 16,
		});

		myPlacemark = new ymaps.Placemark([lat, lon], {
			balloonContentHeader: "Вы здесь",
			balloonContent: ymaps.geolocation.city,
			balloonContentFooter: ymaps.geolocation.region
			});
			myMap.geoObjects.add(myPlacemark);
		}

		
		function resizeMap() {
			document.getElementById('map-obj').style.height = ($.mobile.getScreenHeight() - 101)+'px';
			myMap.container.fitToViewport();
		}

		/*
		function maxHeight() {
		var h = $('div[data-role="header"]').outerHeight(true);
		var f = $('div[data-role="footer"]').outerHeight(true);
		var w = $(window).height();
		var c = $('div[data-role="content"]');
		var c_h = c.height();
		var c_oh = c.outerHeight(true);
		var c_new = w - h - f - c_oh + c_h;
		var total = h + f + c_oh;
		if (c_h<c.get(0).scrollHeight) {
	c.height(c.get(0).scrollHeight);
		}
		else {
	c.height(c_new);
		}
		}
	*/

		/*var clickOk = true;
	$('#wai').on('vclick', function () {
		if (clickOk === true) {
	clickOk = false;
	setTimeout(function() {
		clickOk = true;
	}, 400);
	alert('It works!');
	//myMap.geoObjects.remove(myPlacemark)
	myPlacemark.geometry.setCoordinates([lat, lon]);
	myMap.setCenter([lat, lon], 16);
	//myPlacemark
		}
		return false;
	});*/

	function updatePosition() {
		myPlacemark.geometry.setCoordinates([lat, lon]);
		myMap.setCenter([lat, lon], 16);
	}

	function addPages(data) {
		$.mobile.pageContainer.append( data );
		$.mobile.hidePageLoadingMsg();
		//$.mobile.changePage( $( '#home' ) );
	}

	$(document).delegate('.ui-map-page', 'pageshow resize orientationchange', function () {
			resizeMap();
	});

	function toggileByDestination() {
		if ($('.bydist').hasClass('ui-btn-active'))
			 $('.bydist').removeClass('ui-btn-active');
		 else
			$('.bydist').addClass('ui-btn-active');
	}