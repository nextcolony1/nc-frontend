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
    
    <title>Missions</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">
        <h2 id="mission_header">Missions</h2>

        <div style="float: right!important; margin-top: -32px;">

          <div class="btn-group" style="margin:0 0 0 10px;">
          <div class="dropdown">
          <a class="dropdown-toggle" style="color:white" id="missionnav" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span id="curpos">All Planets</span>
            <span class="caret"></span>
            </a>
            <ul id="allplanets" class="dropdown-menu dropdown-menu-right" aria-labelledby="dLabel">
              <li><a onclick="SetPlanet(null)">All Planets</a></li>
              <li role="separator" class="divider"></li>
            </ul>
          </div>
          </div>
      </div>
      </div>

<div class="content">

<!--Active-->
<p><b>Active</b></p>
<br>
<table class="table">
    <thead>
    <tr>
      <td style="cursor:pointer"  onclick='sortAfter("active","type")'><b>Type</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("active","start_x")'><b>Origin</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("active","end_x")'><b>Destination</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("active","ships")'><b>Ships</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("active","start_date")'><b>Start</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("active","arrival")'><b>Arrival</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("active","return")'><b>Return</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("active","result")'><b>Result</b></td>
      <td><b></b></td>
    </tr>
    </thead>
    <tbody id="active">
    </tbody>
</table>
<br>

<p><b>Recent</b></p>
<br>
<table class="table">
    <thead>
    <tr>
      <td style="cursor:pointer"  onclick='sortAfter("history","type")'><b>Type</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("history","start_x")'><b>Origin</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("history","end_x")'><b>Destination</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("history","ships")'><b>Ships</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("history","start_date")'><b>Start</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("history","return")'><b>Return</b></td>
      <td style="cursor:pointer"  onclick='sortAfter("history","result")'><b>Result</b></td>
      <td><b></b></td>
    </tr>
    </thead>
    <tbody id="history">
    </tbody>
  </table>

<a id="loadmore" onclick="loadmore('finished')" style="text-align:center;display:block">Load more</a>
<br>




<?php include "include/footer.php" ?>

<?php include "include/modal.php" ?>

        
      </div></div> <!-- /container -->


    <!-- Bootstrap-JavaScript
    ================================================== -->
    <!-- Am Ende des Dokuments platziert, damit Seiten schneller laden -->
    <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/fleet_mission.js"></script>
    <script type ="text/javascript">
      $(function () {
        $('[data-toggle="popover"]').popover()
      })
    </script>    
  
</body></html>