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
    
    <title>Recent Battles</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
    <div class="page-header">
      <h2><a href="" class="steem-keychain-checked">Recent Battles</a></h2>
      <!-- Sub-Navigation -->
      <div style="float: right!important; margin-top: -32px;">

          <div class="btn-group" style="margin:0 0 0 10px;">
          <div class="dropdown">
            <a class="dropdown-toggle infocolor" id="activitynav" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span>Recent Battles</span>
            <span class="caret"></span>
            </a>
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="activitynav">
              <li><a href="activity">Activity</a></li>
              <li><a href="battlefeed">Recent Battles</a></li>
            </ul>
          </div>
          </div>

      </div>
      <!-- End Sub-Navigation -->

      </div>

<div class="content">

<table class="table">
    <thead>
    <tr>
      <td><b>Date</b></td>
      <td><b>Attacker</b></td>
      <td><b>Defender</b></td>
      <td><b>C</b></td>
      <td><b>Fe</b></td>
      <td><b>Cu</b></td>
      <td><b>U</b></td>
      <td><b>Result</b></td>
    </tr>
    </thead>
    <tbody id="battle_table">
    </tbody>
  </table>

  <br>


<?php include "include/footer.php" ?>

<?php include "include/modal.php" ?>

        
      </div></div> <!-- /container -->


    <!-- Bootstrap-JavaScript
    ================================================== -->
    <!-- Am Ende des Dokuments platziert, damit Seiten schneller laden -->
    <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/marketFilter.js?ver=<?php echo $config['version'] ?>"></script>
    <script src="./js/battlefeed.js?ver=<?php echo $config['version'] ?>"></script>
  
</body></html>