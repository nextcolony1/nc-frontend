var blueprint = {}; 

function Overview(){
    Season();
    BattleOfTheDay();
    UserOverview();
    MissionInfo();
    Market();
}

function UserOverview(){
    OnPlanetChange(function(err,res){
        UserOverview();
    },'overview1')

    Buildings();
    Mission();
}

var shipyardtimer, buildingtimer;

function Production(){
    $('#coalprdo').text(coalprd.production.toFixed(2));
    $('#oreprdo').text(oreprd.production.toFixed(2));
    $('#copperprdo').text(copperprd.production.toFixed(2));
    $('#uraniumprdo').text(uraniumprd.production.toFixed(2));
}

function Stardust(){
        $('#stardustbalance').text(formatNumber(stardustb.toFixed(0)) + " Stardust");
        $('#stardustsupply').text(formatNumber(stardustt) + " Stardust");
        $('#stardustpercent').text((stardustb/stardustt*100).toFixed(2));
        $('#stardusttransfer').unbind("click");
        $('#stardusttransfer').click(function() {
            OpenSDModal();
        });
        $('#stardustconvert').unbind("click");
        $('#stardustconvert').click(function() {
            ConvertSDModal();
        });
}

function Ranking(){
    var json = {};
    json['limit'] = 1000;
    $.ajax({
        url: apiServer + '/loadranking',
        type: 'GET',
        data: json,
        success: function(json) {
            if(json){
                json.forEach(rank => {
                    if(rank.user == username){
                        console.log(rank)
                    }
                });
            }
        }
    })
}

function Buildings(){
    var json = {};
    json['id'] = planetid;
    $.ajax({
        url: apiServer + '/loadbuildings',
        type: 'GET',
        data: json,
        success: function(json) {
            var busytime = 1e22;
            var bmaxlevel = 0;
            var bcurlevel = 0;
            json.forEach(function(building){
                bmaxlevel += 20;
                bcurlevel += building.current;
                if(building.busy > currentUTC){
                    if(busytime > building.busy){
                        busytime = building.busy;
                    }
                }
            })
            
            if(busytime < 1e19){
                $('#building_in').text(" in ");
                TickTook('building_timer',busytime,function(err,res){
                    if(res){
                        Buildings();
                    }
                },"",true);
            }else{
                $('#building_in').text("");
                $('#building_timer').text("");
            }
    
            $('#building_level').text(bcurlevel+"/"+bmaxlevel);
        }
    });
}

function Shipyard(){
    var json = {};
    json['user'] = username;
    json['planet'] = planetid;
    $.ajax({
        url: apiServer + '/planetshipyard',
        type: 'GET',
        data: json,
        success: function(json) {
            var busytime = 1e22;
            json.forEach(function(building){
                if(building.busy_until > currentUTC && busytime > building.busy_until){
                    busytime = building.busy_until;
                }
            })
            if(busytime < 1e22){
                $('#shipyard_in').text(" in ");  
                TickTook('shipyard_timer',busytime,function(err,res){
                    if(res){
                        Shipyard();
                    }
                },"",true);
            }else{
                $('#shipyard_in').text("");
                $('#shipyard_timer').text("");
            }
        }
    });
}

function Market(){
    $.ajax({
        url: apiServer + '/marketstats',
        type: 'GET',
        success: function(data) {
            console.log(data);
            var total = data.items_on_market + data.planets_on_market + data.ships_on_market;
            $('#ttransactions').text(formatNumber(data.transaction_number));
            $('#tsold').text(formatNumber((data.trading_volume/100000000).toFixed(0)) + " Stardust");
            $('#tburned').text(formatNumber((data.total_burned/100000000).toFixed(0)) + " Stardust");
            $('#hsell').text(formatNumber((data.highest_sale.price/100000000).toFixed(0)) + " Stardust");

            var hinfo = '<b>Highest sale</b><br>Category: '+capitalize(data.highest_sale.category)+'<br>Price: '+formatNumber((data.highest_sale.price/100000000).toFixed(0))+' SD<br>Seller: '+data.highest_sale.seller
            $('#hinfo').html(hinfo)
        }
    });
}

function Mission() {
    var json = {};
    json['user'] = username;
    $.ajax({
        url: apiServer + '/missionoverview',
        type: 'GET',
        data: json,
        success: function(json) {
            console.log(json)
            var maxmissions = json.max_missions;

            $('#ava_missions').text((maxmissions-json.own_missions) + " / " + maxmissions);
            $('#mission_own').text(json.own_missions);
            $('#mission_friendly').text(json.friendly_missions);
            $('#mission_hostile').text(json.hostile_missions);
        }
    });
}

function MissionInfo() {
    var json = {};
    json['user'] = username;
    json['planet'] = planetid;
    $.ajax({
        url: apiServer + '/missioninfo',
        type: 'GET',
        data: json,
        success: function(json) {
            console.log(json)
            $('#planet_missions').text(json.planet_unused+ " / " + json.planet_max);
        }
    });
}

function GetBlueprints(callback){
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
                    blueprint[data.id] = data.name;
                }
            })
            callback(null,true)
        }
    });    
}

var nottemplate = "";
function Notification(){
    var json = {};
    json['user'] = username;
    json['limit'] = 200;
    $.ajax({
        url: apiServer + '/loadfleetmission',
        type: 'GET',
        data: json,
        success: function(json) {
            if(nottemplate == ""){
                nottemplate = $('#notification_template').html();
            }
            $('#notification').html("");
            var cur = 0;
            json.forEach(function (mission){
                if(cur < 10){
                    var template = nottemplate;
                    if(mission.new_stardust != null){
                        cur++;
                        template = template.replace('display:none','');
                        template = template.replace("notificationcontent_",'<span class="stardust">'+mission.new_stardust/100000000+' Stardust</span> found on exploration to ['+mission.end_x+'/'+mission.end_y+']. <a href="wallet">Wallet</a> »');
                        $('#notification').append(template);
                    }
                    var template = nottemplate;
                    if(mission.new_item_id != null){
                        cur++;
                        template = template.replace('display:none','');
                        template = template.replace("notificationcontent_",'<span style="color:#add8e6;">'+blueprint[mission.new_item_id]+' Blueprint</span> found on exploration to ['+mission.end_x+'/'+mission.end_y+']. <a href="items">Items</a> »');
                        $('#notification').append(template);
                    }
                    var template = nottemplate;
                    if(mission.new_planet_id != null){
                        cur++;
                        template = template.replace('display:none','');
                        var planet_type = "";
                        if(mission.to_planet.planet_type == "earth"){
                            planet_type = "atmosphere";
                        }else{
                            planet_type = mission.to_planet.planet_type;
                        }

                        template = template.replace("notificationcontent_",'<span style="color:#5CB85C;">Planet</span> found! '+capitalize(mission.to_planet.bonus)+' '+capitalize(planet_type)+' on position ['+mission.end_x+'/'+mission.end_y+']. <a href="galaxy">Galaxy</a> »');
                        $('#notification').append(template);
                    }
                }
            })
        }
    });
}

function BattleOfTheDay(){
    var json = {};
    $.ajax({
        url: apiServer + '/dailybattles',
        type: 'GET',
        data: json,
        success: function(json) {
            var loser = '<span style="color:#a94442;">Loser</span>';
            var winner = '<span style="color:#5CB85C;">Winner</span>';
            if(json.loot_result == 2){
                df = loser;
                at = winner;
            }
            if(json.loot_result == 1){
                df = winner;
                at = loser;
            }

            $('#battle_vs').text(json.loot_attacker + " vs. "+json.loot_defender);
            $('#battle_a').html(json.loot_attacker + " " + at);
            $('#battle_d').html(json.loot_defender + " " + df);
            $('#battle_t').text(moment(json.loot_date*1000).format('MM/D/YY, h:mm:ss a'));

            $('#battle_off').attr('href',"/report?mission="+json.loot_mission);
            $('#battle_jar').attr('href',jarunikServer+"/battle/"+json.loot_mission);
        }
    });
}

function Season(){
    var json = {};
    $.ajax({
        url: apiServer + '/seasonranking',
        type: 'GET',
        data: json,
        success: function(json) {
            console.log(json);
            if(json.name){
                $('#seasonnname').text(json.name);
                $('#seasonprize').text(json.steem_rewards);
                $('#seasonleach').text(json.leach_rate*100);
                $('#seasondeploy').text(json.deploy_rate*100);
                if(json.end_date > currentUTC){
                    $('#seasontimer').html('Season ends in <span id="stimerc"></span>')
                    TickTook("stimerc",json.end_date,function(err,res){
                        $('#seasontimer').html('<i>No Active Season</i>')
                    })
                }else{
                    $('#seasontimer').html('<i>No Active Season</i>')
                }
            }
        }
    });
}

Overview();