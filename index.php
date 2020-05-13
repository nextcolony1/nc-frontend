<?php include($_SERVER['DOCUMENT_ROOT'] .'/game/misc/maintenance.php'); ?> 
<!DOCTYPE html>
<html lang="de">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="NextColony is a last days space simulation with RPG elements and tradeable collectibles built on the Steem blockchain.">
    <link href="./css/bootstrap.css" rel="stylesheet">
    <link href="./css/theme.css" rel="stylesheet">
    <link rel="icon" type="image/png" sizes="64x64" href="/img/favicon.png">
    
    <meta name="google-site-verification" content="cTw-yY3Xy0kci6Kd4jpKNmrtiusdUjWD194evERNs2o" />
    
    <meta property="og:url" content="https://nextcolony.io/" />
    <meta property="og:title" content="NextColony" />
	<meta property="og:description" content="Explore undiscovered space, colonize new planets and battle for honor." />
	<meta property="og:image" content="https://nextcolony.io/img/nextcolony.jpeg" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://nextcolony.io/" />
    <meta name="twitter:title" content="NextColony" />
    <meta name="twitter:description" content="Explore undiscovered space, colonize new planets and battle for honor" />
    <meta name="twitter:image" content="https://nextcolony.io/img/nextcolony.jpeg" />

    <title>NextColony | Explore, colonize, battle & collect!</title>

  </head>

  <body>

<!-- Logo / Login -->

<div style="margin-top:30px; margin-bottom:70px; text-align:center;">

<img src="img/nextcolony-icon.png" alt="NextColony Icon" width="90px" height="90px" style="margin:0 0 0 0;">

<div style="color:#ffffff; font-size:72px; margin:0 0 -15px 0;"><b>Next</b>Colony</div>
<p style="color:#ffffff; font-size:21px;">Explore. Colonize. Battle. Collect.</p>
<p style="color:#ffffff; font-size:15px;margin:22px 0 26px 0;">
Explore undiscovered space<br>
Find and colonize new planets<br>
Battle for honor and resources<br>
Trade digital collectibles</p>
<a onclick="KeychainModal()" type="button" class="btn btn-info btn-lg">Click here, to get in the game!</a>
<div style="; color: #fff; font-size:12px; margin:3px 0 0 0;">Registration/Login via SteemConnect or Keychain</div>
<br>
<div style="; color: #fff; font-size:12px;">New to Steem? <a href="https://signup.steemit.com/" target="_blank">Sign up now</a></div>

<br>
<br>
<br>
<br>

<p style="font-size:12px;">© <a href="https://nextcolony.io/" style="color:#ffffff;"><b>Next</b>Colony</a> / <a href="press" style="color:#ffffff;">Press</a> / <a href="https://steemit.com/@nextcolony" target="_blank" style="color:#ffffff;">Steemit</a> / <a href="https://twitter.com/NextColony" target="_blank" style="color:#ffffff;">Twitter</a> / <a href="https://discord.gg/55r9rU2" target="_blank" style="color:#ffffff;">Discord</a></p>

</div>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-135960950-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-135960950-1');
</script>

  <?php include "include/modal.php" ?>


    <!-- Bootstrap-JavaScript
    ================================================== -->
    <!-- Am Ende des Dokuments platziert, damit Seiten schneller laden -->
    <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/sc3.js"></script>
    <script src="./js/sc2init.js"></script>
    <script src="./js/misc.js"></script>
    <script src="./js/auth.js"></script>
    
    <!--<script src="https://widget.steem.ninja/ninja.js"></script>-->

    <!--Steem Pay-->
    <!--<script src="https://cdn.steemjs.com/lib/latest/steem.min.js"></script>
    <script src="./js/sc2.min.js"></script>
    <script src="./js/sc2-pay.min.js"></script>-->
</body>
</html>