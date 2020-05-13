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
    
    <title>Buffs</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">
        <h2>Buffs</h2>
      </div>

<div class="content">

<!--Button-->
<div id="buffbtn" style="display:none"><div id="timerb_" style="text-align:center;color:#ffffff;font-size:12px;display:none;">Deactivated in <span id="timer_">06:23:59:45</span> <a class="tooltips" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="12px" height="12px" style="margin:-2px 0 0 0;"><span>End date: date_</span></a></div><button type="button" id="button_" class="btn btn-info btn-sm btn-block">Buy now</button><div style="text-align:center;color:#ffffff;font-size:12px;display:block;">Active buffs: buffs_</div></div>

<div class="panel panel-default" style="background-color:transparent;">
  <div class="panel-body">
    <div class="row">
        <div class="col-md-1"><img src="img/icons/buff1.png" width="60px" height="60px" style="border: 1px solid rgba(255, 255, 255, 0.30); margin:0 0 20px 0;"></div>
        <div class="col-md-8"><div style="font-size:18px;margin:0 0 6px 0;">Mission Control</div>
        <div>This buff expands mission control temporary and increases the mission slots to 400. This is essential for commanders of huge fleets. This buff can be purchased multiple times, so that the periods add up and thus last for a longer period. This buff effects on account level.</div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:14px 0 14px 0;"></div>
        <div style="font-size:13px;" class="infocolor">400 mission slots in total</div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:14px 0 12px 0;"></div>
        <div style="font-size:12px;margin:0 0 10px 0;">Cost: <span id="buff0_price" class="stardust">10.000 Stardust</span>* / <span class="glyphicon glyphicon-time" aria-hidden="true"></span> Duration: <span id="buff0_days">7</span> days</div></div>
        <div id="buff0_btn" class="col-md-3"></div>
    </div>
  </div>
</div>

<div class="panel panel-default" style="background-color:transparent;">
  <div class="panel-body">
    <div class="row">
        <div class="col-md-1"><img src="img/icons/buff20.png" width="60px" height="60px" style="border: 1px solid rgba(255, 255, 255, 0.30); margin:0 0 20px 0;"></div>
        <div class="col-md-8"><div style="font-size:18px;margin:0 0 6px 0;">Battle Speed</div>
        <div>This buff increases the speed of all rocket, laser and bullet type battleships temporary to a fixed level. This is essential for commanders of huge fleets. This buff can be purchased multiple times, so that the periods add up and thus last for a longer period. This buff effects on account level.</div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:14px 0 14px 0;"></div>

  <table class="table">
    <thead>
    <tr>
      <td></td>
      <td>Base <a class="tooltips" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="14px" height="14px" style="margin:-3px 0 0 0;"><span>Current speed (coordinate point per hour) of all rocket, laser and bullet type battleships without activated buff.</span></a></td>
      <td>Rocket</td>
      <td>Laser</td>
      <td>Bullet</td>
    </tr>
    </thead>
    <tbody id="speedtable">
    <tr>
        <td>Scout</td>
        <td>1</td>
        <td><span class="infocolor">2</span></td>
        <td><span class="infocolor">3</span></td>
        <td><span class="infocolor">4</span></td>
    </tr>
    <tr>
        <td>Patrol</td>
        <td>1</td>
        <td><span class="infocolor">2</span></td>
        <td><span class="infocolor">3</span></td>
        <td><span class="infocolor">4</span></td>
    </tr>
    <tr>
        <td>Cutter</td>
        <td>2</td>
        <td><span class="infocolor">3</span></td>
        <td><span class="infocolor">4</span></td>
        <td><span class="infocolor">5</span></td>
    </tr>
    <tr>
        <td>Corvette</td>
        <td>4</td>
        <td><span class="infocolor">5</span></td>
        <td><span class="infocolor">6</span></td>
        <td><span class="infocolor">7</span></td>
    </tr>
    <tr>
        <td>Frigate</td>
        <td>3</td>
        <td><span class="infocolor">5</span></td>
        <td><span class="infocolor">6</span></td>
        <td><span class="infocolor">7</span></td>
    </tr>
    <tr>
        <td>Destroyer</td>
        <td>3</td>
        <td><span class="infocolor">5</span></td>
        <td><span class="infocolor">6</span></td>
        <td><span class="infocolor">7</span></td>
    </tr>
    <tr>
        <td>Cruiser</td>
        <td>2</td>
        <td><span class="infocolor">5</span></td>
        <td><span class="infocolor">6</span></td>
        <td><span class="infocolor">7</span></td>
    </tr>
    <tr>
        <td>Battlecruiser</td>
        <td>2</td>
        <td><span class="infocolor">5</span></td>
        <td><span class="infocolor">6</span></td>
        <td><span class="infocolor">8</span></td>
    </tr>
    <tr>
        <td>Carrier</td>
        <td>1</td>
        <td><span class="infocolor">5</span></td>
        <td><span class="infocolor">7</span></td>
        <td><span class="infocolor">8</span></td>
    </tr>
    <tr>
        <td>Dreadnought</td>
        <td>1</td>
        <td><span class="infocolor">6</span></td>
        <td><span class="infocolor">7</span></td>
        <td><span class="infocolor">8</span></td>
    </tr>
    </tbody>
  </table>
            
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:14px 0 12px 0;"></div>
        <div style="font-size:12px;margin:0 0 10px 0;">Cost: <span id="buff1_price" class="stardust">5.000 Stardust</span>* / <span class="glyphicon glyphicon-time" aria-hidden="true"></span> Duration: <span id="buff1_days">7</span> days</div></div>
        <div id="buff1_btn" class="col-md-3"></div>
    </div>
  </div>
</div>

<div style="font-size:12px;">*Prices might change. Already purchased buffs are not affected.</div>

<br>
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
	  <script src="./js/buffs.js?ver=<?php echo $config['version'] ?>"></script>
    
  
</body></html>