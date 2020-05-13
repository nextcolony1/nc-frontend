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
    
    <title>My Items</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">
        <h2><a href="fleet_sell">Sell Ships</a></h2>
      </div>

<div class="content">

<div style="margin: 0 0 24px 0;">
<form class="form-inline" abineguid="AD5BF11A0B7B4994B859E6D45156F80A">
  <div class="form-group">
   <select id="selectsell" class="form-control input-sm" style="background-color:transparent;color:fff;">
       <option value="all">Type: All</option>
       <option value="transportship">Transporter</option>
       <option value="transportship1">Transporter II</option>
       <option value="transportship2">Transporter III</option>
       <option value="explorership">Explorer</option>
       <option value="explorership1">Explorer II</option>
       <option value="scout">Scout Sentry R</option>
       <option value="scout2">Scout Minerva L</option>
       <option value="scout1">Scout Athen B</option>
       <option value="patrol">Patrol Amaterasu R</option>
       <option value="patrol2">Patrol Cruqal L</option>
       <option value="patrol1">Patrol Hermes B</option>
       <option value="cutter">Cutter Arrow R</option>
       <option value="cutter2">Cutter Orchis L</option>
       <option value="cutter1">Cutter Canard B</option>
       <option value="corvette">Corvette Crocus R</option>
       <option value="corvette2">Corvette Najtar L</option>
       <option value="corvette1">Corvette Petunia B</option>
       <option value="frigate">Frigate Quorn R</option>
       <option value="frigate2">Frigate Droeel L</option>
       <option value="frigate1">Frigate Redmill B</option>
       <option value="destroyer">Destroyer Rocket R</option>
       <option value="destroyer2">Destroyer Janus L</option>
       <option value="destroyer1">Destroyer Halgoin B</option>
       <option value="cruiser">Cruiser Kent R</option>
       <option value="cruiser2">Cruiser Eceza L</option>
       <option value="cruiser1">Cruiser Drake B</option>
       <option value="battlecruiser">Battlecruiser Tiger R</option>
       <option value="battlecruiser2">Battlecruiser Dejah L</option>
       <option value="battlecruiser1">Battlecruiser Lion B</option>
       <option value="carrier">Carrier Argus R</option>
       <option value="carrier2">Carrier Bhun'il L</option>
       <option value="carrier1">Carrier Unicorn B</option>
       <option value="dreadnought">Dreadnought Royal R</option>
       <option value="dreadnought2">Dreadnought Zaneel L</option>
       <option value="dreadnought1">Dreadnought Imperial B</option>
       <option value="yamato">Yamato T-00</option>
       <option value="yamato1">Yamato T-01</option>
       <option value="yamato2">Yamato T-02</option>
       <option value="yamato3">Yamato T-03</option>
       <option value="yamato4">Yamato T-04</option>
       <option value="yamato5">Yamato T-05</option>
       <option value="yamato6">Yamato T-06</option>
       <option value="yamato7">Yamato T-07</option>
       <option value="yamato8">Yamato T-08</option>
       <option value="yamato9">Yamato T-09</option>
       <option value="yamato10">Yamato T-10</option>
       <option value="yamato11">Yamato T-11</option>
       <option value="yamato12">Yamato T-12</option>
       <option value="yamato13">Yamato T-13</option>
       <option value="yamato14">Yamato T-14</option>
       <option value="yamato15">Yamato T-15</option>
       <option value="yamato16">Yamato T-16</option>
       <option value="yamato17">Yamato T-17</option>
       <option value="yamato18">Yamato T-18</option>
       <option value="yamato19">Yamato T-19</option>
       <option value="yamato20">Yamato T-20</option>
   </select>
  </div>
  <div class="form-group" style="margin: 0 0 0 8px;">Limit:</div>
  <div class="form-group">
    <input class="form-control input-sm" id="limit_in" style="background-color:transparent;color:fff;" placeholder="100">
  </div>
  <button type="button" id="set_btn" class="btn btn-sm btn-primary">Set</button>
</form>
</div>

<br>

<table class="table">
    <thead>
    <tr>
      <td><b>Name</b></td>
      <td><b>Sale</b></td>
      <td><b>Sell</b></td>
    </tr>
    </thead>
    <tbody id="fleet_st">
    </tbody>
  </table>

  <div style="border-bottom:1px #fff solid; margin:-20px 0 20px 0;"></div>
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
    <script src="./js/fleet_sell.js?ver=<?php echo $config['version'] ?>"></script>
  
</body></html>