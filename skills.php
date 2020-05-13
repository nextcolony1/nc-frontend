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
    
    <title>Skills</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">
        <h2>Skills</h2>
      </div>

<div class="content">


<!-- /profile -->

<div class="row">

  <div class="col-md-3"><img id="skill_prof" src="" height="170px" class="img-rounded" style="margin:0 0 20px 0;"></div>

  <div class="col-md-9"><p>Choose your skills carefully and according to your strategy. Skills are on an account level. Once a skill has been learned, you can use it on any planet. To enhance a skill, choose ones and click "Enhance now". There will be more skills available later in the game, for example guild skills and special skills.</p>
      
  <br>

  <p>Meta-Skill Level:</p>
  <div class="progress"><div class="progress-bar progress-bar-metaskill" id="meta_level" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 0%;min-width: 2.5em;">lvl.</div></div>

  <br>

  <p style="font-size:18px;margin:40px 0 10px 0;">Building Skills</p>
  <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:0 0 20px 0;"></div>

  <div id="building_skills">
  </div>

  <p style="font-size:18px;margin:40px 0 10px 0;">Research Skills</p>
  <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:0 0 20px 0;"></div>

  <div id="booster_skills">
  </div>

  <p style="font-size:18px;margin:40px 0 10px 0;">Ship Skills</p>
  <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:0 0 20px 0;"></div>

  <div id="ships_skills">
  </div>

  <p style="font-size:18px;margin:40px 0 10px 0;">Commander Skills</p>
  <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:0 0 20px 0;"></div>

  <div id="commander_skills">
  </div>
</div>
</div>

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
    <script src="./js/skills.js?ver=<?php echo $config['version'] ?>"></script>
  
</body></html>