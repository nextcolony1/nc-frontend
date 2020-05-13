<?php
	if (isset($_COOKIE['planetid'])) {
		unset($_COOKIE['planetid']);
		setcookie('planetid', '', time() - 3600, '/'); 
	}
?>

<!--  HTML  -->

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
    
    <title>Connecting...</title>
    
  </head>

  <body>


<div class="content">

<div style="text-align:center;margin:210px 0 0 0;">

<p>Connecting...<br><img src="img/loading_start.gif"></p>

</div>



        
</div> <!-- /container -->


    <!-- Bootstrap-JavaScript
    ================================================== -->
    <!-- Am Ende des Dokuments platziert, damit Seiten schneller laden -->
    <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
  
</body></html>




<!--   SCRIPT    -->
<script src="js/jquery.js"></script>
<script src="/js/sc3.js"></script>
<script src="/js/sc2init.js"></script>
<script src="/js/misc.js?ver=<?php echo $config['version'] ?>"></script>

<script>
	var auth = "<?php echo $_GET['access_token'] ?>";
	var json = {};
	
	var user = "";
	
	api.setAccessToken(auth);
	
	api.me(function (err, res) {
		if(res){
			json['user'] = res.user;
			user = res.user;
			console.log(res);
			Auth();
		}else{
			console.log(err);
			window.location.href = "/";
			document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		}
	});
	
	
	function Auth(){
		$.ajax({
			url: apiServer+'/loaduser',
			type: 'GET',
			data: json,
			success: function(msg) {
				console.log(msg);
				NewAuth(msg);
			},
			error: function(msg) {

			}
		});
	}

	function NewAuth(msg){
		var scJson = {};
		var scCmd = {};
		scJson['username'] = user;
		scJson['type'] = "newuser";
		scCmd['tr_var1'] = user;
		scJson['command'] = scCmd;

		console.log(auth)
		console.log(user);
		api.setAccessToken(auth);
		var njson = JSON.stringify(scJson);

		if(msg === undefined || msg.length == 0){
			CustomJsonHandler(user,sc2app,njson,function(res,err){
				var json = {};
				json['user'] = user;
				MakeAPhonecall(apiServer + '/loaduser',json,[],function(err,res){
					Login();
				},'GET');
			});
		}else{
			Login();
		}
	}

	function Login(){
		document.cookie = "planetid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		document.cookie = "access="+auth+"; expires=Thu, 01 Jan 2970 00:00:00 UTC;";
		document.cookie = "user="+user+"; expires=Thu, 01 Jan 2970 00:00:00 UTC;";
				
		var path = getCookie("loginpage");
		if(path == ""){	
			window.location.href = "/overview";
		}else{
			window.location.href = path;
		}
	}
	
	function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


</script>