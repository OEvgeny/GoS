<?php

header("Access-Control-Allow-Origin: *");

/* Link required files. */
require_once "WRITE_YOUR_OWN_PATH_TO/config.php";

/* Define SIZE of number of sights of list */
define("SIZE", 10);

/* Get section ID */
// 0 - all, etc from tblSection
$ID = (isset($_GET['section'])) ? $_GET['section'] : 0;  
$NUM = $_GET['num'];

/* Connect and Choose */
mysql_connect(DB_HOST, DB_USER, DB_PASS) or die (mysql_error ());
mysql_select_db(DB_NAME) or die(mysql_error());

/* SELECT Query */
$sght = "SELECT intSightId, txtNameSection, txtNameSight 
         FROM tblSight, tblSection 
         WHERE tblSight.intSectionId = tblSection.intSectionId";

if($ID != 0)
  $sght .= " AND tblSight.intSectionId = $ID";

$tmp = SIZE + 1;
$sght .= " LIMIT $NUM, ".$tmp;

$sg = mysql_query($sght);

// counter of sights
$r_size = 0;

/* Print result */
while(($row = mysql_fetch_assoc($sg)) && ($r_size < SIZE)) {
  $r_size++;
  echo '<li><a href="creating_page.php?sight='.
       $row['intSightId'].
       '"><img src="http://cs.karelia.ru/~pilinovi/gos/res/images/thumb/'.
       str_pad($row['intSightId'], 4, "0", STR_PAD_LEFT).
       '_0.jpg" alt="'.
       $row['txtNameSight'].
       '"/>';  
  echo '<h2>'.$row['txtNameSight'].'</h2>';
  echo '<p>'.$row['txtNameSection'].'</p></a></li>';
}

if(!$row) echo '<div id="the_end"></div>';

?>
