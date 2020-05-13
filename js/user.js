//document.cookie = "user=oliverschmid";
var access = getCookie("access"); 
var username = getCookie("user"); 

function NotLoggedIn(){
    console.log(window.location.pathname)
    if(window.location.pathname == "/galaxy"){
        $('#navbar').attr('style', 'display: none !important');
        $(function() {
            $('#planetselectg').html("");
            $('#planetselectg').css("display","none");
            $('#cancelund').css("display","unset");
            $('#und_modal_btn').css("display","none");

            $('#cancelmis').css("display","unset");
            $('#modal_mission_btn').css("display","none");
        });
    }else{
        window.location.href = '/';
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

function Logout(){
    document.cookie = "planetid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";  
	document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    username = "";
    planetid = "";
    NotLoggedIn();
}

function SetUserSC(){
    api.setAccessToken(access);
	api.me(function (err, res) {
        if(!res){
			Logout();
		}
	});
}

if(access == ""){
    Logout();
    console.log('test')
}else{
    SetUserSC();
    document.getElementById("nav-user").innerHTML = '<img src="https://steemitimages.com/u/'+username+'/avatar" width="18" height="18" style="border-radius:100px" /> '+username+'<span class="caret"></span>';
}