var ship_div = "";
var temp_div = "";

var ships = ['yamato','transportship','transportship1','transportship2','transportship3','explorership','explorership1','scout','scout1','scout2','patrol','patrol1','patrol2','cutter','cutter1','cutter2','corvette','corvette1','corvette2','frigate','frigate1','frigate2','destroyer','destroyer1','destroyer2','cruiser','cruiser1','cruiser2','battlecruiser','battlecruiser1','battlecruiser2','carrier','carrier1','carrier2','dreadnought','dreadnought1','dreadnought2'];
var earnships = ['transportship2','scout2','patrol2','cutter2','corvette2','frigate2','destroyer2','cruiser2','battlecruiser2','carrier2','dreadnought2'];

var ships_arr = [];
var left = [];
var buyable = [];

var reloadships = false;
var isUpgrading = false;
var oldJsonships;

var boughtships = [];

var shipyardskill = "";
var yamatospawned = false;

function GetshipDiv(){
    $.ajax({ type: "GET",   
        url: "include/shipyard_div",   
        async: false,
        success : function(html)
        {
            ship_div = html;
            Loadships();
        }
    });
}

function LoadSkills(){

}

function CheckitemsShips(callback){
    var json = {};
    json['user'] = username;
    $.ajax({
        url: apiServer + '/loaditems',
        type: 'GET',
        data: json,
        success: function(njson) {
            njson.forEach(function(data){
                console.log(data)
                if(data.blueprint){
                    boughtships.push(data.blueprint)
                }
            })
            loadshopShips(function(err,res){
                if(res){
                    callback(null,true)
                }
            });
        }
    });
}

function loadshopShips(callback){
    var json = {};
    json['user'] = username;
    $.ajax({
        url: apiServer + '/loadshop',
        type: 'GET',
        data: json,
        success: function(njson) {
            console.log(njson)
            njson.forEach(function(data){
                if(data.blueprint){
                    left[data.blueprint] = data.left;
                    if(data.buyable == 0){
                     buyable[data.blueprint] = 2;
                    }else{
                     buyable[data.blueprint] = data.buyable;
                    }
                }
            })
            callback(null,true)
        }
    });
}

function Loadships(){
    LoadQyt(function(err,res){
        if(res){
            var json = {};
            json['user'] = username;
            json['planet'] = planetid;
            $.ajax({
                url: apiServer + '/planetshipyard',
                type: 'GET',
                data: json,
                success: function(msg) {
                    try {
                        json = msg;
                    } catch (e) {
                        json = [];
                    }
                    console.log("shipyard",msg)

                    ShipyardBuilder(json);
                }
            });
        }
    })
}

function ShipyardBuilder(json){
    oldJsonships = json;
    json.forEach(Item => {
        ships_arr.push(Item);
    });
    PreRenderships();
}


function PreRenderships(){
    OnPlanetChange(function(err,res){
        if(res){
            console.log('change')
            Loadships();
            LoadProductionDiv();
        }
    },'shipyard');
    Renderships();
}


function Renderships(){
    $( "#ships" ).html("");
    for(var i = 0; i < ships.length; i++){
        var cur_obj = null;
		var found_ship = false;
        ships_arr.forEach(function(ship){
            if(ship.type == ships[i]){
                cur_obj = ship;
				found_ship = true;
            }
        });
        if(found_ship){
            var time = msToHMS(cur_obj.costs.time * 1000);
            var enough = true;
            var isship = false;

			name = cur_obj.type
			var attack = '';
			var variant = '';
			if(cur_obj.bullet > 0){
				attack = cur_obj.bullet;
			}
			if(cur_obj.rocket > 0){
				attack = cur_obj.rocket;
			}
			if(cur_obj.laser > 0){
				attack = cur_obj.laser;
			}

			//Image
			var imgID = '';
			imgID = cur_obj.longname.replace(' ','_').toLowerCase();

			//Desc
			var desc = '';
			if(Translate(name+"_desc") == ''){
				desc = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
			}else{
				desc = Translate(name+"_desc");
			}

            temp_div = ship_div;

            if(cur_obj.variant_name == 'civil'){
                variant = capitalize(cur_obj.variant_name);
                temp_div = replaceAll(temp_div,'cvb_',"inline");
			}else{
                variant = capitalize(cur_obj.variant_name)+':';
                temp_div = replaceAll(temp_div,'cvb_',"none");
            }
            

            var typeimg = cur_obj.variant_name;
            //Yamato
                if(cur_obj.variant_name == 'yamato'){
                    temp_div = replaceAll(temp_div,'imgclass_','hovering');
                    //if(cur_obj.activated == true){
                        temp_div = replaceAll(temp_div,'upbard_','block');
                    //}                    
                    temp_div = temp_div.replace("udisplay","block");
                    variant = '';
                    attack = '';

                    //Img
                    temp_div = temp_div.replace("imgw_","330px");
                    temp_div = temp_div.replace("imgs_","5px 0 20px -10px");

                    //Type
                    typeimg = 'bullet'
                    temp_div = replaceAll(temp_div,'attack_',"");

                    var type = '';
                    type += 'Bullet: '+cur_obj.bullet
                    type += ' / <img src="img/icons/rocket.png" width="13px" height="13px" style="margin:0 6px 0 0;">Rocket: '+cur_obj.rocket
                    type += ' / <img src="img/icons/laser.png" width="13px" height="13px" style="margin:0 6px 0 0;">Laser: '+cur_obj.laser
                    temp_div = replaceAll(temp_div,'extratyp_',type);
                }
            //YamatoEnd

            var speedtext = cur_obj.speed;
            console.log(cur_obj.class)
            if(Bufforder.includes(cur_obj.class)){
                speedtext = speedtext + ' / <span class="infocolor"><a class="infocolor" href="buffs">Buffs</a></span>';
            }

			temp_div = replaceAll(temp_div,"id_",cur_obj.type);
			temp_div = replaceAll(temp_div,'ID_',name);
			temp_div = replaceAll(temp_div,'IMGID',imgID);
			temp_div = replaceAll(temp_div,'consumption_',cur_obj.consumption);
			temp_div = replaceAll(temp_div,'speed_',speedtext);
            temp_div = replaceAll(temp_div,'capacity_',cur_obj.capacity);
            temp_div = replaceAll(temp_div,'type_',variant);
            temp_div = replaceAll(temp_div,'typeimg',typeimg);
			temp_div = replaceAll(temp_div,'attack_'," "+attack);
			temp_div = replaceAll(temp_div,'structure_',cur_obj.structure);
			temp_div = replaceAll(temp_div,'armor_',cur_obj.armor);
			temp_div = replaceAll(temp_div,'shield_',cur_obj.shield);
			temp_div = replaceAll(temp_div,'name_',cur_obj.longname);
			temp_div = replaceAll(temp_div,'desc_',desc);
            temp_div = replaceAll(temp_div,"time_",time);
            
            temp_div = replaceAll(temp_div,'class_',cur_obj.class);

            //Shipyard
            var reds = "<span>";
            var redss = "<span>";
            var redk = "<span>";
            if(cur_obj.shipyard_level < cur_obj.shipyard_min_level){
                reds = '<span class="text-dangerq">'
            }

            shipyardskill = cur_obj.shipyard_skill;
            if(!cur_obj.shipyard_skill){
                shipyardskill = 0;
            }

            if(parseInt(shipyardskill) < cur_obj.shipyard_min_level){
                redss = '<span class="text-dangerq">'
            }

            console.log("shipyardskill",shipyardskill);

            //Skill
            if(cur_obj.ship_skill < 20){
                redk = '<span class="text-dangerq">'
            }

            temp_div = replaceAll(temp_div,"sk_",redk+20+"</span>");
            temp_div = replaceAll(temp_div,"sys_",redss+cur_obj.shipyard_min_level+"</span>");
            temp_div = replaceAll(temp_div,"syb_",reds+cur_obj.shipyard_min_level+"</span>");
            
    

            ////Costs
            var CostBuilder;
            if(cur_obj.variant_name == 'yamato'){
                CostBuilder = "Build: ";
            }else{
                CostBuilder = Translate("cost") + ": ";
            }
            CostBuilder += RessourceBuilder(cur_obj.costs.coal,cur_obj.costs.ore,cur_obj.costs.copper,cur_obj.costs.uranium).cost;
            enough = RessourceBuilder(cur_obj.costs.coal,cur_obj.costs.ore,cur_obj.costs.copper,cur_obj.costs.uranium).enough;

            if(!enough){
                /*WaitForEnoughRes(cur_obj.costs.coal,cur_obj.costs.ore,cur_obj.costs.copper,cur_obj.costs.uranium,function(err,res){
                    if(res){
                        Renderships();
                    }
                });*/
            }



            temp_div = replaceAll(temp_div,"cost_",CostBuilder);


            //Ressource Translation
            var res = "";
            var resl = "";
			var show_ship = true;


            ////Upgrade Logic
           if(cur_obj.busy_until > currentUTC){
                isship = true;
                temp_div = temp_div.replace("displaytimer_","block");
                TickTook(cur_obj.type+"timer",cur_obj.busy_until,function(err,res){
                    if(res){
                        AwaitChangeships();
                    }
                });
            }else{
                temp_div = temp_div.replace("displaytimer_","none");
            }

            //Blueprints
            if(cur_obj.activated == false && buyable[cur_obj.type]){
                console.log("curob",buyable[cur_obj.type] )
                if(buyable[cur_obj.type] == 1 && boughtships.includes(cur_obj.type)){
                    temp_div = temp_div.replace("color_","success");
                    temp_div = temp_div.replace("btn_","Activate Blueprint");
                    temp_div = temp_div.replace("bpdp","none");

                    temp_div = temp_div.replace("sbdp","none");
                    temp_div = temp_div.replace("bbdp","none");

                    temp_div = temp_div.replace("onclick_","window.location.href = '/items'");
                    temp_div = temp_div.replace("disabled_","");
                }
                if(buyable[cur_obj.type] == 1 && !boughtships.includes(cur_obj.type)){
                    temp_div = temp_div.replace("color_","info");
                    temp_div = temp_div.replace("btn_","Buy Blueprint");
                    temp_div = temp_div.replace("bpdp","block");

                    temp_div = temp_div.replace("sbdp","none");
                    temp_div = temp_div.replace("bbdp","none");

                    temp_div = temp_div.replace("bpl",left[cur_obj.type]);
                    temp_div = temp_div.replace("onclick_","window.location.href = '/shop'");
                    temp_div = temp_div.replace("disabled_","");
                }
                //Earn
				if(buyable[cur_obj.type] == 2 && !boughtships.includes(cur_obj.type)){
					temp_div = temp_div.replace("color_","primary");
                    temp_div = temp_div.replace("btn_","Earn Blueprint");
                    temp_div = temp_div.replace("bpdp","none");
                    temp_div = temp_div.replace("ibdp","none");

                    temp_div = temp_div.replace("sbdp","none");
                    temp_div = temp_div.replace("bbdp","none");
                    temp_div = temp_div.replace("rbdp","block");

                    temp_div = temp_div.replace("onclick_","window.open('https://guide.nextcolony.io/reward', '_blank')");
                    temp_div = temp_div.replace("disabled_","");
                }
                if(buyable[cur_obj.type] == 2 && boughtships.includes(cur_obj.type)){
                    temp_div = temp_div.replace("color_","success");
                    temp_div = temp_div.replace("btn_","Activate Blueprint");
                    temp_div = temp_div.replace("bpdp","none");

                    temp_div = temp_div.replace("sbdp","none");
                    temp_div = temp_div.replace("bbdp","none");

                    temp_div = temp_div.replace("onclick_","window.location.href = '/items'");
                    temp_div = temp_div.replace("disabled_","");
                }
            }

            if(cur_obj.ship_skill < 20){
                temp_div = temp_div.replace("color_","danger");
                temp_div = temp_div.replace("btn_",Translate('enhance')+" "+cur_obj.class + " Skill");
                temp_div = temp_div.replace("sbdp","block");
                temp_div = temp_div.replace("bbdp","none");
                temp_div = temp_div.replace("onclick_","window.location.href = '/skills'");
                temp_div = temp_div.replace("disabled_","");
            }
			
			if(cur_obj.shipyard_level < cur_obj.shipyard_min_level){
				temp_div = temp_div.replace("color_","danger");
                temp_div = temp_div.replace("btn_","Upgrade Shipyard Building");
                temp_div = temp_div.replace("sbdp","none");
                temp_div = temp_div.replace("bbdp","block");
                temp_div = temp_div.replace("onclick_","window.location.href = '/buildings'");
                temp_div = temp_div.replace("disabled_","");
				
			}

            if(enough){
                temp_div = temp_div.replace("color_","success");
                if(cur_obj.variant_name == 'yamato'){
                    temp_div = temp_div.replace("btn_","Build T-00");
                }else{
                    temp_div = temp_div.replace("btn_","Build");
                }
                if(isship){
                    temp_div = temp_div.replace("disabled_","disabled");
                }else{
                    temp_div = temp_div.replace("disabled_","");
                    temp_div = temp_div.replace("onclick_","BuildShip('"+cur_obj.type+"')");
                }
            }else{
                temp_div = temp_div.replace("color_","default");
                temp_div = temp_div.replace("btn_",Translate('miss_resources'));
                temp_div = temp_div.replace("disabled_","disabled");
            }

            //Img
            temp_div = temp_div.replace("imgw_","280px");
            temp_div = temp_div.replace("imgs_","0 0 20px 0");

            temp_div = temp_div.replace("extratyp_","");
            temp_div = temp_div.replace("bpdp","none");
            temp_div = temp_div.replace("ibdp","none");
            temp_div = temp_div.replace("rbdp","none");
            temp_div = temp_div.replace("sbdp","none");
            temp_div = temp_div.replace("bbdp","none");
            temp_div = temp_div.replace("udisplay","none");
            temp_div = replaceAll(temp_div,'upbard_','none');
            //if(cur_obj.ship_skill == 20 && cur_obj.shipyard_level >= cur_obj.shipyard_min_level)
			//{
			if (show_ship)
			{
            $( "#ships" ).append(temp_div);
            }
            
            if(i == ships.length-1){
                $('#tierbtn').attr('disabled',true)
                Yamato();
            }
        }
    }
}

function AfterRenderships(){
    reloadships = false;
}

var mjson = {};
var datam = null;
function Yamato(){
    var fleetrequestjson = {};
    fleetrequestjson['user'] = username;
    fleetrequestjson['planet'] = planetid;

    var yamatos = {};

    activeMission(function(err,res){
        $('#avmis').text('Missions '+res.cur+'/'+res.max+', Planet: '+res.planet_unused+'/'+res.planet_max)
    })

    $.ajax({
        url: apiServer + '/planetfleet',
        type: 'GET',
        data: fleetrequestjson,
        success: function(json) {
            json.forEach(ship => {
                if(ship.type.includes('yamato')){
                    console.log(ship)
                    //if(ship.busy_until < currentUTC){
                        if(yamatos[ship.type]){
                            var n = yamatos[ship.type].n;
                            n++
                            yamatos[ship.type] = {n: n, id:ship.id}
                        }else{
                            console.log(ship.type)
                            yamatos[ship.type] = {n: 1, id:ship.id}
                        }
                    //}
                }
            })

            $('#tiersel').html('<option value="">Choose a tier to upgrade...</option>')
            Object.keys(yamatos).sort().forEach(yamato =>{
                var tier = yamato.split('yamato')[1];
                var style = "00"
                var tiers = (style.substring(0, style.length - tier.length) + tier).toString();
                if(tiers != "20"){
                    $('#tiersel').append($('<option>',
                    {
                        value: yamato,
                        text : Translate('Yamato')+' T-'+tiers+' ('+yamatos[yamato].n+')'
                    }));
                }
            })

            mjson['user'] = username;
            mjson['mission_type'] = "upgradeyamato";
            mjson['cords_hor'] = planetx
            mjson['cords_ver'] = planety;
            $.ajax({
                url: apiServer + '/missions',
                type: 'GET',
                data: mjson,
                success: function(data) {
                    datam = data;
                    console.log(datam)
                    var busy = false;
                    if(datam.length > 0){
                        if(data[0].busy_until_return > currentUTC){
                            busy = true;
                            console.log("missiond",data[0])
                            $('#iduts').css("display","block");
                            TickTook("idutimer",data[0].busy_until_return,function(err,res){
                                if(res){
                                    Loadships();
                                }
                            })
                        }
                    }

                    $('#tiersel').on('change', function() {
                        $( "#tierbtn" ).unbind();
                        var val = this.value;
                        if(val.length > 0){
                            var tiero = 0;
                            if($.isNumeric(val.split('yamato')[1])){
                                tiero = val.split('yamato')[1];
                            }
                            tiero = (parseInt(tiero) + 1) + '';
                            var style = "00"
                            var tier = style.substring(0, style.length - tiero.length) + tiero
                            $('#tierbtn').html(Translate('upgrade')+' to T-'+tier)
                            $('#tierbtn').attr('disabled',true)
                            
                            activeSeason(function(err,res){
                                if(res){
                                    //Check if free mission slot
                                    activeMission(function(err,res){
                                        $('#avmis').text('Missions '+res.cur+'/'+res.max+', Planet: '+res.planet_unused+'/'+res.planet_max)
                                        if(res.mission_allowed && !busy){
                                            //Get Yamato Data
                                            var json = {};
                                            json['user'] = username;
                                            json['planet'] = planetid;
                                            $.ajax({
                                                url: apiServer + '/planetshipyard',
                                                type: 'GET',
                                                data: json,
                                                success: function(ships) {
                                                    ships.forEach(ship=> {
                                                        console.log('yamato'+tiero)
                                                        //If there is a free Yamato
                                                        if(ship.type == 'yamato'+tiero){
                                                            console.log(ship.costs)
                                                            var res = RessourceBuilder(ship.costs.coal,ship.costs.ore,ship.costs.copper,ship.costs.uranium,ship.costs.stardust);
                                                            $('#upc').html('Upgrade: '+ res.cost 
                                                                + '<br><span class="glyphicon glyphicon-time" aria-hidden="true"></span>  '+ msToHMS(ship.costs.time*1000))

                                                            if(res.enough){
                                                                console.log(res)
                                                                //Yamato Upgrade Click
                                                                $('#tierbtn').removeAttr("disabled");
                                                                $('#tierbtn').one('click', function(){

                                                                    $('#tierbtn').html('<img src="img/loading.gif" height="15px" />');
                                                                    $('#tierbtn').attr('disabled',true)

                                                                    var scJson = {};
                                                                    var scCmd = {};
                                                                    scJson['username'] = username;
                                                                    scJson['type'] = "upgradeyamato";
                                                                    scCmd['tr_var1'] = planetid;
                                                                    scCmd['tr_var2'] = val;
                                                                    scJson['command'] = scCmd;
                                                                    var njson = JSON.stringify(scJson);
                                                                    CustomJsonHandler(username,sc2app,njson,function(err,res){
                                                                        console.log(err,res)
                                                                        MakeAPhonecall(apiServer + '/missions',mjson,datam,function (err,res) {
                                                                            if(res){
                                                                                Loadships();
                                                                                GetQyt();
                                                                            }
                                                                        },'GET',null,scJson,res.result.block_num)
                                                                    })
                                                                })
                                                            }else{
                                                                $('#tierbtn').attr("disabled", true);
                                                            }
                                                        }
                                                    })
                                                },
                                            })
                                        }else{
                                            $('#tierbtn').attr('disabled',true)
                                        }
                                    })
                                }
                            })
                            

                        }else{
                            $('#tierbtn').html(Translate('upgrade'))
                            $('#tierbtn').attr('disabled',true)
                            $('#upc').html('Upgrade: - C, - Fe, - Cu, - U, - SD' + '<br><span class="glyphicon glyphicon-time" aria-hidden="true"></span> -')
                        }
                    });
                }
            })
        },
    })
}

function activeSeason(callback){
        var json = {};
        $.ajax({
            url: apiServer + '/seasonranking',
            type: 'GET',
            data: json,
            success: function(json) {
                if(json.end_date <= currentUTC){
                    callback(null,false);
                }else{
                    callback(null,true);
                }
            }
        })
}

function activeMission(callback){
    var json = {};
    json['user'] = username;
    json['planet'] = planetid;
    $.ajax({
        url: apiServer + '/missioninfo',
        type: 'GET',
        data: json,
        success: function(msg) {
            json = msg;
            userUnused = json.user_unused;
            userMax = json.user_max;
            planetUnused = json.planet_unused;
            planetMax = json.planet_max;

            callback(null,{cur:json.user_unused, max:json.user_max, planet_unused:json.planet_unused, planet_max:json.planet_max, mission_allowed: json.mission_allowed})
        }
    });
}

function BuildShip(name){
    console.log("Make Upgrade");
    if(name != "" && !isUpgrading){
        var scJson = {};
        var scCmd = {};
        scJson['username'] = username;
        scJson['type'] = "buildship";
        scCmd['tr_var1'] = planetid.toString();
        scCmd['tr_var2'] = name;
        scJson['command'] = scCmd;

        api.setAccessToken(access);
        var njson = JSON.stringify(scJson);

        $( "#"+name+"btn" ).html('<img src="img/loading.gif" height="15px" />');
        $( "#"+name+"btn" ).prop("disabled",true);

        isUpgrading = true;
        CustomJsonHandler(username,sc2app,njson,function(res,err){
            isUpgrading = true;
            AwaitChangeships()
            console.log(res,err);
        });
    }
}



function AwaitChangeships(){
    var json = {};
    json['user'] = username;
    json['planet'] = planetid;
    MakeAPhonecall(apiServer + '/planetshipyard',json,oldJsonships,function(err,res){
        if(res){
            isUpgrading = false;
            Loadships();
        }
    },'GET');
}

CheckitemsShips(function(err,res){
    if(res){
        GetshipDiv();
    }
});