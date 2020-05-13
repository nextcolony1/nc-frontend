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
    
    <title>My Items</title>
    
  </head>

  <body>

    <header id="header">
        <?php include "include/nav_top.php" ?>
    </header>
    <div class="container theme-showcase">
	  
    <div class="page-header">

      <h2><a href="" class="steem-keychain-checked">Activity</a></h2>

      <!-- Sub-Navigation -->
      <div style="float: right!important; margin-top: -32px;">

          <div class="btn-group" style="margin:0 0 0 10px;">
          <div class="dropdown">
            <a class="dropdown-toggle infocolor" id="activitynav" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span>Activity</span>
            <span class="caret"></span>
            </a>
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="activitynav">
              <li><a href="activity" class="steem-keychain-checked">Activity</a></li>
              <li><a href="battlefeed" class="steem-keychain-checked">Recent Battles</a></li>
            </ul>
          </div>
          </div>

      </div>
      <!-- End Sub-Navigation -->

      </div>

<div class="content">

  <div style="margin: 0 0 24px 0;">
  <form class="form-inline">
    <div class="form-group">
      <input id="usera" class="form-control input-sm" style="background-color:transparent;color:fff;" placeholder="All">
    </div>
    <div class="form-group">
    <select id="activity_options" class="form-control input-sm" style="background-color:transparent;color:fff;">
        <option>All Commands</option>
        <option>Explore</option>
        <option>Transport</option>
        <option>Deploy</option>
        <option>Support</option>
        <option>Attack</option>
        <option>Siege</option>
        <option>Break Siege</option>
        <option>Build Ship</option>
        <option>Upgrade</option>
        <option>Enhance</option>
        <option>Activate</option>
        <option>Gift Item</option>
        <option>Gift Planet</option>
        <option>Rename Planet</option>
        <option>Cancel</option>
        <option>Enable</option>
        <option>Charge</option>
        <option>New User</option>
        <option>Transfer Stardust</option>
        <option>Issue</option>
        <option>Issue Stardust</option>
        <option>New Season</option>
        <option>Upgrade Yamato</option>
        <option>Ask</option>
        <option>Cancel Ask</option>
        <option>Fill Ask</option>
        <option>Burning</option>
        <option>Respawn</option>
        <option>Buff</option>
    </select>
    </div>
    <button id="me_btn" type="button" class="btn btn-sm btn-primary">Me</button>
    <button id="all_btn" type="button" class="btn btn-sm btn-primary">All</button>
  </form>
  </div>

  <table class="table">
    <thead>
    <tr>
      <td><b>Date</b></td>
      <td><b>User</b></td>
      <td><b>Command</b></td>
      <td><b>Status</b></td>
      <td style="display:none" id="planet_header"><b>Planet</b></td>
      <td><b>Transaction</b></td>
    </tr>
    </thead>
    <tbody id="activity_tb">
    </tbody>
  </table>




<?php include "include/footer.php" ?>

<?php include "include/modal.php" ?>

        
      </div></div> <!-- /container -->


    <!-- Bootstrap-JavaScript
    ================================================== -->
    <!-- Am Ende des Dokuments platziert, damit Seiten schneller laden -->
    <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/marketFilter.js?ver=<?php echo $config['version'] ?>"></script>
    <script src="./js/activity.js?ver=<?php echo $config['version'] ?>"></script>
  
</body></html>