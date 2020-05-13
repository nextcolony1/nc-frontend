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
    
    <title>Fleet » Send</title>
    
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


<!-- /fleet send -->

<p>To choose a destination enter the coordinates in the form below. You get immediately the current status of this coordinate.</p>

<br>

<form class="form-inline" style="margin:0 auto 10px auto;width:60%; text-align:center;">
  <div class="form-group">
    X axis
    <input autocomplete="off" onkeypress='validateint(event)'type="text" class="form-control" placeholder="100" style="font-size:12px; text-align:center; color:#ffffff; background-color:transparent;width:100%;">
  </div>
  <div class="form-group">
    Y axis
    <input autocomplete="off" onkeypress='validateint(event)'type="text" class="form-control" placeholder="100" style="font-size:12px; text-align:center; color:#ffffff; background-color:transparent;width:100%;">
  </div>
</form>

<div style="margin:0 auto 10px auto;width:60%; text-align:center; font-size:13px;">
<b>Status:</b> Explored (Planet: Prometheus, Owner: sternenkrieger)
</div>

<div style="margin:0 auto 10px auto;width:60%; text-align:center; font-size:13px;">
Distance (coordinates): 15<br>
Time needed (outward flight): 02:57:12<br>
Arrival: 03/23/2019, 11:53:52<br>
Return: 03/23/2019, 11:53:52<br>
Required uranium (out/back): <span class="text-dangerq">2876</span><br>
Maximum speed (coordinate point per hour): 1<br>
Storage capacity: 159<br>

</div>

<div style="margin:0 0 10px 0;">
<select class="form-control" style="margin:0 auto 0 auto; width:60%;">
  <option>My planets</option>
  <option>My planet A</option>
  <option>My planet B</option>
  <option>My planet C</option>
  <option>My planet E</option>
</select>
</div>

<div><button type="button" class="btn btn-success btn btn-block" style="margin:0 auto 10px auto; width:60%;" disabled="disabled">Next step</button></div>

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