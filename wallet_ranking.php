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
    
    <title>Stardust</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">
      <h2><a href="wallet">Wallet</a> / <a href="wallet_ranking"><b>Ranking</b></a></h2>
      </div>

<div class="content">

<p>Total Supply:<span class="stardust"> <span id="tstardust"></span> Stardust</span></p>

<br>

  <table class="table" id="sdrk">
    <thead>
    <tr>
      <td><b>Rank</b></td>
      <td><b>Settler</b></td>
      <td><b>Stardust</b></td>
      <td><b>% of supply</b></td>
    </tr>
    </thead>
  </table>

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
    <script src="./js/stardust_ranking.js"></script>
    <script type ="text/javascript">
      window.onload = function what(){
        GetMyPlanets();
      };
    </script>    
  
</body></html>