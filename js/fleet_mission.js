
var missionplanet = null;
var missionplanetname = "";
var missionplanetoptions = null;

var activestatus = [];

var blueprint = {};

var overhalf = {};
var info = 'You can cancel this mission now, but then the required uranium for the flight will be lost. Are you sure you want to do this now?<br><br>';
var deployif = '<span style="color:#a94442;"><i>Your fleet already has flown more than half the way and therefore not enough uranium for the way back. This mission can not be canceled.</i></span>';

var oldjsn;
var requestjson = {};

var page = 0;
var limit = 80;

var mission_data = {};

function PreloadMissions(){
    page = 0;
    LoadMissions("history");
    LoadMissions("active");
    loadPlanets();
    loadHeader();
}

function LoadMissions(type="history"){
    requestjson = {};
    requestjson['user'] = username;
    if(missionplanet){
        requestjson['planetid'] = missionplanet;
    }else{
        missionplanetname = "";
    }
    if(type=="history"){
        requestjson['page'] = page;
        requestjson['limit'] = limit;
        requestjson['active'] = 0;
    }else{
        requestjson['active'] = 1;
    }

    $.ajax({
        url: apiServer + '/loadfleetmission',
        type: 'GET',
        data: requestjson,
        success: function(data) {
            if(type == "active"){
                oldjsn = data;
            }
            if(type == "history"){
                if(data.length == 0){
                    $('#loadmore').css('display','none')
                }else{
                    $('#loadmore').css('display','block')
                }
            }
            console.log(data);
            GetBlueprints(function(){
                if(page == 0){
                    mission_data[type] = data; 
                }else{
                    mission_data[type] = mission_data[type].concat(data);
                }
                data = data.sort(function(a,b){
                    return new Date(a.arrival) - new Date(b.arrival);
                });
                RenderMissions(data,type)
            })
        }
    });
}

function loadmore(){
    page++;
    LoadMissions("history");
}
var sorted = "asc";
function sortAfter(type,sort){
    var data = mission_data[type];

    if(sort != "ships"){
        data = data.sort((a,b) => (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0));
    }else{
        data = data.sort((a,b) => (a.ships.total > b.ships.total) ? 1 : ((b.ships.total > a.ships.total) ? -1 : 0));
    }


    if(sorted == "asc"){
        data.reverse();
        sorted = "dec";
    }else{
        sorted = "asc";
    }

    console.log(data,sort)

    RenderMissions(data,type,true)
}

function loadPlanets(callback = null){
    if(planet_names.length == 0){
        setTimeout(function () {
            loadPlanets(callback);
        }, 1000);
        return;
    }

    if(!missionplanetoptions){
        missionplanetoptions = $('#allplanets').html();
    }
    $('#allplanets').html(missionplanetoptions);

    planet_names.forEach(function(name,index){
        $('#allplanets').append('<li><a onclick=\'SetPlanet("'+planet_ids[index]+'")\'>'+name+'</a></li>');
    })

    if(callback){
        callback(null,planet_names);
    }
}

function loadHeader(){
    activeMission(function(err,res){
        if(res){
            if(missionplanet){
                missionplanetname = '('+planet_names[planet_ids.indexOf(missionplanet)]+')'
            }else{
                missionplanetname = "";
            }

            $('#mission_header').html('Missions '+missionplanetname)
            var a_pl = "";
            if(missionplanet){
                a_pl = ', Planet: '+res.planet_unused+' / '+res.planet_max;
            }
            $('#mission_header').text($('#mission_header').text()+' - Available Missions: '+res.cur+' / '+res.max+a_pl)
        }
    })

}   

function RenderMissions(data,id,append=null){
    if(id == "history"){
        data = data.reverse();
    }

    if(page == 0 || append == true){
        $('#'+id).html("");
    }
    data.forEach(mission => {
        var type_color = "white";
        var type_tooltip = "";

        if(mission.arrival > currentUTC && mission.type == "deploy" && id == "active"){
            setInterval(function() {
                DynamicOverhalfTrigger(mission.id,mission.start_date,mission.arrival);
            }, 1000);
        }

        //Color Logic
        if(mission.from_planet){
            if(mission.from_planet.user != username){
                type_color = "#5CB85C";
                if(mission.type == "upgradeyamato"){
                    type_color = "white"
                }
                if(mission.type == "siege" || mission.type == "attack"){
                    type_color = '#a94442'
                }
            }
        }

        //Tooltip Logic
        if(mission.resources.coal > 0 || mission.resources.ore > 0 || mission.resources.uranium > 0 ||  mission.resources.copper > 0){
            type_tooltip = '<span>'
            type_tooltip += 'Coal: '+mission.resources.coal
            type_tooltip += '<br>Ore: '+mission.resources.ore
            type_tooltip += '<br>Copper: '+mission.resources.copper
            type_tooltip += '<br>Uranium: '+mission.resources.uranium
            type_tooltip += '</span>'
        }

        //Tooltip Position
        var org_txt = "", des_txt = "";
        if(mission.from_planet){
            var org_pln = loadPlanetData(mission.from_planet);
            org_txt = '<span><b>'+org_pln.name+'</b><br>Rarity: '+org_pln.bonus+'<br>Type: '+org_pln.planet_type+'<br>Owner: '+org_pln.user+'</span>'
        }
        if(mission.to_planet){
            var des_pln = loadPlanetData(mission.to_planet);
            des_txt = '<span><b>'+des_pln.name+'</b><br>Rarity: '+des_pln.bonus+'<br>Type: '+des_pln.planet_type+'<br>Owner: '+des_pln.user+'</span>'
        }

        //Attack
        var report = '';
        var reports = '<a style="font-size:12px;" target="_blank" href="/report?mission='+mission.id+'">Log1</a> / <a target="_blank" style="font-size:12px;" href="'+jarunikServer+"/battle/"+mission.id+'">Log2</a>';
        if((mission.type == "attack" || mission.type == "support" || mission.type == "siege" || mission.type == "breaksiege") && status != "Aborted"){
            report = reports
        }else{
            report = '<a></a>'
        }

        //Cancel
        var cancel = "";
        if(mission.from_planet.user == username){
            if(!mission.cancel_trx){
                cancel = '<a style="font-size:12px;" id="cancel_'+mission.id+'" onclick="CancelMissionModal(\''+mission.id+'\')">Cancel</a>';
            }else{
                report = "";
                cancel = report;
                if(!mission.return){
                    //mission.return = mission.arrival;
                    //mission.arrival = null;
                }
            }
        }

        if(cancelPossible(mission)){
            cancel = '<a style="font-size:12px;" id="cancel_'+mission.id+'" onclick="CancelMissionModal(\''+mission.id+'\')">Cancel</a>';
        }

        preparetimer(mission,"arr",mission.arrival);
        preparetimer(mission,"ret",mission.return);

        if(id == "active"){
            $('#'+id).append($('<tr>')
                .append($('<td>').append('<a class="tooltips" style="color:'+type_color+';text-decoration: none;">'+Translate(mission.type)+type_tooltip+'</a>'))
                .append($('<td>').append('<a class="tooltips" style="text-decoration:none" onclick="LoadGalaxyA(\''+mission.start_x+'\',\''+mission.start_y+'\')">'+mission.start_x+':'+mission.start_y+org_txt+'</a>'))
                .append($('<td>').append('<a class="tooltips" style="text-decoration:none" onclick="LoadGalaxyA(\''+mission.end_x+'\',\''+mission.end_y+'\')">'+mission.end_x+':'+mission.end_y+des_txt+'</a>'))
                .append($('<td>').append('<a class="tooltips" style="text-decoration:none">'+mission.ships.total+'<span>'+loadShipData(mission)+'</span></a>'))
                .append($('<td>').append(moment(mission.start_date*1000).format('DD/MM hh:mm:ss')))
                .append($('<td>').append(activestatus[mission.id+"arr"]))
                .append($('<td>').append(activestatus[mission.id+"ret"]))
                .append($('<td>').append(statusbuilder(mission)))
                .append($('<td>').append(cancel)));
        }else{
            $('#'+id).append($('<tr>')
                .append($('<td>').append('<a class="tooltips" style="color:'+type_color+';text-decoration: none;">'+Translate(mission.type)+type_tooltip+'</a>'))
                .append($('<td>').append('<a class="tooltips" style="text-decoration:none" onclick="LoadGalaxyA(\''+mission.start_x+'\',\''+mission.start_y+'\')">'+mission.start_x+':'+mission.start_y+org_txt+'</a>'))
                .append($('<td>').append('<a class="tooltips" style="text-decoration:none" onclick="LoadGalaxyA(\''+mission.end_x+'\',\''+mission.end_y+'\')">'+mission.end_x+':'+mission.end_y+des_txt+'</a>'))
                .append($('<td>').append('<a class="tooltips" style="text-decoration:none">'+mission.ships.total+'<span>'+loadShipData(mission)+'</span></a>'))
                .append($('<td>').append(moment(mission.start_date*1000).format('DD/MM hh:mm:ss')))
                .append($('<td>').append(activestatus[mission.id+"ret"]))
                .append($('<td>').append(statusbuilder(mission)))
                .append($('<td>').append(report)));
        }

    });
}

function SetPlanet(id){
    missionplanet = id;
    if(planet_names.length == 0){
        loadPlanets(function(err,res){
            SetPlanet(id);
        })
        return;
    }

    console.log(planet_names[planet_ids.indexOf(missionplanet)])

    if(missionplanet != null){
        $('#curpos').html(planet_names[planet_ids.indexOf(missionplanet)])
    }else{
        $('#curpos').html("All Planets")
    }

    console.log($('#curpos').html())

    PreloadMissions();
    loadHeader();
}

function loadPlanetData(data){
    if(data.planet_type == "earth"){
        data.planet_type = "Atmosphere"
    }else{
        data.planet_type = capitalize(data.planet_type)
    }
    data.bonus = capitalize(data.bonus)

    return data;
}

function DynamicOverhalfTrigger(id,start,end){
    var utc = new Date();
    utc = utc / 1000;
    currentUTC = utc;
    //Check if over half
    var tTravelTime = end - start;
    var passedTime = currentUTC - start;
    if(tTravelTime/2 < passedTime){
        overhalf[id] = true;
    }
}

function preparetimer(mission,id,time){
    if(id == "arr" && mission.return){
        if(mission.return == mission.arrival){
            time = null;
        }
    }

    if(!time){
        activestatus[mission.id+id] = "-";
    }else{
        var utc = new Date();
        utc = utc / 1000;
        var finished = moment.unix(parseInt(time)).format('DD/MM hh:mm:ss'); 
        if(utc < time){
            var span = moment.unix(parseInt(time)).format('MM/DD/YY, hh:mm:ss a'); 

            var utc = new Date();
            utc = utc / 1000;
            var tis = msToHMS((parseInt(time) - utc) * 1000);

            activestatus[mission.id+id] = '<a class="tooltips" id="timer_'+mission.id+id+'" style="text-decoration:none">'+tis;
            TickTook('timer_'+mission.id+id, parseInt(time),function(err,res){
                if(res){
                    if(id == "arr"){
                        $('#timer_'+mission.id+id).html("-");
                        PreloadMissions();
                    }else{
                        PreloadMissions();
                    }
                }
            },'<span>'+span+'</span></a>');
        }else{
            activestatus[mission.id+id] = finished;
        }
    }
}

function statusbuilder(mission){
    var result = mission.result;
    if(!result){
        return "-";
    }else{
        var span = "-";
        if(result == "cancel"){
            span = '<a class="tooltips" style="color:#dad986; text-decoration:none; font-size:13px;">Aborted<span>Mission was aborted</span></a>';
        }
        if(result == "nothing_found" || result == "yamato_upgraded"){
            span = "-";
        }

        //Attack
        var win,lose;
        var status ="";
        if(mission.user == username || mission.type == 'support' || mission.type == 'siege'){
            win = 2;
            lose = 1;
        }else{
            win = 1;
            lose = 2;
        }

        if(mission.result == lose){
            status = 'Defeated'
            statuscolor = '#a94442'
        }
        if(mission.result == win){
            status = 'Victory'
            statuscolor = '#5CB85C'
        }

        if(mission.result == 0 || mission.result == 1 || mission.result == 2){
            span = '<a href="/report?mission='+mission.id+'" style="font-size:12px; text-decoration: none; color:'+statuscolor+';">'+status+'</a>'
        }

        //Stardust - Blueprint
        if(mission.new_stardust != null){
            var end = '<span><b>Stardust found</b><br>The crew found a small amount of Stardust during the exploration.<br><br>+ '+mission.new_stardust/100000000+' Stardust</span>'
            span = '<a class="tooltips" style="text-decoration: none; color:#72bcd4; font-size:12px;"">'+mission.new_stardust/100000000+" SD"+end+'</a>'
        }

        if(mission.new_item_id != null){
            var end = '<span><b>Blueprint found</b><br>The crew found a blueprint during the exploration. This blueprint was found:<br><br>+ '+blueprint[mission.new_item_id]+'</span>'
            span = '<a class="tooltips" style="text-decoration: none; color:#add8e6; font-size:12px;"">'+"Blueprint"+end+'</a>'
        }

        if(mission.new_item_id != null && mission.new_stardust != null){
            var ends = '<span><b>Stardust found</b><br>The crew found a small amount of Stardust during the exploration.<br><br>+ '+mission.new_stardust/100000000+' Stardust</span>'
            var endb = '<span><b>Blueprint found</b><br>The crew found a blueprint during the exploration. This blueprint was found:<br><br>+ '+blueprint[mission.new_item_id]+'</span>'
            span = '<a class="tooltips" style="text-decoration: none; color:#72bcd4; font-size:12px;"">'+mission.new_stardust/100000000+" SD"+ends+'</a>'
            span = span + ' / <a class="tooltips" style="text-decoration: none; color:#add8e6; font-size:12px;"">'+"Blueprint"+endb+'</a>'
        }

        //Explore Tooltip
        if(result == "planet_found"){
            var typ = 'Atmosphere'
            if(mission.to_planet.planet_type != 'Earth'){
                typ = mission.to_planet.planet_type
            }

            var plnfnd = '<span><b>Planet found</b><br>Rarity: '+mission.to_planet.bonus+'<br>Type: '+typ+'<br>Position: '+mission.end_x+'/'+mission.end_y+'</span>'
            span = '<a class="tooltips" style="text-decoration: none; color:#5CB85C; font-size:12px;">Planet'+plnfnd+'</a>'
        }

        if(result == "explorer_lost"){
            span = '<span style="font-size:13px;color:#a94442;">Lost</span>'
        }

        return span;
    }
}

var sships = ['transportship','transportship1','transportship2','explorership','explorership1','scout','scout1','patrol','patrol1','cutter','cutter1','corvette','corvette1','frigate','frigate1','destroyer','destroyer1','cruiser','cruiser1','battlecruiser','battlecruiser1','carrier','carrier1','dreadnought','dreadnought1',
                'yamato','yamato1','yamato2','yamato3','yamato4','yamato5','yamato6','yamato7','yamato8','yamato9','yamato10','yamato11','yamato12','yamato13','yamato14','yamato15','yamato16','yamato17','yamato18','yamato19','yamato20'];

function loadShipData(data){
    ShipTotal = data.ships.total;
    var curAmShip = 0;
    //Ship Pop-up
    var ships = "";
    var arrayShips = [];
    Object.keys(data.ships).forEach(function(name,index){
        var valv = data.ships[name];
        if(name != 'total' && valv.pos > 0 && valv.n > 0){
            arrayShips.push({name: name, n:valv.n, pos:valv.pos});
        }
    });

    if(data.type != "transport"){
        arrayShips.sort((a,b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0)); 
    }else{
        arrayShips.sort(function(a, b){  
            return sships.indexOf(a.name) - sships.indexOf(b.name);
        });
    }

    arrayShips.forEach(function(ship){
        if(ship.name != 'total'){
            ships += Translate(ship.name) + ": " + ship.n;
            curAmShip = curAmShip + ship.n;
            if(curAmShip < ShipTotal){
                ships += "<br>";
            }
        }
    })
    return ships;
}

function LoadGalaxyA(x,y){
    var cordx = parseInt(x);
    var cordy = parseInt(y);

    window.location.href = '/galaxy?x='+cordx+'&y='+cordy;
}

function activeMission(callback){
    var json = {};
    json['user'] = username;
    json['planet'] = missionplanet;
    if(!missionplanet){
        json['planet'] = planetid;
    }
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


//Cancel
function CancelMissionModal(mission,hold = null,over=null){
    curcancelmission = mission;
    $('#MissionCancelModal').modal('show')
    $('#cancel_btn').html("Confirm");
    if(overhalf[curcancelmission] == true){
        $('#mission_cancel_text').html(info+deployif);
        $('#cancel_btn').attr('disabled',true);
    }else{
        $('#mission_cancel_text').html(info);
    }
    $('#MissionCancelModal').on('hidden.bs.modal', function () {
        curcancelmission = "";
    })
    $('#cancel_btn').unbind();
    $('#cancel_btn').click(function(){
        $(this).prop("disabled",true);
        CancelMission(mission,hold);
    })
}

function CancelMission(mission, hold){
    $('#cancel_btn').html('<img src="./img/loading.gif" height="15px" />');

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "cancel";
    scCmd['tr_var1'] = mission;
    scJson['command'] = scCmd;
    var njson = JSON.stringify(scJson);
    CustomJsonHandler(username,sc2app,njson,function(err,res){
        if(res){
            $('#cancel_'+mission).html("");
            $('#cancel_'+mission).css("display","none")
            $('#MissionCancelModal').modal('hide');
            $('#cancel_btn').prop("disabled",false);
        }else{
            CancelMission(mission)
        }
    });
}


//PreloadMissions();
SetPlanet(planetid)
MissionPlanetTricker();

function MissionPlanetTricker(){
    OnPlanetChange(function (err,res) {
        if(res){
            SetPlanet(planetid);
            MissionPlanetTricker();
        }
    },'mission') 
}

///NC Client
function cancelPossible(mission) {
    if (mission.cancel_trx !== null) {
      return false;
    }
    if (mission.user !== username) {
      return false;
    }
    if (
      mission.result != null &&
      mission.type != "support" &&
      mission.type != "siege"
    ) {
      return false;
    }
    if (
      !isOutgoing(mission.arrival) &&
      mission.type !== "support" &&
      mission.type !== "siege" &&
      mission.type !== "breaksiege"
    ) {
      return false;
    }
    if (mission.type === "upgradeyamato") {
      return false;
    }
    return true;
  }

function isOutgoing(arrival) {
    var arrivalUntil = moment(new Date(arrival * 1000));
    var now = moment.utc();
    if (arrivalUntil === 0) {
      return false;
    } else {
      if (now.isAfter(arrivalUntil)) {
        return false;
      } else {
        return true;
      }
    }
}