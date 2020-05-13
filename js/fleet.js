var ShipTypes = [];
var ShipTotal = [];
var ShipName = [];
var ShipSpeed = [];
var ShipCons = [];
var ShipCapa = [];
var ShipID = [];
var ShipIMG = [];

var ShipIMGObj = {};
var ShipNameObj = {};
var ShipTotalObj = {};
var ShipSpeedObj = {};

var ships = ['transportship','transportship1','transportship2','explorership','explorership1','scout','scout1','scout2','patrol','patrol1','patrol2','cutter','cutter1','cutter2','corvette','corvette1','corvette2','frigate','frigate1','frigate2','destroyer','destroyer1','destroyer2','cruiser','cruiser1','cruiser2','battlecruiser','battlecruiser1','battlecruiser2','carrier','carrier1','carrier2','dreadnought','dreadnought1','dreadnought2'
            ,'yamato','yamato1','yamato2','yamato3','yamato4','yamato5','yamato6','yamato7','yamato8','yamato9','yamato10','yamato11','yamato12','yamato13','yamato14','yamato15','yamato16','yamato17','yamato18','yamato19','yamato20'];

var fleetscreen = "main";

var missionlevel = 0;
var currentMissions = 0;
var missionpossible = true;
var planetForSale = false;
var missingMissionControl = true;
var missingBaseLevel = true;

//Selected Options
var FirstChoice = "";
var selectFields = 0;
var totalSelect = 0;
var SelectedShips = {};
var LastSelectedShipName = "";

//Send
var posx = null;
var posy = null;
var powner = "";
var sendhtml = "";
var sendtype = "";

//CurrentValues
var totalCons = 0;
var totalCapa = 0;
var slowSpeed = 0;

//Ressources
var coalfleet = 0;
var orefleet = 0;
var copperfleet = 0;
var uraniumfleet = 0;

//Temps
var fleetselect = "";
var fleetload = "";
var screenstep = 0;
var fleettempjson;
var fleetrequestjson;

//Tables
var MainFleetTable = "";
var PlanetFleetSelection = "";

/// URL Handler
var query = window.location.search.substring(1);
var qs = parse_query_string(query);

var undersiege = false;

var totalexplorer = 0;
var explorertaget = "blabla";

var oldattackmis = [];

var costs = 0;

function GetMyFleet(screen=null,num=null){
    //Reset
    ShipTypes = [];
    ShipTotal = [];
    ShipSpeed = [];
    ShipCons = [];
    ShipCapa = [];
    ShipID = [];

    fleetrequestjson = {};
    fleetrequestjson['user'] = username;
    fleetrequestjson['planet'] = planetid;

    //Load Skill
    var json = {};
    json['user'] = username;
    $.ajax({
        url: apiServer + '/loadskills',
        type: 'GET',
        data: json,
        success: function(sjson) {
            var starterplanett = false;
            var loadedPlanet = null;
            var planetjs = {};
            planetjs['id'] = planetid;
            $.ajax({
                url: apiServer + '/loadplanet',
                type: 'GET',
                data: planetjs,
                success: function(response) {
                    console.log(response)
                    loadedPlanet = response;
                    if (loadedPlanet.startplanet == 1) {
                        starterplanett = true;
                    }
                    sjson.forEach(function(skill){
                        if(skill.name == "missioncontrol"){
                            if(starterplanett){
                                missionlevel = skill.current * 2 + 1;
                            }else{
                                missionlevel = skill.current * 2;
                            }
                        }
                    })
                    console.log("Mission Level: "+missionlevel)
                    //Load Missions
                    var json = {};
                    //json['planetid'] = planetid;
                    json['user'] = username;
                    json['planet'] = planetid;
        
                    $.ajax({
                        url: apiServer + '/missioninfo',
                        type: 'GET',
                        data: json,
                        success: function(msg) {
                            json = msg;
                            userMissions = json.user_active;
                            userMissionsMax = json.user_max;
                            userUnused = json.user_unused;
                            planetMissions = json.planet_active;
                            planetMissionsMax = json.planet_max;
                            planetUnused = json.planet_unused;
                            missionpossible = json.mission_allowed;
                            if (userMissions >= userMissionsMax){
                                missingMissionControl = true;
                            } else {
                                missingMissionControl = false;                              
                            }
                            if (planetMissions >= planetMissionsMax) {
                                missingBaseLevel = true;
                            } else {
                                missingBaseLevel = false;
                            }

                            if (loadedPlanet.for_sale == 1) {
                                planetForSale = true;
                            } else {
                                planetForSale = false;
                            }
                            $('#fleet_available').html('Available Missions User: '+userUnused+' / '+userMissionsMax+', Planet: '+planetUnused+' / '+planetMissionsMax+' (<span class="infocolor"><a class="infocolor" href="buffs">Buffs</a></span>)')
                            if (!missionpossible) {
                                NextStep('main',0);
                            }
                            //Load Siege
                            var json = {};
                            json['planetid'] = planetid;
                            json['active'] = 1;
                            json['hold'] = 1;
                            json['user'] = username;
                
                            $.ajax({
                                url: apiServer + '/loadfleetmission',
                                type: 'GET',
                                data: json,
                                success: function(msg) {
                                    console.log('hold',msg);
                                    msg.forEach(mis=>{
                                        if(mis.type == 'siege' && mis.end_x == planetx && mis.end_y == planety){
                                            undersiege = true;
                                            if(undersiege){
                                                $('#missionselector').empty().append('<option>Choose a mission</option>').append('<option>Break Siege</option>');
                                                $('#ehancemc').css('display','block');
                                                $('#ehancemc').text("You can't start a mission. Break the siege first.")
                                            }
                                        }
                                    })
        
                                    //Load Fleet
                                    $.ajax({
                                        url: apiServer + '/planetfleet',
                                        type: 'GET',
                                        data: fleetrequestjson,
                                        success: function(msg) {
                                            try {
                                                json = msg;
                                            } catch (e) {
                                                json = [];
                                            }
                                            fleettempjson = json;
                                            RenderPlanets();
                                            CheckCords();
                                            ConvertArrayFleet(json);

                                            console.log(msg)

                                            if(missionpossible && screen && num){
                                                NextStep(screen,num)
                                            }
                                            
                                            //Check Missions
                                        }
                                    });
                                }
                            })
                        }
                    })
                }
            });
        }
    })
}

function ConvertArrayFleet(arr){
    arr.forEach(ship => {
            console.log(ship)
            if(!ShipTypes.includes(ship.type)){
                ShipTypes.push(ship.type);
                ShipName.push(ship.longname);
                ShipSpeed.push(ship.speed);
                ShipCons.push(ship.consumption);
                ShipCapa.push(ship.capacity);
                ShipID.push(ship.id);
                console.log(ship.longname);

                ShipNameObj[ship.type] = ship.longname;
                if(ship.type.includes("yamato")){
                    ShipIMGObj[ship.type] = "yamato";
                }else{
                    ShipIMGObj[ship.type] = ship.longname.replace(' ','_').toLowerCase();
                }

                ShipIMG.push(ship.longname.replace(' ','_').toLowerCase());
            }
            var index = ShipTypes.indexOf(ship.type);

            ShipTotal[index] = ship.quantity - ship.for_sale;
            ShipTotalObj[ship.type] = ship.quantity - ship.for_sale;
            ShipSpeedObj[ship.type] = ship.speed;
    });
    console.log(ShipTypes,ShipTotal);
    RenderMainFleet();
}

///// MAIN FLEET
function RenderMainFleet(){
    if(MainFleetTable == ""){
        MainFleetTable = $('#fleet_main_table').html();
    }
    $('#fleet_main_table').html(MainFleetTable);
    ships.forEach(function(type,index){
        if(ShipTypes.includes(type)){
            $('#fleet_main_table').append('<tbody>').append($('<tr>')
                .append($('<td>').append('<img src="img/ships/'+ShipIMGObj[type]+'.png" width="40px">'))
                .append($('<td>').append(ShipNameObj[type]))
                .append($('<td>').append(ShipSpeedObj[type]))
                .append($('<td>').append(ShipTotalObj[type]))
            )
        }
    });

    if(qs.type){
        FirstChoice = qs.type;
        RenderSelectFleet();
    }

    PreAttackScreen();
    EnhanceSkill('fleet_main_btn',missionpossible,planetForSale);
}

function SelectMainFleet(value){
    //Check if Mission Possible
    if(missionpossible){
        //Set Standart Main Button Logic
        $('#fleet_main_btn').click(function(){
            NextStep('select', 1);
        })

        //Select Explorer
        if(value == "Explore"){
            if((ShipTypes.includes("explorership") || ShipTypes.includes("explorership1")) && missionpossible){
                $('#fleet_main_btn').prop("disabled",false);
                FirstChoice = "explore";
            }else{
                $('#fleet_main_btn').prop("disabled",true);
            }
        //Select Transporter
        }else if(value == "Transport" && missionpossible){
            if(ShipTypes.length > 0){
                $('#fleet_main_btn').prop("disabled",false);
                FirstChoice = "transport";
            }
        //Select Deploy
        }else if(value == "Deploy" && missionpossible){
            if(ShipTypes.length > 0){
                $('#fleet_main_btn').prop("disabled",false);
                FirstChoice = "deploy";
            }
        //Select Attack
        }else if(value == "Attack" && missionpossible && attacktypestrs.some(function(ff) { return ShipTypes.indexOf(ff) > -1 })){
            if(ShipTypes.length > 0){
                $('#fleet_main_btn').prop("disabled",false);
                FirstChoice = "attack";
                $('#fleet_main_btn').click(function(){
                    RenderPlanets();
                    NextStep('select_attack', 1);
                })
            }
        //Select Siege
        }else if(value == "Siege" && missionpossible && attacktypestrs.some(function(ff) { return ShipTypes.indexOf(ff) > -1 })){
            if(ShipTypes.length > 0){
                $('#fleet_main_btn').prop("disabled",false);
                FirstChoice = "siege";
                $('#fleet_main_btn').click(function(){
                    RenderPlanets();
                    NextStep('select_attack', 1);
                })
            }
        //Select Break Siege
        }else if(value == "Break Siege" && missionpossible && attacktypestrs.some(function(ff) { return ShipTypes.indexOf(ff) > -1 })){
            if(ShipTypes.length > 0){
                $('#fleet_main_btn').prop("disabled",false);
                FirstChoice = "breaksiege";
                $('#fleet_main_btn').click(function(){
                    RenderPlanets();
                    NextStep('select_attack', 1);
                })
        }
        //Select Support
        }else if(value == "Support" && missionpossible && attacktypestrs.some(function(ff) { return ShipTypes.indexOf(ff) > -1 })){
                if(ShipTypes.length > 0){
                $('#fleet_main_btn').prop("disabled",false);
                FirstChoice = "support";
                $('#fleet_main_btn').click(function(){
                    RenderPlanets();
                    NextStep('select_attack', 1);
                })
            }
        //Nothing Selected
        }else{
            $('#fleet_main_btn').prop("disabled",true);
        }
    //Not Possible
    }
    EnhanceSkill('fleet_main_btn',missionpossible,planetForSale);
    RenderSelectFleet();
}

////SELECT FLEET
function RenderSelectFleet(){
        EnhanceSkill('fleet_select_btn',missionpossible, planetForSale)

    selectFields = 0;
    if(fleetselect){
        $('#fleet_select_table').html(fleetselect);
    }else{
        fleetselect = $('#fleet_select_table').html();
    }
    ships.forEach(function(type){
        if(ShipTypes.includes(type)){
        var index = ShipTypes.indexOf(type);

        var doRender = true;
        if(FirstChoice == "explore" && type == "explorership"){
            doRender = true;
        }
		else if(FirstChoice == "explore" && type == "explorership1"){
            doRender = true;
        }
		else if(FirstChoice == "explore"){
			doRender = false;
        }
        
        if(FirstChoice == "transport" && ShipCapa[index] == 0){
            doRender = false;
        }

        var max = 0;
        if(FirstChoice == "explore"){
            max = 1;
        }else{
            max = ShipTotal[index];
        }

        if(doRender){
            var inputField = '<input autocomplete="off" id="field_'+index+'" onkeyup="TotalSelected()" type="text" class="form-control" placeholder="" style="font-size:12px; color:#ffffff; background-color:transparent;width:50%;float:right;">';
            $('#fleet_select_table').append('<tbody>').append($('<tr>')
                .append($('<td>').append('<img src="img/ships/'+ShipIMGObj[type]+'.png" width="40px">'))
                .append($('<td>').append(ShipNameObj[type]))
                .append($('<td>').append(ShipTotalObj[type]))
                .append($('<td>').append(inputField))
            )   

            $("#field_"+index).on("keypress", function(e){
                validateint(e);
                var currentValue = String.fromCharCode(e.which);
                var finalValue = $(this).val() + currentValue;
                
                if(FirstChoice == "explore"){
                    if($("#"+explorertaget).val() == ""){
                        totalexplorer = 0;
                    }

                    if(totalexplorer > 0){
                        e.preventDefault();
                    }else{
                        if(finalValue > max){
                            e.preventDefault();
                        }else{
                            explorertaget = e.target.id;
                            totalexplorer = finalValue;
                        }
                    }
                }else{
                    if(finalValue > max){
                        e.preventDefault();
                    }
                }
            });

            selectFields++;
            }
        }
    });
}

function MaxSelect(event,total){
    var valv = parseInt(event.target.value);
    if(valv > total){
        event.returnValue = false; 
    }
}

function TotalSelected(){
    totalSelect = 0;
    totalCapa = 0;
    totalCons = 0;
    SelectedShips = {};
	LastSelectedShipName = "";
    for(var i=0; i < ShipTotal.length; i++){
        var valv = parseInt($('#field_'+i).val());
        if(!isNaN(valv)){
            var type = ShipTypes[i];
			LastSelectedShipName = type
            SelectedShips[type] = valv;
 
            totalSelect += valv;
            totalCapa += ShipCapa[i] * valv;
            totalCons += ShipCons[i] * valv;
            if(!slowSpeed){
                slowSpeed = ShipSpeed[i];
            }
            if(slowSpeed > ShipSpeed[i]){
                slowSpeed = ShipSpeed[i];
            }
        }
    }

    console.log("capa "+totalCapa,"Con "+totalCons);
    if(missionpossible){
        if(totalSelect > 0){
            $('#fleet_select_btn').prop("disabled",false);
            console.log(SelectedShips)
        }else{
            $('#fleet_select_btn').prop("disabled",true);
        }
    }
}

//SEND FLEET
function PosInputField(pos){
    $('#planet_selection').prop('selectedIndex', 0);
    if(pos == "x"){
        posx = $('#posx').val();
    }else{
        posy = $('#posy').val();
    }

    PreRenderSendFleet();
    CheckCords();
}

function RenderSendFleet(json){
    var con;
    var cons;
    if(sendhtml == ""){
        sendhtml = $('#send_desc').html();
    }
    var temphtml = sendhtml;
    if(json.diff){
        temphtml = replaceAll(temphtml,"dis_",json.diff);
        if(json.cons){
            if(FirstChoice == "deploy" || FirstChoice == "support"){
                con = parseFloat((json.cons*json.diff).toFixed(5));
            }else{
                con = parseFloat(((json.cons*json.diff)*2).toFixed(5));
            }
            var contxt = "";
            if(parseFloat(uraniumqytu) >= con){
                contxt = con;
            }else{
                contxt = '<span class="text-dangerq">'+con+'</span>';
            }
            temphtml = replaceAll(temphtml,"req_",contxt);
            cons = con;
        }
    }else{
        temphtml = replaceAll(temphtml,"dis_",0);
        temphtml = replaceAll(temphtml,"req_",0);
        cons = 0;
    }
    if(json.time){
        var unix = new Date().getTime();
        var arr = moment(parseInt(json.time)+unix).format('L, hh:mm:ss');
        var ret = moment(parseInt(json.time)+parseInt(json.time)+unix).format('L, hh:mm:ss');
        temphtml = replaceAll(temphtml,"time_",msToHMS(json.time,false));
        temphtml = replaceAll(temphtml,"arr_",arr);
        if(FirstChoice == "deploy" || FirstChoice == "support"){
            temphtml = replaceAll(temphtml,"ret_","No Return");
        }else{
            temphtml = replaceAll(temphtml,"ret_",ret);
        }
    }else{
        temphtml = replaceAll(temphtml,"time_","00:00:00");
        temphtml = replaceAll(temphtml,"arr_","00/00/0000, 00:00:00");   
        temphtml = replaceAll(temphtml,"ret_","00/00/0000, 00:00:00");  
    }
    if(json.speed){
        temphtml = replaceAll(temphtml,"speed_",json.speed);
    }else{
        temphtml = replaceAll(temphtml,"speed_",0);
    }
    if(json.capa){
        temphtml = replaceAll(temphtml,"capa_",json.capa);
    }else{
        temphtml = replaceAll(temphtml,"capa_",0);
    }
    $('#send_desc').html(temphtml);
    //Check if Requierments are made
    costs = cons;
    if(FirstChoice == "support"){
        if(posx && posy && parseFloat(uraniumqytu) >= cons){
            $("#fleet_send_btn").prop("disabled",false);
        }else{
            $("#fleet_send_btn").prop("disabled",true);
        }
    }else if(FirstChoice == "siege"){
        CheckCords(function(err,res){
            if(parseInt(json.diff) > 0 && parseFloat(uraniumqytu) >= con && powner != username){
                $("#fleet_send_btn").prop("disabled",false);
            }else{
                $("#fleet_send_btn").prop("disabled",true);
            }
        })
    }else{
        if(parseInt(json.diff) > 0 && parseFloat(uraniumqytu) >= con){
            $("#fleet_send_btn").prop("disabled",false);
        }else{
            $("#fleet_send_btn").prop("disabled",true);
        }
    }


    CheckCords();
    RenderLoadFleet();
}

function CheckCords(callback=null){
    if(posx != null && posy != null){
        var json = {};
        json['x'] = posx;
        json['y'] = posy;
        $.ajax({
            url: apiServer + '/loadcorddata',
            type: 'GET',
            data: json,
            success: function(msg) {
                try {
                    json = msg;
                } catch (e) {
                    json = [];
                }
                console.log(msg);

                sendtype = json.type;
                
                var text = "<b>Status:</b> ";
                powner = "";
                if(json.type == "planet"){
                    text += "Explored (Planet: "+json.name+", Owner: "+json.user+")"
                    powner = json.user;
                }else if(json.type == "explored"){
                    text += "Explored (empty)"
                }else{
                    text += "Unexplored"
                }
                $("#send_status").html(text);

                if(callback){
                    callback(null,json);
                }
            }
        });
    }else{
        $("#send_status").html('<b>Status:</b> Enter coordinates first');
    }
}

function FleetPlanet(id,pos=null){
    if(pos){
        posx = pos.split('/')[0];
        posy = pos.split('/')[1];
    }else{
        console.log(id);
        var i = planet_ids.indexOf(id);
        posx = planet_xs[i];
        posy = planet_ys[i];
    }
    $("#posx").val(posx);
    $("#posy").val(posy);
    PreRenderSendFleet();
    CheckCords();
}

//Load Fleet

function RenderLoadFleet(){
    if(fleetload){
        $('#load_table').html(fleetload);
    }else{
        fleetload = $('#load_table').html();
    }
    for(var i = 0; i < 4; i++){
        var res, resamount;
        if(i == 0){
            res = "coal";
            resamount = Math.floor(coalqytu);
        }
        if(i == 1){
            res = "ore";
            resamount = Math.floor(oreqytu);
        }
        if(i == 2){
            res = "copper";
            resamount = Math.floor(copperqytu);
        }
        if(i == 3){
            res = "uranium";
            resamount = Math.floor(uraniumqytu - costs);
        }

        var inputField = '<input autocomplete="off" id="input_'+res+'" onkeypress="validateint(event); CapCheck(event)" onkeyup="CheckResLoad()" type="text" class="form-control" placeholder="" style="font-size:12px; color:#ffffff; background-color:transparent;width:50%;float:right;">';
        $('#load_table').append('<tbody>').append($('<tr>')
                .append($('<td>').append(Translate(res)))
                .append($('<td>').append(resamount))
                .append($('<td>').append(inputField))
            )
    }
    $('#load_info').text('Utilization/Capcity of your fleet: '+0+'/'+totalCapa);
    CheckResLoad();
}

function CapCheck(event){
    var res = event.target.id.replace('input_','');
    if(res == "coal" && res.key > coalqytu){
        event.returnValue = false;
    }
    if(res == "ore" && res.key > oreqytu){
        event.returnValue = false;
    }
    if(res == "copper" && res.key > copperqytu){
        event.returnValue = false;
    }
    if(res == "uranium" && res.key > uraniumqytu){
        event.returnValue = false;
    }
}

function CheckResLoad(){
    var total = 0,tmp;
    tmp = parseInt($('#input_coal').val());
    if(!isNaN(tmp)){
        total += tmp;
        coalfleet = tmp;
    }else{
        coalfleet = 0;
    }
    tmp = parseInt($('#input_ore').val());
    if(!isNaN(tmp)){
        total += tmp;
        orefleet = tmp;
    }else{
        orefleet = 0;
    }
    tmp = parseInt($('#input_copper').val());
    if(!isNaN(tmp)){
        total += tmp;
        copperfleet = tmp;
    }else{
        copperfleet = 0;
    }
    tmp = parseInt($('#input_uranium').val());
    if(!isNaN(tmp)){
        total += tmp;
        uraniumfleet = tmp;
    }else{
        uraniumfleet = 0;
    }

    if(total <= totalCapa){
        $('#load_info').html('Utilization/Capacity of your fleet: '+total+'/'+totalCapa);
        if(FirstChoice == "deploy"){
            if(sendtype == "planet"){
                $('#start_mission').prop("disabled",false);
            }else{
                $('#start_mission').prop("disabled",true);
            }
        }else{
            $('#start_mission').prop("disabled",false);
        }
    }else{
        $('#load_info').html('Utilization/Capacity of your fleet: <span class="text-dangerq">'+total+'/'+totalCapa+'</span>');
        $('#start_mission').prop("disabled",true);
    }
}

function StartMission(){
    var len = totalSelect;
    console.log(len);
    //CheckResLoad();
    //SelectedShips.forEach(function(ship,index){
        var scJson = {};
        var scCmd = {};
        scJson['username'] = username;
        //EXPLORE
        if(FirstChoice == "explore"){
            scJson['type'] = "explorespace";
            scCmd['tr_var1'] = planetid;
            scCmd['tr_var2'] = posx;
            scCmd['tr_var3'] = posy;
			scCmd['tr_var4'] = LastSelectedShipName;
        }
        //TRANSPORT
        if(FirstChoice == "transport"){
            scJson['type'] = "transport";
            scCmd['tr_var1'] = SelectedShips;
            scCmd['tr_var2'] = planetid;
            scCmd['tr_var3'] = posx;
            scCmd['tr_var4'] = posy;
            scCmd['tr_var5'] = coalfleet;
            scCmd['tr_var6'] = orefleet;
            scCmd['tr_var7'] = copperfleet;
            scCmd['tr_var8'] = uraniumfleet;
        }
        //DEPLOY
        if(FirstChoice == "deploy"){
            scJson['type'] = "deploy";
            scCmd['tr_var1'] = SelectedShips;
            scCmd['tr_var2'] = posx;
            scCmd['tr_var3'] = posy;
            scCmd['tr_var4'] = coalfleet;
            scCmd['tr_var5'] = orefleet;
            scCmd['tr_var6'] = copperfleet;
            scCmd['tr_var7'] = uraniumfleet;
            scCmd['tr_var8'] = planetid;
        }
        //ATTACK
        if(FirstChoice == "attack" || FirstChoice == "support" || FirstChoice == "siege" || FirstChoice == "breaksiege"){
            scJson['type'] = FirstChoice;
            scCmd['tr_var1'] = formationsJSON;
            scCmd['tr_var2'] = posx;
            scCmd['tr_var3'] = posy;
            scCmd['tr_var4'] = planetid;
        }

        scJson['command'] = scCmd;

        api.setAccessToken(access);
        var njson = JSON.stringify(scJson);

        var btnid = "";
        if(!undersiege){
            if(FirstChoice == "explore" || FirstChoice == "attack" || FirstChoice == "support" || FirstChoice == "siege"){
                btnid = "fleet_send_btn";
            }else{
                btnid = "start_mission";
            }
        }else{
            btnid = "fleet_attack_btn";
        }

        $('#'+btnid).html('<img src="img/loading.gif" height="15px" />');
        $('#'+btnid).prop("disabled",true);

        //console.log(scJson);

            CheckTransactions(scJson);
            CustomJsonHandler(username,sc2app,njson,function(err,cujs){
                var cu_js = cujs;
                console.log(cujs,err);
                MakeAPhonecall(apiServer + '/planetfleet',fleetrequestjson,fleettempjson,function (err,res) {
                    if(res){
                        $('#'+btnid).prop("disabled",false);
                        $('#'+btnid).html('Start Mission');
                        window.location.href = '/fleet_missions';
                    }else{
                        $('#'+btnid).prop("disabled",false);
                        $('#'+btnid).html('Start Mission');
                        alert('No response from Backend, Custom_JSON was send \n\n'+cu_js.result.operations["0"][1].json);
                    }
                },'GET',null,scJson,cu_js.result.block_num);
            });
        
}


//MISC
function NextStep(next,step){
    if(FirstChoice == "explore" && step == 3 || FirstChoice == "attack" && step == 3 || FirstChoice == "siege" && step == 3 || FirstChoice == "support" && step == 3 || FirstChoice == "breaksiege" && step == 3){
        StartMission();
    }else{
        $('#fleet_'+fleetscreen+'_div').css("display","none");
        fleetscreen = next;
        $('#fleet_'+next+'_div').css("display","block");

        screenstep = step;

        //MainLinkRender
        var LinkBuilder = "<h2>";
        if(step >= 0){
            LinkBuilder += 'Fleet'
        }
        if(step >= 1){
            LinkBuilder += ' » Select';
        }
        if(step >= 2){
            LinkBuilder += ' » Send';
        }
        if(step >= 3){
            LinkBuilder += ' » Load';
        }
        LinkBuilder += '</h2>';
        $('#fleet_header').html(LinkBuilder);

        if(step == 2){
            if(FirstChoice == "explore"){
                $('#fleet_send_btn').html('Start Mission');
                $('#planet_selection').css('display','none');
            }
            if(FirstChoice == "attack" || FirstChoice == "siege" || FirstChoice == "support" || FirstChoice == "breaksiege"){
                $('#fleet_send_btn').html('Start Mission');
            }
        }

        PreRenderSendFleet({}); 
    }
}

function EnhanceSkill(id,possible,planetForSale){
    if(!undersiege){
        console.log("not under siege")
        if(!possible){
            console.log("not possible", planetForSale, missingBaseLevel, missingMissionControl)
            $('#'+id).prop("disabled",true);
            if (planetForSale) {
                $('#ehancemc').css('display','none');
                $('#upgradebuilding').css('display','none');
                $('#preventplanetsale').css('display','block');
            } else {
                if (missingBaseLevel && missingMissionControl) {             
                    $('#preventplanetsale').css('display','none');
                    $('#upgradebuilding').css('display','block');
                    $('#ehancemc').css('display','block');
                }
                if (missingBaseLevel) {             
                    $('#preventplanetsale').css('display','none');
                    $('#upgradebuilding').css('display','block');
                    $('#ehancemc').css('display','none');
                }
                if (missingMissionControl) {             
                    $('#preventplanetsale').css('display','none');
                    $('#upgradebuilding').css('display','none');
                    $('#ehancemc').css('display','block');
                }
            }
        } else{
            //$('#'+id).prop("disabled",false);
            $('#ehancemc').css('display','none');
            $('#preventplanetsale').css('display','none');
            $('#upgradebuilding').css('display','none');
        }
    }
}

function RenderDiv(neww){
    if(neww == "main"){
        NextStep(neww,0);
    }
    if(neww == "select"){
        if(screenstep > 1){
            NextStep(neww,1);
        }
    }
    if(neww == "send"){
        if(screenstep > 2){
            NextStep(neww,2);
        }
    }
    if(neww == "load"){
        if(screenstep > 3){
            NextStep(neww,3);
        }
    }
}

function RenderPlanets(){
    console.log(FirstChoice);
    if(FirstChoice == "attack" || FirstChoice == "siege" || FirstChoice == "breaksiege" || FirstChoice == "support"){
        $( "#planet_selection" ).html("<option>Previous attacks</option>");
        var json = {};
        //json['user'] = username;
        json['planetid'] = planetid;
        json['user'] = username;
        json['limit'] = 100;
        json['outgoing'] = 1;
        json['onlyuser'] = 1;
        $.ajax({
            url: apiServer + '/loadfleetmission',
            type: 'GET',
            data: json,
            success: function(msg) {
                console.log('missions',msg);
                var crst = 0;
                msg.forEach(function(data){
                    if(data.type == "attack" && !oldattackmis.includes(data.to_planet.id)){
                        if(data.to_planet.user != username){
                            if(crst < 5){
                                $('#planet_selection').attr('onchange','FleetPlanet(null,value)')
                                $( "#planet_selection" ).append('<option value="'+data.end_x+"/"+data.end_y+'">'+data.to_planet.name+' ['+data.end_x+':'+data.end_y+'] - '+data.to_planet.user+'</option>');
                                oldattackmis.push(data.to_planet.id);
                                crst++;
                            }
                        }
                    }
                })
            }
        });
    }else{
        if(PlanetFleetSelection == ""){
            PlanetFleetSelection = $( "#planet_selection" ).html();
        }
        $( "#planet_selection" ).html(PlanetFleetSelection);
        planet_ids.forEach(function(id,index){
            $( "#planet_selection" ).append('<option value="'+id+'">'+planet_names[index]+'</option>');
            console.log(id,index);
        });
    }
}

function PreRenderSendFleet(){
    var diff = distance(posx,posy,planetx,planety);
    console.log(diff)
    if(diff == null){
        RenderSendFleet({});
        return;
    }else{
        diff = diff.toFixed(0);
    }
    if(!isNaN(diff)){
        var json = {};
        json['diff'] = diff;
        json['cons'] = totalCons;
        json['capa'] = totalCapa;
        console.log('Total Cost '+totalCons)
        json['speed'] = slowSpeed;
        json['time'] = (diff / slowSpeed) * 3600000;
        RenderSendFleet(json);
    }else{
        RenderSendFleet({});
    }
}

// MISC
function FleetPlanetChange(){
    OnPlanetChange(function(err,res){
        if(res){
            if(qs.type){
                FirstChoice = qs.type;
                if(FirstChoice == "support" || FirstChoice == "attack" || FirstChoice == "siege"){
                    GetMyFleet('select_attack',1);
                }else{
                    GetMyFleet('select',1);
                }
            }else{
                GetMyFleet('main',0);
            }
            FleetPlanetChange();

            //Reset Btn
            $('#fleet_main_btn').prop("disabled",true);
            $('#fleet_select_btn').prop("disabled",true);
        }
    });
}
FleetPlanetChange();

function distance(lat1, lon1, lat2, lon2) {
    lat1 = parseInt(lat1);
    lon1 = parseInt(lon1);
    if(lat1 != null && lon1 != null){
        var a = lat1 - lat2;
        var b = lon1 - lon2;

        var c = Math.sqrt( a*a + b*b );
        return c; 
    }else{
        return null; 
    }
}

/// URL Handler
if(qs.type){
    FirstChoice = qs.type;
    if(qs.x && qs.y){
        $("#posx").val(qs.x);
        $("#posy").val(qs.y);
        posx = parseInt(qs.x);
        posy = parseInt(qs.y);
    }
}

//GetMyFleet();
