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
    
    <title>Ranking</title>
    
  </head>

  <body>

<header id="header">
  <?php include "include/nav_top.php" ?>
</header>
<div class="container theme-showcase">

<div class="page-header">

<h2><a href=""><b>Ranking</b></a></h2>

<!-- Filter -->
<div style="float: right!important; margin-top: -32px;">

    <div class="btn-group" style="margin:0 0 0 8px;">
    sort by:
    </div>

    <div class="btn-group" style="margin:0 0 0 10px;">
    <div class="dropdown">
      <a class="dropdown-toggle" style="color:white" id="" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span id="rktg">Production</span>
      <span class="caret"></span>
      </a>
      <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dLabel">
        <li><a href="#" onclick="RenderMode('meta_rate')">Production</a></li>
        <li><a href="#" onclick="RenderMode('destroyed_ships_uranium')">Destroyed Ships</a></li>
        <li><a href="#" onclick="RenderMode('explorations')">Explorations</a></li>
        <li><a href="#" onclick="RenderMode('planets')">Planets</a></li>
        <li><a href="#" onclick="RenderMode('fleet')">Fleet</a></li>
        <li><a href="#" onclick="RenderMode('meta_skill')">Meta-Skill Level</a></li>
      </ul>
    </div>
    </div>

</div>
<!-- Filter End -->

</div>
    

<div class="content">

<div id="ranking_content">

</div>


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
    <script src="./js/ranking.js?ver=<?php echo $config['version'] ?>"></script>
  
</body></html>