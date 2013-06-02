<?php 

header("Access-Control-Allow-Origin: *");

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<html>
  <head>
    <title>Main</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
    <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
  </head>

  <body>
    <div data-role="page" id="list" >
    <script type="text/javascript">
        num = 10;
    </script>
      <div data-role="header" data-position="fixed">
        <a href="#" data-rel="back" data-iconpos="notext" data-icon="arrow-l"></a>
        <h3>Достопримечательности</h3>
      </div><!-- /header -->
      <div data-role="content">
        <div data-role="navbar" style="padding-bottom: 25px;">
          <ul>
            <li>

<?php

/* Link required files. */
require_once "WRITE_YOUR_OWN_PATH_TO/config.php";

/* Define SIZE of number of sights of list */
define("SIZE", 10);

/* Get section ID */
// 0 - all, etc from tblSection
$ID = (isset($_GET['section'])) ? $_GET['section'] : 0;

/* Connect and Choose */
mysql_connect(DB_HOST, DB_USER, DB_PASS) or die (mysql_error ());
mysql_select_db(DB_NAME) or die(mysql_error());

/* SELECT Query */
$sght = "SELECT intSightId, txtNameSection, txtNameSight 
         FROM tblSight, tblSection 
         WHERE tblSight.intSectionId = tblSection.intSectionId";

if($ID != 0) {
  $sght .= " AND tblSight.intSectionId = $ID";
  echo '<a data-icon="bars" class="ui-btn-active ui-state-persist" 
               href="#sights">По типу</a></li>
        <li><a data-icon="bars" href="list.php" >Все';
} else {
  echo '<a data-icon="bars" href="#sights">По типу</a></li>
        <li><a data-icon="bars" class="ui-btn-active ui-state-persist"
         href="list.php" >Все';
}

$tmp = SIZE + 1;
$sght .= ' LIMIT 0'.$tmp;

?>

            </a></li>
	  </ul>
        </div><!-- /navbar -->
	<ul id="sightlist" data-role="listview" style="padding-bottom: 20px;">

<?php

$sg = mysql_query($sght);

// counter of sights
$r_size = 0;

/* Print result */
while(($row = mysql_fetch_assoc($sg)) && ($r_size < SIZE)) {
  $r_size++;
  echo '<li><a href="creating_page.php'.
       '?sight='.
       $row['intSightId'].
       '"><img src="http://cs.karelia.ru/~pilinovi/gos/res/images/thumb/'.
       str_pad($row['intSightId'], 4, "0", STR_PAD_LEFT).
       '_0.jpg" alt="'.
       $row['txtNameSight'].
       '"/>';  
  echo '<h2>'.$row['txtNameSight'].'</h2>';
  echo '<p>'.$row['txtNameSection'].'</p></a></li>';
}

?>

        </ul>

<?php

/* Button to load content */
if($row)
  echo '<div id="load" data-role="button" data-theme="e" onClick="loadList();">Ещё</div>';

?>

      </div><!-- /content -->
      <div data-role="footer" data-position="fixed">
        <div data-role="navbar">
          <ul>
            <li><a data-icon="home" href="#home">Меню</a></li>
            <li><a data-icon="grid" href="#map">Карта</a></li>
            <li><a data-icon="bars" class="ui-btn-active ui-state-persist"
                 href="#sights">Достопримечательности</a></li>
          </ul>
        </div><!-- /navbar -->
      </div><!-- /footer -->
    </div><!-- /page -->
  </body>
</html>
