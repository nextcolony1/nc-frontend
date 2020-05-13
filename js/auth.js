var access = getCookie("access"); 
var username = getCookie("user"); 

function Login(){
	var link = api.getLoginURL();
	document.cookie = "loginpage="+ "/overview.php" +"; expires=Thu, 01 Jan 2970 00:00:00 UTC;";
	window.location.href = link;
}

function KeychainModal(){
	$('#KeychainLogin').modal('show'); 
	if (steemconnect.useSteemKeychain) {
		$('#keychainBtn').attr('disabled',false);
	}else{
		$('#keychainBtn').attr('disabled',true);
	}
}

$('#keychainUser').on('input', function() {
	var user = $('#keychainUser').val();
	if(user.length > 0 && steemconnect.useSteemKeychain){
		$('#likc').attr('disabled',false);
	}else{
		$('#likc').attr('disabled',true);
	}
});

function LoginKeychain(){
	$('#likc').attr('disabled',true);
	var params = {};

	// The "username" parameter is required prior to log in for "Steem Keychain" users.
	if (steemconnect.useSteemKeychain) {
		var us = $('#keychainUser').val();
		console.log(us);
		params = { username: us };

		if(us.length > 0){
			api.login(params, function(err, token) {
				console.log(err,token);
				if(token){
					access = token;
					api.setAccessToken(access);
					username = params.username;

					var json = {};
					json['user'] = params.username;
					$.ajax({
						url: apiServer+'/loaduser',
						type: 'GET',
						data: json,
						success: function(msg) {
							if(msg['date']){
								document.cookie = "planetid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
								document.cookie = "access="+access+"; expires=Thu, 01 Jan 2970 00:00:00 UTC;";
								document.cookie = "user="+params.username+"; expires=Thu, 01 Jan 2970 00:00:00 UTC;";
								loginSuccess();
							}else{
								setTimeout(function(){
									RegKeychain();
								}, 3000);
							}
						},
						error: function(msg) {
			
						}
					});
				}
				
				if(err){
					$('#likc').attr('disabled',false);
				}
			});
		}else{
			$('#likc').attr('disabled',false);
		}
	}
}

function RegKeychain(){
	$('#likc').attr('disabled',true);
	$('#likc').html('<img src="img/loading.gif" height="15px" />');

	var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "newuser";
    scCmd['tr_var1'] = username;
    scJson['command'] = scCmd;

    api.setAccessToken(access);
	var njson = JSON.stringify(scJson);
	console.log(njson)
    CustomJsonHandler(username,sc2app,njson,function(err,res){
		if(res){
			console.log(err,res);
			var json = {};
            json['user'] = username;
            MakeAPhonecall(apiServer + '/loaduser',json,[],function(err,res){
                if(res){
					document.cookie = "planetid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
					document.cookie = "access="+access+"; expires=Thu, 01 Jan 2970 00:00:00 UTC;";
					document.cookie = "user="+username+"; expires=Thu, 01 Jan 2970 00:00:00 UTC;";
					loginSuccess();
                }else{
					$('#likc').attr('disabled',false);
					$('#likc').html('Registration/Login');
				}
            },'GET');
		}
    });
}

function LoginModal(){
	api.setAccessToken(access);
	api.me(function (err, res) {
		if(!res){
			document.getElementById("LoginModal").style.display = "block";
		}
	});
}

function loginSuccess(){
	window.location.href = '/overview.php';
}

function NotLoggedIn(){
	document.cookie = "planetid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
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

if(access == ""){
	NotLoggedIn();
	Logout();
}else{
	loginSuccess();
	api.setAccessToken(access);
	api.me(function (err, res) {
		console.log(err,res);
		if(res){
			username = res.user;
			loginSuccess();
		}else{
			NotLoggedIn();
			Logout();
			document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		}
	});
}