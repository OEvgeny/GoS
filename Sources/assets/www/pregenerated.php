<html>
<heda>
</head>
<body>
<div data-role="page" id="newpage">
	<div data-role="header" data-position="fixed">
		<a href="#" data-rel="back" data-iconpos="notext" data-icon="arrow-l"></a><h3>Pregenerated Page</h3>
	</div><!-- /header -->
	<div data-role="content" style="padding:3%; padding-top:inherit;">
			<h3><?php echo date("H:i:s"); ?></h3>
			<a data-role="button" data-icon="info" data-corners="true" data-shadow="true" data-iconshadow="true" data-iconpos="right" href="#map">Back to the map</a>
			</div><!-- /content -->
	<div data-role="footer" data-position="fixed">
		<div data-role="navbar">
		<ul>
			<li><a data-icon="home" class="ui-btn-active ui-state-persist" href="#home">Меню</a></li>
			<li><a data-icon="grid" href="#map">Карта</a></li>
			<li><a data-icon="bars" href="#sights">Достопримечательности</a></li>
		</ul>
		</div><!-- /navbar -->
	</div><!-- /footer -->
</div><!-- /page -->
</body>
</html>