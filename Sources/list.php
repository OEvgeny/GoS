<html>
  <head>
  </head>

  <body>
    <div data-role="page" id="pregenerated" >
      <div data-role="header" data-position="fixed">
        <a href="#" data-rel="back" data-iconpos="notext" data-icon="arrow-l"></a>
        <h3>Достопримечательности</h3>
  <a href="#" data-role="button" class="bydist"
	   onclick="toggileByDestination();">@</a>
      </div><!-- /header -->
      <div data-role="content">
        <div data-role="navbar">
          <ul>
            <li><a data-icon="bars" href="#sights">По типу</a></li>
            <li><a data-icon="bars" class="ui-btn-active
					   ui-state-persist"href="#">Все</a></li>
	  </ul>
        </div><!-- /navbar -->
	<ul data-role="listview" style="padding-top:7%">

<?php
/* Link required files. */
require_once "/home/mitrofan/private_html/config.php";

/* Get section ID */
$ID = (isset($_GET['section'])) ? $_GET['section'] : 0;	// 0 - all, etc from tblSection

/* Connect and Choose */
mysql_connect(DB_HOST, DB_USER, DB_PASS) or die (mysql_error ());
mysql_select_db(DB_NAME) or die(mysql_error());

/* SELECT Query */
if($ID != 0)
  $sght = "SELECT intSightId, txtNameSection, txtNameSight
           FROM tblSight, tblSection
           WHERE tblSight.intSectionId = $ID AND tblSight.intSectionId = tblSection.intSectionId";
else
  $sght = "SELECT intSightId, txtNameSection, txtNameSight 
           FROM tblSight, tblSection 
           WHERE tblSight.intSectionId = tblSection.intSectionId";

$sg = mysql_query($sght);

/* Print result */
while ($row = mysql_fetch_assoc($sg)) {    
  echo '<li><a href="'.
       'http://kappa.cs.karelia.ru/~pilinovi/gis/lol1.php'.
       '?sight='.$row['intSightId'].
       '#samplesight"><img src="res/images/thumb/'.
       str_pad($row['intSightId'], 4, "0", STR_PAD_LEFT).
       '.jpg" alt="'.
       $row['txtNameSight'].
       '"/>';  
  echo '<h2>'.$row['txtNameSight'].'</h2>';
  echo '<p>'.$row['txtNameSection'].'</p></a></li>';
}
?>
      </div><!-- /content -->
      <div data-role="footer" data-position="fixed">
        <div data-role="navbar">
          <ul>
            <li><a data-icon="home" class="ui-btn-active ui-state-persist"
	     href="#home">Меню</a></li>
            <li><a data-icon="grid" href="#map">Карта</a></li>
            <li><a data-icon="bars" href="#sights">Достопримечательности</a></li>
          </ul>
        </div><!-- /navbar -->
      </div><!-- /footer -->
    </div><!-- /page -->
  </body>
</html>
