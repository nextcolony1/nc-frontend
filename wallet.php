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
      <h2><a href="wallet"><b>Wallet</b></a> / <a href="wallet_ranking">Ranking</a></h2>
      </div>

<div class="content">


<div class="panel panel-default">
  <div class="panel-body">
    <div class="row">
        <div class="col-md-3"><img src="img/stardust.png" width="200px" style="margin:0 0 30px 0;"></div>
        <div class="col-md-9"><div style="font-size:20px;margin:0 0 6px 0;">Stardust</div>

        <p>Stardust is an in-game token that you can earn while playing. Explore the galaxy and earn <a target="_blank" href="https://guide.nextcolony.io/reward">rewards</a>.<br><br>
        
        Your Balance: <span class="stardust"><span id="sd_balance"></span> Stardust</span><br>
        Your Balance (<a href="https://steem-engine.com/?p=market&t=STARDUST" target="_blank">Steem Engine</a> <img src="img/icons/link.png" width="13px" height="13px" style="margin:-2px 0 0 0;">): <span class="stardust" id="se_sd">0 Stardust</span><br><br>Token name: Stardust<br>Symbol: STARDUST<br>Total Supply: <span class="stardust"><span id="sd_supply"></span> Stardust</span></p>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:16px 0 14px 0;"></div><p><a href=""  data-toggle="modal" data-target="#InfoStardustModal">Info</a> / <a onclick="OpenSDModal()">Transfer</a> / <a onclick="ConvertSDModal()">Convert</a></p></div>
    </div>
  </div>
</div>

<br>

<p>Transactions:</p>

<br>

  <table class="table" id="trsd">
    <thead>
    <tr>
      <td><b>Date</b></td>
      <td><b>From</b></td>
      <td><b>To</b></td>
      <td><b>Type</b></td>
      <td><b>Amount</b></td> 
      <td><b>Transaction</b></td>
    </tr>
    </thead>
  </table>

<a onclick="LoadHistory()" id="lmsd" style="text-align:center;display:none">Load more</a>
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
    <script src="./js/stardust.js"></script>
    <script type ="text/javascript">
      window.onload = function what(){
        GetMyPlanets();
      };
    </script>    
  
</body></html>