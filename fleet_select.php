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
    
    <title>Fleet » Select</title>
    
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


<!-- /fleet select -->

<p>To assemble a fleet enter the number of ships you want to add to your fleet in the form below and click "Next step".</p>

<br>

<table class="table">
  <thead>
  <tr>
    <td><b>Ship</b></td>
    <td><b>Name</b></td>
    <td><b>Number</b></td>
    <td style="float:right;"><b>Choose</b></td>
  </tr>
  </thead>
  <tr>
    <td><img src="img/ships/transporter.png" width="36px"></td>
    <td>Transporter</td>
    <td>10</td>
    <td><input autocomplete="off" onkeypress='validateint(event)'type="text" class="form-control" placeholder="10" style="font-size:12px; color:#ffffff; background-color:transparent;width:50%;float:right;"></td>
  </tr>
  <tr>
    <td><img src="img/ships/colonyship.png" width="36px"></td>
    <td>Explorer</td>
    <td>1</td>
    <td><input autocomplete="off" onkeypress='validateint(event)'type="text" class="form-control" placeholder="1" style="font-size:12px; color:#ffffff; background-color:transparent;width:50%;float:right;"></td>
  </tr>
</table>

<div style="border-bottom:1px #fff solid; margin:-20px 0 20px 0;"></div>

<div style="margin:0 0 10px 0;"><button type="button" class="btn btn-success btn btn-block" style="margin:0 auto 0 auto; width:60%;" disabled="disabled">Next step</button></div>

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
    <script type ="text/javascript">
      window.onload = function what(){
        GetMyPlanets();
      };
    </script>    
  
</body></html>