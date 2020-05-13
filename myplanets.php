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
    
    <title>My Planets</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">

<h2><a href="planets">All Planets</a> / <a href="myplanets"><b>My Planets</b></a></h2>

<!-- My Planet Filter -->
<?php include "include/nav_planetfilter.html" ?>
<!-- Hier nichts einfügen -->
</div>

<div class="content" id="myplanet">



</div>

<?php include "include/footer.php" ?>

<?php include "include/modal.php" ?>

</div> <!-- /container -->


    <!-- Bootstrap-JavaScript
    ================================================== -->
    <!-- Am Ende des Dokuments platziert, damit Seiten schneller laden -->
    <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/planetpage.js?ver=<?php echo $config['version'] ?>"></script>
    <script type ="text/javascript">
      window.onload = function what(){
        LoadMyPlanets();
      };
    </script>    
  
</body></html>