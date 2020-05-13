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
    
    <title>Production</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
      <div class="page-header">
        <h2>Production (<span id="planetname"></span>)</h2>
      </div>

<div class="content">


<div id="production_content">

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
    <script src="./js/production.js?ver=<?php echo $config['version'] ?>"></script>
    <script type ="text/javascript">
      $(function () {
        $('[data-toggle="popover"]').popover()
      })
    </script>    
  
</body></html>