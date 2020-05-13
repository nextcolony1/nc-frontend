<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
    <link href="./css/bootstrap.css" rel="stylesheet">
    <link href="./css/theme.css" rel="stylesheet">
    <link rel="icon" type="image/png" sizes="64x64" href="/img/favicon.png">
    
    <title>Shipyard Compact</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">


    <div class="page-header">
      <h2><a href="shipyard">Shipyard</a> / <a href="shipyard_compact"><b>Compact</b></a></h2>

        <div style="float: right!important; margin-top: -32px;">
          <div class="btn-group" style="margin:0 0 0 8px;">
              sort by:
          </div>

          <div class="btn-group" style="margin:0 0 0 10px;">
          <div class="dropdown">
          <a class="dropdown-toggle" style="color:white" id="missionnav" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span id="mode">Active</span>
            <span class="caret"></span>
            </a>
            <ul id="allplanets" class="dropdown-menu dropdown-menu-right" aria-labelledby="dLabel">
              <li onclick='ChangeMode("All")'><a>All</a></li>
              <li onclick='ChangeMode("Active")'><a>Active</a></li>
            </ul>
          </div>
          </div>
      </div>
      </div>

<div class="content">

<div style="margin: 0 0 20px 0;">Next ship built in: <span id="nextTimer">-</span> / Next Refresh: <span id="nextRefresh"></span></div>

<table class="table">
    <thead>
    <tr>
      <td><b>Ship</b></td>
      <td onclick='sortAfter("shipyard_min_level")'><a class="tooltips" style="text-decoration:none;font-size:11px;"><img src="img/icons/shipyard.png" style="margin:-5px 0 0 0; opacity: 0.3;" width="15px" height="15px"><span>Needed Shipyard Level.</span></a></td>
      <td><a class="tooltips" style="text-decoration:none;font-size:11px;"><img src="img/icons/shipyard.png" style="margin:-5px 0 0 0;" width="15px" height="15px"><span>Current Shipyard Level.</span></a></td>
      <td onclick='sortAfter("ship_skill")'><a class="tooltips" style="text-decoration:none;font-size:11px;"><img src="img/icons/skill.png" style="margin:-3px 0 0 0;" width="15px" height="15px"><span>Current Ship Skill Level.</span></a></td>
      <td style="cursor:pointer"  onclick='sortAfter("coal")'><b>C</b></td>
      <td style="cursor:pointer" onclick='sortAfter("ore")'><b>Fe</b></td>
      <td style="cursor:pointer" onclick='sortAfter("copper")'><b>Cu</b></td>
      <td style="cursor:pointer" onclick='sortAfter("uranium")'><b>U</b></td>
      <td style="cursor:pointer" onclick='sortAfter("stardust")'><b>SD</b></td>
      <td style="cursor:pointer" onclick='sortAfter("speed")'><b>Speed</b></td>
      <td style="cursor:pointer" onclick='sortAfter("time")'><b>Need</b></td>
      <td style="cursor:pointer" onclick='sortAfter("AD")'><b>A/D</b></td>
      <td style="cursor:pointer" onclick='sortAfter("busy_until")'><b>Busy</b></td>
      <td><b>Build</b></td>
    </tr>
    </thead>
    <tbody id="shipyard">
    </tbody>
  </table>

  <div style="border-bottom:1px #fff solid; margin:-20px 0 20px 0;"></div>


<br>
<br>

<?php include "include/footer.php" ?>

<?php include "include/modal.php" ?>

        
      </div></div> <!-- /container -->


    <!-- Bootstrap-JavaScript
    ================================================== -->
    <!-- Am Ende des Dokuments platziert, damit Seiten schneller laden -->
    <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/shipyard_compact.js?ver=?ver=<?php echo $config['version'] ?>"></script>
  
</body></html>
