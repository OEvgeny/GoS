<?php 
header("Access-Control-Allow-Origin: *");
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<html>
  <head>
    <title>Main</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
  </head>

  <body>
    <div data-role="page" id="list" >
      <div data-role="header" data-position="fixed">
        <a href="#" data-rel="back" data-iconpos="notext" data-icon="arrow-l"></a>
        <h3>Достопримечательности</h3>
      </div><!-- /header -->
      <div data-role="content">
        <div data-role="navbar">
          <ul>
            <li>

<?php
/* Link required files. */
require_once "WRITE_YOUR_OWN_PATH_TO/config.php";

/* Define SIZE of number of sights of list */
define("SIZE", 10);

/* Get page number */
$PAGE = (isset($_GET['page'])) ? $_GET['page'] : 0;

/* Get section ID */
$ID = (isset($_GET['section'])) ? $_GET['section'] : 0; // 0 - all, etc from tblSection

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
        <li><a data-icon="bars" href="creating_list.php" >Все';
} else {
  echo '<a data-icon="bars" href="#sights">По типу</a></li>
        <li><a data-icon="bars" class="ui-btn-active ui-state-persist"
         href="creating_list.php" >Все';
}

$tmp = SIZE + 1;  // To select
$sght .= ' LIMIT '.$PAGE * SIZE.','.$tmp;
?>

            </a></li>
    </ul>
        </div><!-- /navbar -->
  <ul data-role="listview" style="padding-top:7%">

<?php
$sg = mysql_query($sght);
mysql_close();

$r_size = 0;  // counter of sights

/* Print result */
while(($row = mysql_fetch_assoc($sg)) && ($r_size < SIZE)) {
  $r_size++;
  echo '<li><a href="'.
       'creating_page.php'.  
       '?id='.$row['intSightId'].
       '"><img src="res/images/thumb/'.
       str_pad($row['intSightId'], 4, "0", STR_PAD_LEFT).
       '.jpg" alt="'.
       $row['txtNameSight'].
       '"/><h2>'.
       $row['txtNameSight'].
       '</h2><p>'.
       $row['txtNameSection'].
       '</p></a></li>';
}

?>
        </ul>
      </div><!-- /content -->
      <div data-role="controlgroup" data-type="horizontal" data-mini="true"
           style="width: 100%; text-align: center;">
<?php

/* Buttons to right 'n' left */
if($PAGE > 0)
  echo '<a href="creating_list.php?section='.$ID.'&page=',$PAGE-1,'" data-icon="arrow-l" data-iconpos="right"
         data-role="button" data-theme="e">ВЛЕВО</a>';
if($row)
  echo '<a href="creating_list.php?section='.$ID.'&page=',$PAGE+1,'" data-icon="arrow-r" data-iconpos="left"
         data-role="button" data-theme="e">ВПРАВО</a>';

?>
      </div>
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
