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
    
    <title>Season</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">
      <h2><a href="season"><b>Season</b></a> / <a href="season_hof">Hall of Fame</a></h2>
      </div>

        <div id="content" class="content">
        <div style="display: block;">

        <p><img src="img/ships/yamato.png" width="180px" style="float:right; margin:10px 0 30px 30px;">Earn reward points by upgrading/defending your Yamato <b>or</b> by attacking (downgrading) Yamato's of your enemies. Your reward points are converted into STEEM, Items and Stardust at the end of each season.</p>
        <div style="font-size:21px; margin: 26px 0 0 0;"><b id="sname">loading..</b></div>
        <p id="sdate"></p>
        <p id="sinfo"></p>
        <p style="color:#5CB85C;" id="stimer"></p>
        <br>
        <table class="table" id="table">
          <thead>
          <tr>
            <td><b>Rank</b></td>
            <td></td>
            <td style="cursor:pointer" ><b>Settler</b></td>
            <td style="cursor:pointer" id="urp"><b>URP</b> <a class="tooltips" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="14px" height="14px" style="margin:-3px 0 0 0;"><span>Upgrade Reward Points</span></a></td>
            <td style="cursor:pointer" id="drp"><b>DRP</b> <a class="tooltips" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="14px" height="14px" style="margin:-3px 0 0 0;"><span>Downgrade Reward Points</span></a></td>
            <td style="cursor:pointer" id="trp"><b>Total RP</b> <a class="tooltips" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="14px" height="14px" style="margin:-3px 0 0 0;"><span>Total Reward Points</span></a></td>
          </tr>
          </thead>
        <br></table>

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
    <script src="./js/production.js?ver=?ver=<?php echo $config['version'] ?>"></script>
    <script src="./js/season.js?ver=?ver=<?php echo $config['version'] ?>"></script>
    <script type ="text/javascript">
      $(function () {
        $('[data-toggle="popover"]').popover()
      })
    </script>    
  
</body></html>