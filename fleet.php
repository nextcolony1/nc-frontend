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
    
    <title>Fleet</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header" id="fleet_link">
        <h2 id="fleet_header">Fleet</h2>
        <div style="float: right!important; margin-top: -30px;" class="infocolor"><a href="fleet_sell" class="infocolor">Sell Ships</a></div>
      </div>

<div class="content">


<!-- FLEET MAIN -->
<div id="fleet_main_div">
  <p id="fleet_available">-</p>
  <br>
  <table class="table" id="fleet_main_table">
    <thead>
    <tr>
      <td><b>Ship</b></td>
      <td><b>Name</b></td>
      <td><b>Speed</b></td>
      <td><b>Quantity</b></td>
    </tr>
    </thead>
  </table>

  <div style="border-bottom:1px #fff solid; margin:-20px 0 20px 0;"></div>

  <div style="margin:0 0 10px 0;">
  <select class="form-control" style="margin:0 auto 0 auto; width:60%; background-color:transparent;color:fff;" id="missionselector" onchange="SelectMainFleet(value)">
    <option>Choose a mission</option>
    <option>Explore</option>
    <option>Transport</option>
    <option>Attack</option>
    <option>Siege</option>
    <option>Break Siege</option>
    <option>Support</option>
    <option>Deploy</option>
  </select>
  </div>
  <div style="margin:0 0 10px 0;"><button onclick="NextStep('select',1)" type="button" id="fleet_main_btn" class="btn btn-success btn btn-block" style="margin:0 auto 0 auto; width:60%;" disabled>Next step</button></div>
  <div style="font-size:12px; text-align: center; display:none" id="ehancemc">You can't start a mission. Enhance the mission control <a href="/skills">skill</a>.</div>
  <div style="font-size:12px; text-align: center; display:none" id="upgradebuilding">You can't start a mission. Upgrade the base <a href="/buildings">building</a>.</div>
  <div style="font-size:12px; text-align: center; display:none" id="preventplanetsale">You can't start a mission. Cancel the market listing for the planet.</div>
  <br>
  <br>
  <br>
</div>
<!--/FLEET_MAIN-->

<!--FLEET_SELECT-->
<div id='fleet_select_div' style="display:none">
  <p>To assemble a fleet enter the number of ships you want to add to your fleet in the form below and click "Next step".</p>

  <br>

  <table class="table" id="fleet_select_table">
    <thead>
    <tr>
      <td><b>Ship</b></td>
      <td><b>Name</b></td>
      <td><b>Number</b></td>
      <td style="float:right;"><b>Choose</b></td>
    </tr>
    </thead>
  </table>

  <div style="border-bottom:1px #fff solid; margin:-20px 0 20px 0;"></div>

  <div style="margin:0 0 10px 0;"><button onclick="NextStep('send',2); TotalSelected();" type="button" id="fleet_select_btn" class="btn btn-success btn btn-block" style="margin:0 auto 0 auto; width:60%;" disabled="disabled">Next step</button></div>

  <br>
  <br>
</div>

<!--FLEET_SELECT_Attack-->
<div id='fleet_select_attack_div' style="display:none">
  <p>Form your Fleet. Ships will fight in the defined order.</p>

  <br>

  <table class="table" id="fleet_select_attack_table">
    <thead>
    <tr>
      <td><b>Order</b></td>
      <td><b>Ship (available)</b></td>
      <td><b>Quantity</b></td>
    </tr>
    </thead>
    <tbody id="fleet_select_attack_tbody">

    </tbody>
  </table>

  <div style="border-bottom:1px #fff solid; margin:-20px 0 20px 0;"></div>

  <div style="margin:0 0 10px 0;"><button disabled id="fleet_attack_btn" onclick="" type="button" id="fleet_select_btn" class="btn btn-success btn btn-block" style="margin:0 auto 0 auto; width:60%;">Next step</button></div>

  <br>
  <br>
</div>

<!--FLEET_SEND-->
<div id='fleet_send_div' style="display:none">
  <p>To choose a destination enter the coordinates in the form below. You get immediately the current status of this coordinate.</p>

  <br>

  <form class="form-inline" style="margin:0 auto 10px auto;width:60%; text-align:center;">
    <div class="form-group">
      X axis
      <input autocomplete="off" id="posx" onkeypress='validateintmin(event)' onkeyup="PosInputField('x')" type="text" class="form-control" placeholder="" style="font-size:12px; text-align:center; color:#ffffff; background-color:transparent;width:100%;">
    </div>
    <div class="form-group">
      Y axis
      <input autocomplete="off" id="posy" onkeypress='validateintmin(event)' onkeyup="PosInputField('y')" type="text" class="form-control" placeholder="" style="font-size:12px; text-align:center; color:#ffffff; background-color:transparent;width:100%;">
    </div>
  </form>

  <div style="margin:0 auto 10px auto;width:60%; text-align:center; font-size:13px;" id="send_status">
  <b>Status:</b> Explored (Planet: Prometheus, Owner: sternenkrieger)
  </div>

  <div style="margin:0 auto 10px auto;width:60%; text-align:center; font-size:13px;" id="send_desc">
  Distance (coordinates): dis_<br>
  Time needed (outward flight): time_<br>
  Arrival: arr_<br>
  Return: ret_<br>
  Required uranium (out/back): req_<br>
  Maximum speed (coordinate point per hour): speed_<br>
  Storage capacity: capa_<br>

  </div>

  <div style="margin:0 0 10px 0;">
  <select class="form-control" style="margin:0 auto 0 auto; width:60%; background-color:transparent;color:fff;" id="planet_selection"  onchange="FleetPlanet(value)">
    <option>My planets</option>
  </select>
  </div>

  <div><button type="button" onclick="NextStep('load',3)" id="fleet_send_btn" class="btn btn-success btn btn-block" style="margin:0 auto 10px auto; width:60%;" disabled="disabled">Next step</button></div>

  <br>
  <br>
</div>

<!--FLEET LOAD-->
<div id='fleet_load_div' style="display:none">
  <p>Define the resources you want to load and then click on "Start mission".</p>

  <br>

  <table class="table" id="load_table">
    <thead>
    <tr>
      <td><b>Resource</b></td>
      <td><b>Number</b></td>
      <td style="float:right;"><b>Choose</b></td>
    </tr>
    </thead>
  </table>

  <div style="border-bottom:1px #fff solid; margin:-20px 0 20px 0;"></div>

  <div style="margin:0 auto 10px auto;width:60%; text-align:center; font-size:13px;" id="load_info">Utilization/Capcity of your fleet: 0/8000</div>

  <div><button type="button" id="start_mission" onclick="StartMission()" class="btn btn-success btn btn-block" style="margin:0 auto 10px auto; width:60%;">Start mission</button></div>

  <br>
</div>

<?php include "include/footer.php" ?>

<?php include "include/modal.php" ?>

        
      </div></div> <!-- /container -->


    <!-- Bootstrap-JavaScript
    ================================================== -->
    <!-- Am Ende des Dokuments platziert, damit Seiten schneller laden -->
    <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/fleet.js?ver=<?php echo $config['version'] ?>"></script>
    <script src="./js/fleet_attack.js?ver=<?php echo $config['version'] ?>"></script>
  
</body></html>