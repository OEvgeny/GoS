	var myMap;
	var lat;
	var lon;
	var errState = false;
	var myPlacemark;
	var myRouter;
	var timeoutVal = 10 * 1000;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
		getGLPosition,
		catchError,
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

		if (typeof lat === "undefined" || typeof lon === "undefined") {
			getYMPosition();
		//	errState = true;
		}

                if (typeof lat === "undefined" || typeof lon === "undefined") {
			alert("Серис недоступен. Проверьте подключение к сети. Приложение будет закрыто.");
			message('No connection to yandex maps.');
			app.exit();
		}

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

		message('Error state: ' + errState);
	}

	function addSightToMap(id) {
		var s = $('#' + id);
		message("sightId: " + s);
		sightPlacemark = new ymaps.Placemark([s.attr("data-lat"), s.attr("data-lon")], {
			balloonContentHeader: s.find('.sight-name').html(),
			balloonContent: s.find('.sight-type').html(),
//			balloonContentFooter: '<a href="debug.html#' + id + '">Информация</a>'
		});
		message("sightLat: " + s.attr("data-lat"));
		myMap.geoObjects.add(sightPlacemark);
		return sightPlacemark;
	}

	function getSightPosition(id) {
		sp = addSightToMap(id);
		myMap.setCenter(sp.geometry.getCoordinates(), 16);
	}

	function getRoute(id) {
		//var sp = addSightToMap(id);
		updatePosition();
		var s = $('#' + id);
		myRouter = ymaps.route([[lat,lon], [s.attr("data-lat"), s.attr("data-lon")]], {
			mapStateAutoApply: true
		});

		myRouter.then(function(route) {
    		// Добавление маршрута на карту
			myMap.geoObjects.add(route);
    	});
	}

	function resizeMap() {
		$('#map-obj').css({
			'height' : ($.mobile.getScreenHeight() - 101)+'px'
		});
		myMap.container.fitToViewport();
	}

	function updatePosition() {
		myPlacemark.geometry.setCoordinates([lat, lon]);
		myMap.setCenter([lat, lon], 16);
	}

	function addPages(data) {
		$.mobile.pageContainer.append(data);
		$.mobile.hidePageLoadingMsg();

		$("#childcontainer").change(
			function() {
				myMap.setType($('#childcontainer').val());
		});

		$(".gallery").imageflip();
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
	

 var num = 10; //чтобы знать с какой записи вытаскивать данные
 function lol() {
      $.ajax({
        url: "action.php",
        type: "GET",
        data: {"num": num},
        dataType: "html",
        cache: false,
        complete: function(){
		$("#sightlist").listview('refresh');
        },
        success: function(response){
          if(response != 0){
            $("#sightlist").append(response);
            num = num + 10;
            if($('#the_end').length > 0) {
              $("#load").hide();
            }
          }
        }
      });
    }