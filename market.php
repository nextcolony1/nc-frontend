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
    
    <title>Market</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
    <div class="page-header">

    <h2><a id="market_header"><b>Market</b></a></h2>
    <div style="float: right!important; margin-top: -30px;"><span style="color:rgba(255, 255, 255, 0.40);"><span id="totalsell">0</span> Items, Ships &amp; Planets for sale</span></div>
    </div>

<div class="content">

<div style="margin: 0 0 24px 0;">
<form class="form-inline">
  <div class="form-group">
   <select id="category_filter" class="form-control input-sm" style="background-color:transparent;color:fff;">
       <option value="all">Category: All</option>
       <option value="ship">Ships</option>
       <option value="item">Items</option>
       <option value="planet">Planets</option>
   </select>
  </div>
  <div class="form-group">
   <select id="subcategory_filter" class="form-control input-sm" style="background-color:transparent;color:fff;">
       <option>Subcategory: All</option>
   </select>
  </div>
  <div class="form-group">
   <select id="type_filter" class="form-control input-sm" style="background-color:transparent;color:fff;">
       <option>Type: All</option>
   </select>
  </div>
  <div class="form-group">
    <input id="user_filter" class="form-control input-sm" style="background-color:transparent;color:fff;" placeholder="All">
  </div>
  <button type="button" id="me_btn" class="btn btn-sm btn-primary">Me</button>
  <button type="button" id="all_btn" class="btn btn-sm btn-primary">All</button>
  <button type="button" id="refresh_btn" class="btn btn-sm btn-primary"><img src="img/icons/refresh.png" width="13px" height="13px"></button>
  <div class="form-group" style="float:right!important;">
    <span class="infocolor"><a id="market_history_btn" class="infocolor">History</a></span>
  </div>
</form>
</div>


<div id="market_row" class="row">
</div>

<table style="display:none" id="market_history" class="table">
    <thead>
    <tr>
      <td><b>Date</b></td>
      <td><b>Category</b></td>
      <td><b>Subcategory</b></td>
      <td><b>Type</b></td>
      <td><b>Location</b></td>
      <td><b>Seller</b></td>
      <td><b>Stardust</b></td>
    </tr>
    </thead>
    <tbody id="market_history_tbody">
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
    <script src="./js/market.js?ver=<?php echo $config['version'] ?>"></script>
    
  
</body></html>