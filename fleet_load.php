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
    
    <title>Fleet » Load</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">
        <h2><a href="fleet">Fleet</a> » <a href="fleet_select">Select</a> » <a href="fleet_send">Send</a> » <a href="fleet_load">Load</a></h2>
      </div>

<div class="content">


<!-- /fleet load -->

<p>First select the resources you want to transport in the form. Then select one of your planets and click on "Start mission".</p>

<br>

<table class="table">
  <thead>
  <tr>
    <td><b>Resource</b></td>
    <td><b>Number</b></td>
    <td style="float:right;"><b>Choose</b></td>
  </tr>
  </thead>
  <tr>
    <td>Ore</td>
    <td>800</td>
    <td><input autocomplete="off" onkeypress='validateint(event)'type="text" class="form-control" placeholder="800" style="font-size:12px; color:#ffffff; background-color:transparent;width:50%;float:right;"></td>
  </tr>
  <tr>
    <td>Coal</td>
    <td>600</td>
    <td><input autocomplete="off" onkeypress='validateint(event)'type="text" class="form-control" placeholder="600" style="font-size:12px; color:#ffffff; background-color:transparent;width:50%;float:right;"></td>
  </tr>
  <tr>
    <td>Copper</td>
    <td>400</td>
    <td><input autocomplete="off" onkeypress='validateint(event)'type="text" class="form-control" placeholder="400" style="font-size:12px; color:#ffffff; background-color:transparent;width:50%;float:right;"></td>
  </tr>
  <tr>
    <td>Uranium</td>
    <td>100</td>
    <td><input autocomplete="off" onkeypress='validateint(event)'type="text" class="form-control" placeholder="100" style="font-size:12px; color:#ffffff; background-color:transparent;width:50%;float:right;"></td>
  </tr>
</table>

<div style="border-bottom:1px #fff solid; margin:-20px 0 20px 0;"></div>

<div style="margin:0 auto 10px auto;width:60%; text-align:center; font-size:13px;">Utilization/Capcity of your fleet: 0/8000</div>

<div><button type="button" class="btn btn-success btn btn-block" style="margin:0 auto 10px auto; width:60%;">Start mission</button></div>

<br>

<?php include "include/footer.php" ?>

<?php include "include/modal.php" ?>

        
      </div></div> <!-- /container -->


    <!-- Bootstrap-JavaScript
    ================================================== -->
    <!-- Am Ende des Dokuments platziert, damit Seiten schneller laden -->
    <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script type ="text/javascript">
      window.onload = function what(){
        GetMyPlanets();
      };
    </script>    
  
</body></html>