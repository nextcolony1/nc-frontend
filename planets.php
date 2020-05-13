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
    
    <title>All Planets</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">

<h2><a href="/planets"><b>All Planets</b></a> / <a href="/myplanets">My Planets</a></h2>

<!-- All Planet Filter -->
<?php include "include/nav_planetfilter.html" ?>
<!-- Hier nichts einfügen -->
</div>

<div class="content" id="myplanet">



</div>


<nav>
  <div class="text-center">
    <ul class="pagination" style="margin:0px">
      <li>
        <a id="pagi_back" onclick="PlanetPagi('back')" aria-label="Zurück">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
        <li class="active" id="pagi_1" onclick="PlanetPagi(1)"><a>1</a></li>
        <li id="pagi_2" onclick="PlanetPagi(2)"><a>2</a></li>
        <li id="pagi_3" onclick="PlanetPagi(3)"><a>3</a></li>
        <li id="pagi_4" onclick="PlanetPagi(4)"><a>4</a></li>
        <li id="pagi_5" onclick="PlanetPagi(5)"><a>5</a></li>
        <li id="pagi_6" onclick="PlanetPagi(6)"><a>6</a></li>
        <li id="pagi_7" onclick="PlanetPagi(7)"><a>7</a></li>
        <li id="pagi_8" onclick="PlanetPagi(8)"><a>8</a></li>
        <li id="pagi_9" onclick="PlanetPagi(9)"><a>9</a></li>
        <li id="pagi_10" onclick="PlanetPagi(10)"><a>10</a></li>
      <li>
        <a id="pagi_next" onclick="PlanetPagi('next')" aria-label="Weiter">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
    <p id="pagi_loading" style="margin:0px"></p>
  </div>
</nav>


<br>

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
        LoadAllPlanets();
      };
    </script>    
  
</body></html>