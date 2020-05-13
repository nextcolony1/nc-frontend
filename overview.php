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
    
    <title>Overview</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">
        <h2>Overview</h2>
        <div style="float: right!important; margin-top: -30px;" class="infocolor"><a class="infocolor" href="market">Market</a> / <a class="infocolor" href="buffs">Buffs</a> / <a class="infocolor" href="shop">Shop</a></div>
      </div>

<div class="content">

<!-- /current planet start -->
<div class="row">

<div class="col-md-4">
    <div class="panel panel-default" style="border:none; border-radius:0px;">
      <div class="panel-body">
        <img id="planet_img" src="" width="253px" style="margin:0 0 0 0;">
      </div>
    </div>
</div>

<div class="col-md-8">
    <div class="panel panel-default" style="background-color:rgba(255, 255, 255, 0.03); border:none; border-radius:0px;">
      <div class="panel-body" style="padding:20px">
        <div><span style="font-size:20px;" id="planet_name">loading...</span></div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:6px 0 6px 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);">This Planet is habitable and was discovered on <span id="planet_date"></span></div>
        <div style="color:rgba(255, 255, 255, 0.40);" id="planet_detail">.</div>
        <div style="color:rgba(255, 255, 255, 0.40);">Available Missions (Planet): <span id="planet_missions"> - / -</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Planet ID: <span id="planet_id"></span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Building Level: <span id="building_level"></span></div>
        <div style="margin:34px 0 14px 0;" class="overview">
         <img src="img/icons/buildings.png" style="width:14px;"> <a href="buildings">Buildings</a>
         <img src="img/icons/shipyard.png" style="width:14px; margin:0 0 0 9px;"> <a href="shipyard">Shipyard</a>
         <img src="img/icons/fleet.png" style="width:14px; margin:0 0 0 9px;"> <a href="fleet">Fleet</a>
         <img src="img/icons/missions.png" style="width:14px; margin:0 0 0 9px;"> <a href="fleet_missions">Missions</a>
         <img src="img/icons/galaxy.png" style="width:14px; margin:0 0 0 9px;"> <a href="galaxy">Galaxy</a>
        </div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:0 0 8px 0;"></div>
        <div style="margin:0 0 4px 0;"><a id="planet_view">View</a> / <span><a id="renameinibtn">Rename</a><span id="psign"> / </span><a id="giftplanetbtn">Gift</a><span id="pssign"></span><a id="burnplanetbtn"></a><span id="psssign"></span><a id="sellplanetbtn"></a></span></div>
      </div>
    </div>
</div>

</div>
<!-- /current planet end -->


<!-- /notes start -->
<div class="row">

<div class="col-md-4">
    <div class="panel panel-default" style="background-color:rgba(255, 255, 255, 0.03); border:none; border-radius:0px;">
      <div class="panel-body" style="padding:20px">
        <div style="font-size:20px;">Missions<a class="tooltips steem-keychain-checked" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="14px" height="14px" style="margin:-5px 0 0 4px;"><span>These are all the missions of all of your planets.</span></a></div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:6px 0 6px 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Available Missions: <span id="ava_missions">0 / 0</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Own Missions: <span id="mission_own">0</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Friendly Missions: <span id="mission_friendly">0</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);color:#a94442">Hostile Missions: <span id="mission_hostile">0</span></div>
        <div style="margin:10px 0 4px 0;"><a href="fleet_missions">Missions</a> »</div>
      </div>
    </div>
</div>

<div class="col-md-4">
    <div class="panel panel-default" style="background-color:rgba(255, 255, 255, 0.03); border:none; border-radius:0px;">
      <div class="panel-body" style="padding:20px">
        <div style="font-size:20px;">Stardust</div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:6px 0 6px 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Your Balance: <span class="stardust" id="stardustbalance">0 Stardust</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Percent of total Supply: <span id="stardustpercent"></span>%</div>
        <div style="color:rgba(255, 255, 255, 0.40);">Trade Stardust: <a href="https://steem-engine.com/?p=market&amp;t=STARDUST" target="_blank" class="steem-keychain-checked">Steem Engine</a> <img src="img/icons/link.png" width="13px" height="13px" style="margin:-2px 0 0 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Total Supply: <span class="stardust" id="stardustsupply">0 Stardust</span></div>
        <div style="margin:10px 0 4px 0;"><a href="wallet">Wallet</a> / <a href="wallet_ranking">Ranking</a> / <a id="stardusttransfer">Transfer</a> / <a id="stardustconvert">Convert</a></div>
      </div>
    </div>
</div>

<div class="col-md-4">
    <div class="panel panel-default" style="background-color:rgba(255, 255, 255, 0.03); border:none; border-radius:0px;">
      <div class="panel-body" style="padding:20px">
        <div style="font-size:20px;">Season</div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:6px 0 6px 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Name: <span id="seasonnname"></span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Prize Pool: <span id="seasonprize">0</span> STEEM</div>
        <div style="color:rgba(255, 255, 255, 0.40);">Leach Rate: <span id="seasonleach">0</span>% / Deploy Rate: <span id="seasondeploy">0</span>%</div>
        <div style="color:rgba(255, 255, 255, 0.40);"><span id="seasontimer">.</span></div>
        <div style="margin:10px 0 4px 0;"><a href="season">Season</a> »</div>
      </div>
    </div>
</div>

<div class="col-md-4">
    <div class="panel panel-default" style="background-color:rgba(255, 255, 255, 0.03); border:none; border-radius:0px;">
      <div class="panel-body" style="padding:20px">
        <div style="font-size:20px;">Battle of the Day</div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:6px 0 6px 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);"><span id="battle_vs">- vs. -</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Attacker: <span id="battle_a">-</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Defender: <span id="battle_d">-</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);" id="battle_t">-</div>
        <div style="margin:10px 0 4px 0;"><a id="battle_off">Report</a> / <a id="battle_jar" target="_blank">Jarunik's client <img src="img/icons/link.png" style="width:14px; margin:-2px 0 0 0;"></a></div>
      </div>
    </div>
</div>

<div class="col-md-4">
    <div class="panel panel-default" style="background-color:rgba(255, 255, 255, 0.03); border:none; border-radius:0px;">
      <div class="panel-body" style="padding:20px">
        <div style="font-size:20px;">Production<a class="tooltips" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="14px" height="14px" style="margin:-5px 0 0 4px;"><span>This is the total production, the sum of all of your planets.</span></a></div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:6px 0 6px 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Coal: +<span id="coalprdo">0</span> / Day</div>
        <div style="color:rgba(255, 255, 255, 0.40);">Ore: +<span id="oreprdo">0</span> / Day</div>
        <div style="color:rgba(255, 255, 255, 0.40);">Copper: +<span id="copperprdo">0</span> / Day</div>
        <div style="color:rgba(255, 255, 255, 0.40);">Uranium: +<span id="uraniumprdo">0</span> / Day</div>
        <div style="margin:10px 0 4px 0;"><a href="/production">Production</a> »</div>
      </div>
    </div>
</div>

<div class="col-md-4">
    <div class="panel panel-default" style="background-color:rgba(255, 255, 255, 0.03); border:none; border-radius:0px;">
      <div class="panel-body" style="padding:20px">
        <div style="font-size:20px;">Market</div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:6px 0 6px 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Total Transactions: <span id="ttransactions">0</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Total sold: <span class="stardust" id="tsold">0 Stardust</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Total burned: <span class="stardust" id="tburned">0 Stardust</span></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Highest sale: <span class="stardust" id="hsell">0 Stardust</span> <a class="tooltips steem-keychain-checked" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="14px" height="14px" style="margin:-3px 0 0 4px;"><span id="hinfo"><b>Highest sale</b><br>Category: none<br>Price: 0 SD<br>Seller: none</span></a></div>
        <div style="margin:10px 0 4px 0;"><a href="market" class="steem-keychain-checked">Market</a> »</div>
      </div>
    </div>
</div>

<div class="col-md-4">
    <div class="panel panel-default" style="background-color:rgba(255, 255, 255, 0.03); border:none; border-radius:0px;">
      <div class="panel-body" style="padding:20px">
        <div style="font-size:20px;">Activity</div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:6px 0 6px 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);">Inspect all transactions, we and every single player are doing on the Steem blockchain. Everything is comprehensible for everyone and easy to be inspected.</div>
        <div style="margin:10px 0 4px 0;"><a href="activity" class="steem-keychain-checked">Activity</a> <img src="img/icons/link.png" style="width:14px;margin:-2px 0 0 0;"></div>
      </div>
    </div>
</div>

<div class="col-md-4">
    <div class="panel panel-default" style="background-color:rgba(255, 255, 255, 0.03); border:none; border-radius:0px;">
      <div class="panel-body" style="padding:20px">
        <div style="font-size:20px;">Guide</div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:6px 0 6px 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);">This is the official Guide, your one-stop-shop for all things NextColony. Here you’ll find the basics on how to play the game as well as advanced tips and tricks.</div>
        <div style="margin:10px 0 4px 0;"><a href="https://guide.nextcolony.io/" target="_blank" class="steem-keychain-checked">Guide</a> <img src="img/icons/link.png" style="width:14px;margin:-2px 0 0 0;"></div>
      </div>
    </div>
</div>

<div class="col-md-4">
    <div class="panel panel-default" style="background-color:rgba(255, 255, 255, 0.03); border:none; border-radius:0px;">
      <div class="panel-body" style="padding:20px">
        <div style="font-size:20px;">Resources</div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:6px 0 6px 0;"></div>
        <div style="color:rgba(255, 255, 255, 0.40);"><a href="https://nc-client.jarunik.com/activity" target="_blank">Activity</a> <img src="img/icons/link.png" style="width:14px; margin:-2px 0 0 0;"> by Jarunik</div>
        <div style="color:rgba(255, 255, 255, 0.40);"><a href="https://nc-client.jarunik.com/battlefeed" target="_blank">Recent Battles</a> <img src="img/icons/link.png" style="width:14px; margin:-2px 0 0 0;"> by Jarunik</div>
        <div style="color:rgba(255, 255, 255, 0.40);"><a href="https://nc-client.jarunik.com/simulator" target="_blank">Battle Simulator</a> <img src="img/icons/link.png" style="width:14px; margin:-2px 0 0 0;"> by Jarunik</div>
        <div style="color:rgba(255, 255, 255, 0.40);"><a href="https://nc-client.jarunik.com/market" target="_blank">Market</a> <img src="img/icons/link.png" style="width:14px; margin:-2px 0 0 0;"> by Jarunik</div>
        <div style="margin:10px 0 4px 0;"><a href="https://nc-client.jarunik.com/" target="_blank">Jarunik's client</a> <img src="img/icons/link.png" style="width:14px; margin:-2px 0 0 0;"></div>
      </div>
    </div>
</div>

</div>
<!-- /notes end -->


<!-- /notifications start -->
<div id="notification">
  <div id="notification_template">
    <div class="alert alert-info alert-dismissible" style="background-color:rgba(255, 255, 255, 0.03);border-color:rgba(255, 255, 255, 0.08);color:#fff;margin: 0 0 10px 0; padding:10px 35px 10px 10px;display:none">
      <button type="button" class="close" data-dismiss="alert" aria-label="Schließen"><span aria-hidden="true" style="text-shadow: 0 0px 0 #fff;">&times;</span></button>
      notificationcontent_
    </div>
</div>
<!--
<div class="alert alert-info alert-dismissible" style="background-color:rgba(255, 255, 255, 0.03);border-color:rgba(255, 255, 255, 0.08);color:#fff; margin: 0 0 10px 0; padding:10px 35px 10px 10px;">
  <button type="button" class="close" data-dismiss="alert" aria-label="Schließen"><span aria-hidden="true" style="text-shadow: 0 0px 0 #fff;">&times;</span></button>
  <span style="color:#5CB85C;">Planet</span> found! Common Atmosphere on position [-157/-238]. <a href="galaxy">Galaxy</a> »
  <span class="stardust">243 Stardust</span> found on exploration to [-157/-238]. <a href="wallet">Wallet</a> »
</div>

<div class="alert alert-info alert-dismissible" style="background-color:rgba(255, 255, 255, 0.03);border-color:rgba(255, 255, 255, 0.08);color:#fff; margin: 0 0 10px 0; padding:10px 35px 10px 10px;">
  <button type="button" class="close" data-dismiss="alert" aria-label="Schließen"><span aria-hidden="true" style="text-shadow: 0 0px 0 #fff;">&times;</span></button>
  <span style="color:#add8e6;">Corvette Najtar Blueprint</span> found on exploration to [-157/-238]. <a href="items">Items</a> »
</div>-->
</div>
<!-- /notifications end -->


<!-- /logbook start -->
<div style="text-align: right;margin:50px 0 0 0;position:relative;top:52px;left:0px;"><img src="img/char/char9.png" width="120px" style="margin:-70px 0 0 0;"></div>
<div style="color:rgba(255, 255, 255, 0.30);margin:30px 0 3px 0;">Logbook: The start</div>
<div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:0 0 20px 0;"></div>

<p>A large part of humanity has been destroyed by a global nuclear war between China, Russia, North Korea and the USA. This global catastrophe has radically changed the world order. Since there was a lack of any necessary supply, a pandemic raged for many decades, to which many people fell victim. The fallout is spreading over a large area and therefore the earth is almost uninhabitable.</p>

<p>After years of searching, a small group was able to identify some areas that were not radioactively contaminated. In 2080, the rest of the people in these areas tried to create a new livelihood. The radioactive fallout made life impossible. The great war and its devastating destruction of our home planet forced people to flee. Mankind was forced to leave the earth.</p>
    
<p>On different parts of the earth, different factions came together to build space ships under high pressure in order to bring as many people as possible into space and to saving a part of humanity. After a flight of several months through the undiscovered depths of space, you have finally discovered a planet. Planet Alpha. Read more about the <a href="story">story</a> or start with the <a target="_blank" href="https://guide.nextcolony.io/tutorial">tutorial</a>.</p>

<div style="text-align: right;margin:30px 0 0 0;position:relative;top:52px;left:0px;"><img src="img/char/char8.png" width="120px" style="margin:-70px 0 0 0;"></div>
<div style="color:rgba(255, 255, 255, 0.30);margin:30px 0 3px 0;">Logbook: Rewards</div>
<div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:0 0 20px 0;"></div>

<p>Good news, Commander! We have improved the Explorer considerably We are able to mine Stardust and find blueprints of an old alien race as well as planets during our explorations. Explore the galaxy - earn rewards! You have the chance to find Planets, Stardust, Reward-Blueprints and the coveted Yamato Blueprints while exploring deep space. This makes explorations tremendous valuable. Start your exploration now and don't miss the chance to earn <a target="_blank" href="https://guide.nextcolony.io/reward">rewards</a>.</p>

<p>There are 11 different alien blueprints hidden in the galaxy. And there is also a very special gem waiting for you: Dreadnought Zaneel is a laser-armed battleship and pretty hard to find. You can already see the new battleships in your <a href="shipyard" class="steem-keychain-checked">shipyard</a>. Start your exploration now and don't miss the chance to earn <a target="_blank" href="https://guide.nextcolony.io/reward">rewards</a>.</p>
<!-- /logbook end -->

<div style="text-align: right;margin:30px 0 0 0;position:relative;top:52px;left:0px;"><img src="img/char/char6.png" width="120px" style="margin:-70px 0 0 0;"></div>
<div style="color:rgba(255, 255, 255, 0.30);margin:30px 0 3px 0;">Logbook: Seasons</div>
<div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:0 0 20px 0;"></div>
<p>To participate in the monthly <a href="season" class="steem-keychain-checked">season</a>, you need the tremendous battleship Yamato. You have the chance to earn reward points by upgrading and defending your Yamato or by attacking Yamato's of your enemies. Your reward points are converted into Steem, Items, and Stardust at the end of each season. If you have a Yamato blueprint, you can build a Yamato T-00. If you don't have a Yamato blueprint, you can buy one at the <a href="market" class="steem-keychain-checked">market</a> or buy and upgrade an already built Yamato T-00 (you don't need a Yamato blueprint for this). If you want to hunt Yamatos to earn reward points, you need to know where the Yamatos are and if they are currently in an upgrading process. For this, you can use <a href="activity">activity</a>.</p>
<p>A fully upgraded Yamato at level 20 is a monster of a ship – a true wonder of the universe. However, to get there, you will need to spend a lot of Stardust and other resources. So chose wisely, if it is better to upgrade many Yamatos to a lower Tier or just one to a high Tier – both strategies might be successful.</p>


<br>
<br>
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
    <script src="./js/planetshowcase.js?ver=<?php echo $config['version'] ?>"></script>
    <script src="./js/overview.js?ver=<?php echo $config['version'] ?>"></script>
    <script src="./js/stardust.js?ver=<?php echo $config['version'] ?>"></script>
    <script type ="text/javascript">
      window.onload = function what(){
        GetMyPlanets();
      };
    </script>    
  
</body></html>