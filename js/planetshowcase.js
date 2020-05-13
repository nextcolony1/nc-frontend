var idd = window.location.pathname.split('/')[2];
var path = window.location.pathname.split('/')[1];

var tmp_txt = "";

var showcasejsn;
var showcaseID;
var showcasename;

var selltext = "";

if(!username){
    var username = getCookie("user");
    var access = getCookie("access");
}
var owner;
var regex = /^([a-zA-Z0-9.#_-]+)$/;

var ischangingname = false;

var planetrawjson = "";

if(path == "planet"){
    if(idd == null){
        window.location.href = "/overview";
    }
    loadPlanetShowcase(idd,path);
}
if(path == "overview"){
    loadPlanetShowcase(planetid,path);
    ChangePlanetshowcase();
}

function ChangePlanetshowcase(){
    if(path == "overview"){
        OnPlanetChange(function(err,res){
            if(res){
                //loadFleetMissions();
                loadPlanetShowcase(planetid,"overview");
                ChangePlanetshowcase();
            }
        },'showcase');
    }
}

function SetBurnData(json,bonus,type) 
{
    var njson = {};
    $.ajax({
        url: apiServer +'/burnrates',
        type: 'GET',
        data: njson,
        success: function(njson) {
            var sd = 0;

            var nbonus, ntype;
            //bonus
            if(json.planet_rarity == "common"){
                nbonus = 1;
            }
            if(json.planet_rarity == "uncommon"){
                nbonus = 2;
            }
            if(json.planet_rarity == "rare"){
                nbonus = 3;
            }
            if(json.planet_rarity == "legendary"){
                nbonus = 4;
            }

            //type
            if(json.planet_type == "earth"){
                ntype = 1;
            }
            if(json.planet_type == "coal"){
                ntype = 2;
            }
            if(json.planet_type == "ore"){
                ntype = 3;
            }
            if(json.planet_type == "copper"){
                ntype = 4;
            }
            if(json.planet_type == "uranium"){
                ntype = 5;
            }

            njson.forEach(data => {
                if(data.bonus == nbonus.toString() && data.planet_type == ntype.toString()){
                    sd = data.burnrate / 1e8;
                }
            });

            console.log(json,bonus,type,sd);
            $('#burninfo').html('<b>'+json.planet_name+'</b> - ID '+json.planet_id+'<br>'+bonus+' '+type+' ['+json.planet_corx+'/'+json.planet_cory+']<br>You will receive: <b>'+sd+' Stardust</b>')
        }
    })
}

function loadPlanetShowcase(id,path){
    var njson = {};
    njson['id'] = id;
    showcaseID = id;

    console.log('Load Showcase');

    $.ajax({
        url: apiServer +'/loadplanet',
        type: 'GET',
        data: njson,
        success: function(msg) {
            try {
                var json = msg;
                showcasejsn = json;
            } catch(e) {
                if(path == "planet"){
                    window.location.href = "/404";
                }
            }

            LoadOwnerPlanets(json.user);

            console.log(json.planet_name);

            //Planet Misc
            planet_type = json.planet_type;
            planet_bonus = json.planet_bonus;
            
            //Translate DB
            var type,bonus;
            if(json.planet_type == "earth"){
                type = "Atmosphere";
            }else{
                type = json.planet_type.charAt(0).toUpperCase()  + json.planet_type.slice(1);
            }
            
            bonus = json.planet_rarity.charAt(0).toUpperCase() + json.planet_rarity.slice(1);
            if(bonus == "Undefined"){
                bonus = "Common";
            }

            document.title = json.planet_name;

            $('#planet_name').text(json.planet_name);
            document.getElementById("planet_img").src = "/img/planets/"+json.img;
            if(path == "planet"){
                document.getElementById("planet_detail").innerHTML = "# "+id+" / "+bonus+" / "+type;
            }else{
                $('#planet_id').text(planetid);
                document.getElementById("planet_detail").innerHTML = bonus+" "+type+" / Position: ["+json.planet_corx+"/"+json.planet_cory+"]";
            }

            //Date Logic
            //var date = new Date(json.planet_crts*1000).toLocaleDateString();
            var date = moment(json.planet_crts*1000).format('LL');
            $('#planet_date').text(date);

            var text = "";
            //Text Builder
            if(tmp_txt == ""){
                tmp_txt = ""//document.getElementById('detail_info').innerHTML;
            }
            text = tmp_txt;
            text = replaceAll(text,'totalbonus_',json.total_type);
            text = replaceAll(text,'bonus_',bonus);
            text = replaceAll(text,'type_',type);
            text = replaceAll(text,'owner_',json.user);
            text = replaceAll(text,'corx_',json.planet_corx);
            text = replaceAll(text,'cory_',json.planet_cory);
            text = replaceAll(text,'id_',id);
            text = replaceAll(text,'date_',date);
            //document.getElementById('detail_info').innerHTML = text;

            if(path == "overview"){
                document.getElementById('planet_view').href = "/planet/"+id;
            }

            //Short Text Builder
            if(path == "planet"){
                var text = document.getElementById('short_info').innerHTML;
                text = replaceAll(text,'type_',type);
                text = replaceAll(text,'owner_',json.user);
                text = replaceAll(text,'corx_',json.planet_corx);
                text = replaceAll(text,'cory_',json.planet_cory);
                document.getElementById('short_info').innerHTML = text;
            }

            //Sell Info
            if(selltext == ""){
                selltext = $('#sellinfo').html();
            }
            var sell = selltext.replace("name_",json.planet_name).replace("ref_","/planet/"+json.planet_id)
                               .replace("id_",json.planet_id).replace("corx_",json.planet_corx).replace("cory_",json.planet_cory)
                               .replace("username_",username).replace("rare_",bonus).replace("type_",type).replace("discovered_",date);
            $('#sellinfo').html(sell)

            SetBurnData(json,bonus,type);

            showcasename = json.planet_name;
            owner = json.user;
            if(owner != username){
                $('#renameinibtn').text("");
                $('#giftplanetbtn').text("");
            }else{
                $('#renameinibtn').text("Rename");
                $('#renameinibtn').click(function(){
                    ShowRenameModal();
                });

                $('#giftplanetbtn').unbind("click");
                $('#burnplanetbtn').unbind("click");


                if(json.startplanet == 0){
                    if (json.for_sale == 0) {
                        $('#giftplanetbtn').click(function(){
                            SendGiftModal(showcaseID,"","giftplanet");
                        });
                        $('#giftplanetbtn').text("Gift"); 
                        $('#psign').text(" / ");
                        //Burn
                        $('#pssign').text(" / ")
                        $('#burnplanetbtn').text("Burn"); 
                        $('#burnplanetbtn').click(function(){
                            BurnPlanetModal(showcaseID);
                        });
                        //Sell
                        $('#psssign').text(" / ")
                        $('#sellplanetbtn').text("Sell"); 
                        $('#sellplanetbtn').unbind();
                        $('#sellplanetbtn').click(function(){
                            SellPlanetModal(showcaseID);
                        });
                    } else {
                        $('#psign').text("");
                        $('#giftplanetbtn').text(""); 
                        $('#pssign').text("")
                        $('#burnplanetbtn').text(""); 
                        $('#psssign').text("")
                        $('#sellplanetbtn').text(""); 
                    }
                }else{
                    $('#giftplanetbtn').click(function(){
                        RespawnModal(showcaseID);
                    });
                    $('#giftplanetbtn').text("Respawn"); 
                    $('#psign').text(" / ");
                    $('#pssign').text("")
                    $('#burnplanetbtn').text(""); 
                }

                $('#renamemodalbtn').text("Rename");
            }

            console.log(json)

            
            console.log($('#planet_name').text())
        }
    });
}

var isBurning = false;
function BurnPlanetModal(id){
    $('#BurnPlanetModal').modal('show');
    CheckOutgoingMission(function(err,res){
        if(!isBurning){
            $('#benow').text("Burn planet now");
        }
        if(!res){
            $('#benow').unbind("click");
            $('#benow').click(function() {
                Burn(id);
            });
        }else{
            $('#benow').attr('disabled',true);
        }
    },id);
}

function Burn(id){
    $('#benow').attr('disabled',true);
    $('#benow').html('<img src="./img/loading.gif" height="15px" />');

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "burn";
    scCmd['tr_var1'] = id.toString();
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);

    CustomJsonHandler(username,sc2app,njson,function(res,err){
        isBurning = true;
        console.log(res,err);
        var njson = {};
        njson['id'] = showcaseID;
        MakeAPhonecall(apiServer + '/loadplanet',njson,showcasejsn,function(err,res){
            isBurning = false;
            $('#BurnPlanetModal').modal('hide');
            $('#benow').prop("disabled",false);
            if(path == "overview"){
                loadPlanetShowcase(showcaseID,"overview");
                ChangePlanetshowcase();
                GetMyPlanets();
            }
        },'GET','abandoned')
    });
}

var isSelling = false;
var outgoingmission = false;
function SellPlanetModal(id){
    $('#SellPlanetModal').modal('show');

    //Set Data

    //Check Missionss
    CheckOutgoingMission(function(err,res){
        outgoingmission = res;
        $('#sellnow').unbind();
        if(!res){
            $('#sellnow').attr('disabled',true);
        }else{
            $('#sellnow').attr('disabled',true);
        }
        $('#sellsd').unbind();
        $('#sellsd').on('input', function () {
            this.value = this.value.match(/^\d+\.?\d{0,3}/);
            if(!outgoingmission){
                $('#sellnow').unbind();
                if(this.value > 0){
                    $('#sellnow').click(function(){
                        SellPlanet(id);
                    })
                    $('#sellnow').attr('disabled',false);
                }else{
                    $('#sellnow').attr('disabled',true);
                }
            }
        });
    },id);
}

function SellPlanet(id){
    $('#sellnow').attr('disabled',true);
    $('#sellnow').html('<img src="./img/loading.gif" height="15px" />');

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "ask";
    scCmd['tr_var1'] = "planet";
    scCmd['tr_var2'] = id.toString();
    scCmd['tr_var3'] = parseFloat($('#sellsd').val());
    scCmd['tr_var4'] = "nextcolony";
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);

    CustomJsonHandler(username,sc2app,njson,function(res,err){
        isSelling = true;
        console.log(res,err);
        var njson = {};
        njson['id'] = showcaseID;
        MakeAPhonecall(apiServer + '/loadplanet',njson,showcasejsn,function(err,res){
            isSelling = false;
            $('#SellPlanetModal').modal('hide');
            $('#sellnow').prop("disabled",false);
            $('#sellnow').html("Confirm")
            if(path == "overview"){
                loadPlanetShowcase(showcaseID,"overview");
                ChangePlanetshowcase();
                GetMyPlanets();
            }
        },'GET','for_sale')
    });
}


var isRespawning = false;
function RespawnModal(id){
    $('#renow').attr('disabled',true);
    $('#RespawnPlanetModal').modal('show');
    CheckOutgoingMission(function(err,res){
        if(!isRespawning){
            $('#renow').text("Respawn now");
        }
        if(stardustb >= 1000){$('#nesr').css('display','none')};

        if(stardustb >= 1000 && !res){
            $('#renow').attr('disabled',false);
            $('#renow').unbind("click");
            $('#renow').click(function() {
                Respawn(id);
            });
        }else{
            $('#renow').attr('disabled',true);
        }
    },id);
}

function Respawn(id){
    $('#renow').attr('disabled',true);
    $('#renow').html('<img src="./img/loading.gif" height="15px" />');

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "respawn";
    scCmd['tr_var1'] = id.toString();
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);

    CustomJsonHandler(username,sc2app,njson,function(res,err){
        isRespawning = true;
        console.log(res,err);
        var njson = {};
        njson['id'] = showcaseID;
        MakeAPhonecall(apiServer + '/loadplanet',njson,showcasejsn,function(err,res){
            isRespawning = false;
            $('#RespawnPlanetModal').modal('hide');
            $('#renow').prop("disabled",false);
            if(path == "overview"){
                loadPlanetShowcase(showcaseID,"overview");
                ChangePlanetshowcase();
                GetMyPlanets();
            }
        },'GET','abandoned')
    });
}

function LoadOwnerPlanets(owner){
    var json = {};
    json['user'] = owner;
    $.ajax({
        url: apiServer + '/loadplanets',
        type: 'GET',
        data: json,
        success: function(msg) {
            planetrawjson = msg;
        }
    });
}

// RENAME LOGIC
var TypedPlanetName;

function ShowRenameModal(){
    $('#RenamePlanetModal').modal('show');
    $('#renameinp').attr('placeholder',showcasename);
    $('#renamebtn').html('Save');
    $('#renamebtn').prop("disabled",true);
}

function RenameFilter(evt){
    var name = evt.srcElement.value + evt.key;
    
    var theEvent = evt || window.event;

    if(evt.srcElement.value.length == 1){
        $('#renamebtn').prop("disabled",true);  
    }
    if(theEvent.key == "Backspace"){
        return;
    }

    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }

    var curChar;
    if(evt.key.length > 1){
        curChar = " ";
    }else{
        curChar = evt.key;
    }
    
    if(name.length <= 20){
        var regex = /^([a-zA-Z0-9.#_-]+)$/;
        if(theEvent.key != "Backspace"){
            if(!regex.test(curChar)) {
                theEvent.returnValue = false;
                if(theEvent.preventDefault) theEvent.preventDefault();
            }else{
                TypedPlanetName = name;
                if(!ischangingname){
                    $('#renamebtn').prop("disabled",false);
                }
            }
        }
    }else{
        theEvent.preventDefault(); 
    }
}

function RenamePlanet(){
    TypedPlanetName = $('#renameinp').val();

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "renameplanet";
    scCmd['tr_var1'] = showcaseID.toString();
    scCmd['tr_var2'] = TypedPlanetName;
    scJson['command'] = scCmd;

    if(TypedPlanetName == "" || !regex.test(TypedPlanetName)){
        return;
    }
    ischangingname = true;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);

    $('#renamebtn').prop("disabled",true);
    if(path == "overview"){
        $('#renamebtn').html('<img src="./img/loading.gif" height="15px" />');
    }else{
        $('#renamebtn').html('<img src="../img/loading.gif" height="15px" />');
    }

    CustomJsonHandler(username,sc2app,njson,function(res,err){
        console.log(res,err);
        var njson = {};
        njson['id'] = showcaseID;
        MakeAPhonecall(apiServer + '/loadplanet',njson,showcasejsn,function(err,res){
            ischangingname = false;
            $('#RenamePlanetModal').modal('hide');
            $('#renamebtn').prop("disabled",false);
            $('#renamebtn').html('Save');
            $('#renameinp').val('');
            if(path == "overview"){
                //loadFleetMissions();
                loadPlanetShowcase(showcaseID,"overview");
                ChangePlanetshowcase();
                GetMyPlanets();
            }
            if(path == "planet"){
                loadPlanetShowcase(idd,path);
                $('#planet_name').text(TypedPlanetName);
            }
        },'GET','planet_name')
    });
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

//loadPlanet();