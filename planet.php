<?php include($_SERVER['DOCUMENT_ROOT'] . '/game/misc/maintenance.php'); ?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
    <meta name="robots" content="noindex,follow">
    <link href="/css/bootstrap.css" rel="stylesheet">
    <link href="/css/theme.css" rel="stylesheet">
    <link rel="icon" type="/image/png" sizes="64x64" href="/img/favicon.png">
    
    <title></title>
    
  </head>

  <body>

  <header id="header">
    <?php include "include/nav_top_planet.php" ?>
  </header>
    

  <div class="container theme-showcase">

<div class="page-header">

<h2 id="planet_name">loading..</h2>

<!-- Planet Filter -->
<div style="float: right!important; margin-top: -30px;">

    <div class="btn-group">
    choose planet:
    </div>

    <div class="btn-group" style="margin:0 0 0 6px;">
    <div class="dropdown">
      <a id="dname" class="dropdown-toggle whitea" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      loading...
      <span class="caret"></span>
      </a>
      <ul class="dropdown-menu dropdown-menu-right" id="dlist">
      </ul>
    </div>
    </div>

</div>
<!-- Planet Filter End -->

</div>

<div class="content" id="content" style="display:none">

<div><img src="" id="planet_img" height="310px" style="display: block; margin:90px auto 5px auto;"></div>

<div class="row">
  <div class="col-md-6"><span style="font-size:33px;">name_</span><br><span style="color:rgba(255, 255, 255, 0.80);">id_</span><br><br><span style="color:rgba(255, 255, 255, 0.60);">This is a bonus_ type_ Planet with the coordinates corx_/cory_. There are totalbonus_ bonus_ type_ Planets in existence. This Planet is habitable and was discovered on date_.</span></div>
  <div class="col-md-6"></div>
</div>

<div style="border-bottom:1px solid rgba(255, 255, 255, 0.20); margin:26px 0 15px 0;"></div>
Planet name: name_<br>
Planet ID: id_<br>
Coordinates: [corx_/cory_] (<a id="mapref" href="">show on map</a>)<br>
Last activity (in &amp; out): lastact_<br>
Starter planet: starter_<br>
Merged rune: rune_<br>
Activated blueprints: blueprint_<br>
Opened chests: chest_<br>

<div style="border-bottom:1px solid rgba(255, 255, 255, 0.20); margin:15px 0 15px 0;"></div>
Shield Protection: scharged_<br>
Charging: charging_<br>
Charging finished in: <span id="char_finished">-</span><br>
Protecting: protection_<br>
Protecting finished in: <span id="prot_finished">-</span><br>

<div style="border-bottom:1px solid rgba(255, 255, 255, 0.20); margin:15px 0 15px 0;"></div>
Owner: owner_<br>
Planets: plc_<br>
Active missions: actmis_
<a class="tooltips" href="" style="text-decoration:none;font-size:11px;"><img src="/img/icons/info.png" width="14px" height="14px" style="margin:-3px 0 0 0;"><span>The last available mission control slot (bonus slot) can only be used on the alpha planet.</span></a>

<div style="border-bottom:1px solid rgba(255, 255, 255, 0.20); margin:15px 0 15px 0;"></div>

  <table class="table" id="t_ressources">
    <thead>
    <tr>
      <td><b>Resource</b></td>
      <td><b>Current state</b></td>
      <td><b>Depots full in</b></td>
      <td><b>Capacity</b></td>
      <td><b>Production</b></td>
      <td><b>Safe</b></td>
    </tr>
    </thead>
  </table>

<div style="border-bottom:1px solid rgba(255, 255, 255, 0.20); margin:15px 0 15px 0;"></div>

  <table class="table" id="t_buildings">
    <thead>
    <tr>
      <td><b>Building</b></td>
      <td><b>Upgrading</b></td>
      <td><b>Finished in</b></td>
      <td><b>Skill level</b></td>
      <td><b>Enhancing</b></td>
      <td><b>Finished in</b></td>
    </tr>
    </thead>
  </table>

<div style="border-bottom:1px solid rgba(255, 255, 255, 0.20); margin:15px 0 15px 0;"></div>

  <table class="table" id="t_ships">
    <thead>
    <tr>
      <td><b>Ship</b></td>
      <td><b>Owned</b> (shipyard / total)</td>
      <td><b>Building</b></td>
      <td><b>Finished in</b></td>
      <td><b>Skill level</b></td>
      <td><b>Enhancing</b></td>
      <td><b>Finished in</b></td>
    </tr>
    </thead>
  </table>

<div style="border-bottom:1px solid rgba(255, 255, 255, 0.20); margin:15px 0 15px 0;"></div>

  <table class="table" id="t_missions">
    <thead>
    <tr>
      <td><b>Mission</b></td>
      <td><b>Ships</b></td>
      <td><b>From</b></td>
      <td><b>To</b></td>
      <td><b>Arrival in</b></td>
      <td><b>Arrival at</b></td>
      <td><b>Return in</b></td>
      <td><b>Return at</b></td>
      <td><b>Status</b></td>
    </tr>
    </thead>
  </table>
  <a id="loadmore" onclick="loadmore()" style="text-align:center;display:block">Load more</a>

<br>
<br>
<br>


  <!-- /footer -->
  <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.40); margin:40px 0 10px 0;"></div>
  © <a href="https://nextcolony.io/" style="text-decoration:none;"><b>Next</b>Colony</a> | <a href="https://discord.gg/55r9rU2" target="_blank" style="text-decoration:none;">Join our <b>Discord</b> Server »</a>
</div>





<?php include "include/modal.php" ?>

        
      </div></div> <!-- /container -->


    <!-- Bootstrap-JavaScript
    ================================================== -->
    <!-- Am Ende des Dokuments platziert, damit Seiten schneller laden -->
    <script src="/js/jquery.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/moment.js"></script>
    <script src="/js/translator.js?ver=<?php echo $config['version'] ?>"></script>
    <script src="/js/misc.js?ver=<?php echo $config['version'] ?>"></script>
    <script src="/js/planetssite.js?ver=<?php echo $config['version'] ?>"></script>
    <script src="/js/gift.js?ver=<?php echo $config['version'] ?>"></script>
  
</body></html>