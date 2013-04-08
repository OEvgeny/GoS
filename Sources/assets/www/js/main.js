	var myMap;
	var lat;
	var lon;
	var errState = false;
	var myPlacemark;
	var timeoutVal = 10 * 1000 * 1000;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
		getGLPosition,
		catchError/*,//todo: findout what is timeout )
		{enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0}*/);
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
		message("Ошибка: " + errors[error.code]);
	}

	function catchError(error) {
		errState = true;
		displayError(error);
	}

	function initYM() {
		if (errState === true)
			getYMPosition();

		message('lat:' +lat+'<br />'+'lon:'+lon);

		myMap = new ymaps.Map ("map-obj", {
			center: [lat, lon],
			zoom: 16,
		});

		// Создадим пользовательский макет ползунка масштаба.
        ZoomLayout = ymaps.templateLayoutFactory.createClass('<div data-role="controlgroup">' +
  				'<a id="zoom-in" href="#" data-role="button" data-iconpos="notext" data-icon="plus" data-theme="a"></a>' +
				'<a id="zoom-out" href="#" data-role="button" data-iconpos="notext" data-icon="minus" data-theme="a"></a>' +
            "</div>", {

            // Переопределяем методы макета, чтобы выполнять дополнительные действия
            // при построении и очистке макета.
            build: function () {
                // Вызываем родительский метод build.
                ZoomLayout.superclass.build.call(this);

                // Привязываем функции-обработчики к контексту и сохраняем ссылки
                // на них, чтобы потом отписаться от событий.
                this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                // Начинаем слушать клики на кнопках макета.
                $('#zoom-in').bind('click', this.zoomInCallback);
                $('#zoom-out').bind('click', this.zoomOutCallback);
            },

            clear: function () {
                // Снимаем обработчики кликов.
                $('#zoom-in').unbind('click', this.zoomInCallback);
                $('#zoom-out').unbind('click', this.zoomOutCallback);

                // Вызываем родительский метод clear.
                ZoomLayout.superclass.clear.call(this);
            },

            zoomIn: function () {
                var map = this.getData().control.getMap();
                // Генерируем событие, в ответ на которое
                // элемент управления изменит коэффициент масштабирования карты.
                this.events.fire('zoomchange', {
                    oldZoom: map.getZoom(),
                    newZoom: map.getZoom() + 1
                });
            },

            zoomOut: function () {
                var map = this.getData().control.getMap();
                this.events.fire('zoomchange', {
                    oldZoom: map.getZoom(),
                    newZoom: map.getZoom() - 1
                });
            }
        }),

        zoomControl = new ymaps.control.SmallZoomControl({
            layout: ZoomLayout
        });

	    myMap.controls.add(zoomControl, {left: 5, top: 5});

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

		$("#childcontainer").change(
			function() {
				myMap.setType($('#childcontainer').val());
			});
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

	//debug
	function message(errText) {		
		$('<p>'+errText+'</p>').appendTo('#debuglog');
	}