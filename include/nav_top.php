<!--PHP Action-->
<?php include($_SERVER['DOCUMENT_ROOT'] . '/game/misc/maintenance.php'); ?>

<link href="./css/animate.css" rel="stylesheet">
<script src="./js/jquery.js"></script>
<script src="./js/jquery.cookie.js"></script>
<script type="text/javascript" src= "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore.js"></script> 
<script src="./js/moment.js"></script>
<script src="./js/misc.js?ver=<?php echo $config['version'] ?>"></script>
<script src="./js/sc3.js?ver=<?php echo $config['version'] ?>"></script>
<script src="./js/sc2init.js?ver=<?php echo $config['version'] ?>"></script>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="true" aria-controls="navbar">
            <span class="sr-only">Navigation ein-/ausblenden</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand headerfix-brand" href="/overview"><b>Next</b>Colony</a>
        </div>
        <!--Start Nav-->
        <?php if(isset($_COOKIE['access'])) {
        echo '
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a class="headerfix-fa tooltips_top" href="/production" id="qyt_coal">0 C</a></li>
            <li><a class="headerfix-a tooltips_top" href="/production" id="qyt_ore">0 Fe</a></li>
            <li><a class="headerfix-a tooltips_top" href="/production" id="qyt_copper">0 Cu</a></li>
            <li><a class="headerfix-a tooltips_top" href="/production" id="qyt_uranium">0 U</a></li>
            <li><a href="wallet" id="qyt_stardust" class="tooltips_top" style="color:#72bcd4;">0 SD<span style="text-shadow:none;"><b>Stardust</b><br>Earn In-game tokens while playing</span></a></li>

            <li class="dropdown">
                <a class="dropdown-toggle headerfix-a" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img id="nav_curimg" src="img/planets/co_atm_1.png" width="18" height="18" style="border-radius:100px" /><p style="display:inline" id="nav_curplanet">loading...</p><span class="caret"></span></a>
                <ul class="dropdown-menu">
                <li><a href="buildings">Buildings</a></li>
                <li><a href="shipyard">Shipyard</a></li>
                <li><a href="fleet">Fleet</a></li>
                <li><a href="fleet_missions">Missions</a></li>
                <li><a href="galaxy">Galaxy</a></li>
                <li><a href="production">Production</a></li>
                </ul>
            </li>

            <li class="dropdown">
                <a class="dropdown-toggle headerfix-a" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Switch<span class="caret"></span></a>
                <ul class="dropdown-menu" id="nav_planets">
                <li><a href="#" id="nav_planet0">Planet A</a></li>
                <li><a href="#">All Planets</a></li>
                </ul>
            </li>
              
            <li class="dropdown" id="loginsuccess-nav">
                <a class="dropdown-toggle" id="nav-user" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="img/profilbild.png" width="18" height="18" style="border-radius:100px" />loading...<span class="caret"></span></a>
                <ul class="dropdown-menu">
                <li><a href="skills">Skills</a></li>
                <li><a href="buffs">Buffs</a></li>
                <li><a href="items">Items</a></li>
                <li><a href="market">Market</a></li>
                <li><a href="shop">Shop</a></li>
                <li><a href="wallet">Wallet</a></li>
                <li><a href="season">Season</a></li>
                <li><a href="ranking">Ranking</a></li>
                <li><a href="planets">Planets</a></li>
                <li><a href="activity">Activity</a></li>
                <li><a target="_blank" href="https://guide.nextcolony.io/">Guide</a></li>
                <li><a href="#" onclick="Logout()">Logout</a></li>
                </ul>
            </li>
          </ul>
        </div>
        <!--End Nav-->
        ';} ?>
      </div>
    </nav>



<script src="./js/user.js?ver=<?php echo $config['version'] ?>"></script>
<?php if(isset($_COOKIE['access'])) {
echo '
  <script src="./js/getqyt.js?ver='.$config['version'].'"></script>
  <script src="./js/planets.js?ver='.$config['version'].'"></script>
  <script src="./js/upgrade.js?ver='.$config['version'].'"></script>
  <script src="./js/translator.js?ver='.$config['version'].'"></script>
  <script src="./js/gift.js?ver='.$config['version'].'"></script>
';} ?>