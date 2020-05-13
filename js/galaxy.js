var xmin,xmax,ymin,ymax;

var currentPlanetId = 0;
var curx = 0,cury = 0;

var GalaxyArray = [];

var und_modal_txt = "";
var dis_modal_txt = "";
var pla_modal_text = "";

var fleetjson;

var undersiege = false;

//Planet Modals
var modalx = 0;
var modaly = 0;

var query = window.location.search.substring(1);
var qs = parse_query_string(query);


//Render Settings
var galaxyarr = [];

var zoomLevels = [1.01,1.23,1.46,1.82,2.28,2.38,3,3.54];
var zoomp = 3;

var blocksize = 12.33;

var mobwidth = Math.floor($('#spacegrid').width());

var calcheight = 40;
var calcwidth = 40;
var calczoom = 0;

var apiheight = 120;
var apiwidth = 120;

var loaddirection = "";
var sideGalaxy = {};


var galaxyapi = apiServer;

var loadedexplorerlist = false;

//Clear Galaxy
var ZoomClears = [];

var sendbtn = null;

function StartGalaxy(){
    if(planetid){
        LoadFleetGalaxy();
        currentPlanetId = planetid;
        var json = {};
        json['id'] = planetid;

        $.ajax({
            url: galaxyapi+'/loadplanet',
            type: 'GET',
            data: json,
            success: function(msg) {
                json = msg;
                planetx = json.planet_corx;
                planety = json.planet_cory;

                CheckSiege(function(err,res){
                    if(qs.x && qs.y){
                        LoadGalaxy(parseInt(qs.x),parseInt(qs.y));
                    }else{
                        LoadGalaxy(planetx,planety);
                    }
                });
                
            },
            error: function(msg) {


            }
        });
    }else{
        if(qs.x && qs.y){
            LoadGalaxy(parseInt(qs.x),parseInt(qs.y));
        }else{
            LoadGalaxy(0,0);
        }
    }
}

function LoadGalaxy(x,y,side=null){
    if(side == 'up'){
        y = y + Math.ceil(calcheight);
    }
    if(side == 'down'){
        y = y - Math.ceil(calcheight); 
    }
    if(side == "left"){
        x = x + Math.ceil(calcwidth);
    }
    if(side == "right"){
        x = x - Math.ceil(calcwidth);
    }

    json = {};
    json['x'] = x;
    json['y'] = y;

    json['height'] = apiheight;
    json['width'] = apiwidth;

    $.ajax({
        url: galaxyapi+'/loadgalaxy',
        type: 'GET',
        data: json,
        success: function(msg) {
            json = msg;
            var explored = json.explored;
            var explore = json.explore;
            var planets = json.planets;
            var area = json.area;
            var arr = cleanGalaxyArray(explore,explored,planets);


            ymax = area.ymax;
            ymin = area.ymin;
            xmax = area.xmax;
            xmin = area.xmin;

            if(side == null){
                RenderGalaxy(arr,parseInt(x),parseInt(y));
                curx = parseInt(x);
                cury = parseInt(y);
            }else{
                RenderGalaxy(arr,parseInt(curx),parseInt(cury));
            }
        },
        error: function(msg) {


        }
    });
}

function PerformanceGalaxy(arr,x,y){
    var h = Math.ceil(calcheight/2);
    var w = Math.ceil(calcwidth/2);

    var notthere = false;

    if(ymax <= y+h || ymin >= y-h || xmax <= x+w || xmin >= x-w){
        notthere = true;
    }

    if(!notthere){
        curx = x;
        cury = y;
        RenderGalaxy(galaxyarr,x,y);
    }else{
        LoadGalaxy(curx,cury,loaddirection);
    }
}

function RenderGalaxy(arr,xoffset,yoffset){
    ClearGalaxy();
    galaxyarr = arr;
    GalaxyArray = [];
    for(var y = ymin; y < ymax; y++){
        for(var x = xmin; x < xmax; x++){
            var centerx = (xoffset + Math.ceil(calcwidth/2)-1) - x;
            var centery = (yoffset + Math.ceil(calcheight/2))- y;
            var result = $.grep(galaxyarr, function(e){ return parseInt(e.x) == x; });
            if(result.length > 0){
                var res = $.grep(result, function(e){ return parseInt(e.y) == y; });
                if(res.length > 0){
                    RenderGalaxyBlock(centerx,centery,res);
                }else{
                    RenderGalaxyBlock(centerx,centery,[{x:x,y:y,'type':'unexplored'}]);
                }
            }else{
                RenderGalaxyBlock(centerx,centery,[{x:x,y:y,'type':'unexplored'}]);
            }
        }
    }
}

function RenderGalaxyBlock(x,y,arr){
    GalaxyArray.push(arr);
    if(arr[0].type == "planet"){
        var type = arr[0].img.split("_")[0];

        $('#pos_'+x+'_'+y).removeClass("cell_undiscovered").addClass("cell_planet_"+type);

        //Earth Fix
        if(arr[0].x == 0 && arr[0].y == 0){
            $('#pos_'+x+'_'+y).css('background-image', 'url(https://nextcolony.io/img/planets/earth.png)');
        }else{
            $('#pos_'+x+'_'+y).css('background-image', 'url(https://nextcolony.io/img/planets/'+arr[0].img+')');
        }

        $('#pos_'+x+'_'+y).attr('data-target', '#PlanetCoordModal')
        $('#pos_'+x+'_'+y).click(function(){ SetPlanetModal(arr[0].x,arr[0].y); });
    }
    if(arr[0].type == "explored"){
        $('#pos_'+x+'_'+y).removeClass("cell_undiscovered").addClass("cell_discovered");
        $('#pos_'+x+'_'+y).attr('data-target', '#DiscoveredCoordModal')
        $('#pos_'+x+'_'+y).click(function(){ SetDiscoveredModal(arr[0].x,arr[0].y); });
    }
    if(arr[0].type == "explore"){
        console.log(arr);
        $('#pos_'+x+'_'+y).removeClass("cell_undiscovered").addClass("cell_discover");
        if(arr[0].user == username){
            $('#pos_'+x+'_'+y).addClass("myexploration");
        }
        $('#pos_'+x+'_'+y).click(function(){ SetUndiscoveredModal(arr[0].x,arr[0].y); });
    }
    if(arr[0].type == "unexplored" || arr[0].type == "explorespace"){
        $('#pos_'+x+'_'+y).click(function(){ SetUndiscoveredModal(arr[0].x,arr[0].y); });
    }
}

function CalcZoom(){
    var zoom = zoomLevels[zoomp];

    calczoom = blocksize*zoom;

    var nwitdh = (mobwidth - (blocksize*zoom));

    calcheight = 550 / (calczoom + 4);
    calcwidth = nwitdh / (calczoom + 4);
}

function ClearGalaxy(){
    CalcZoom();

    if(!ZoomClears[calczoom]){
        var height = calcheight;
        var width = calcwidth;

        document.getElementById('innergrid').innerHTML = "";
        for(var y = 1; y <= height; y++){
            var ny = parseInt(y);
            var data = '<div class="row2" id="galaxy_row_'+ny+'"></div>'
            $('#innergrid').append(data);
            for(var x = width; x > 0; x--){
                var nx = parseInt(x);
                var bh = calczoom;

                var data = '<div class="cell_undiscovered" id="pos_'+nx+'_'+ny+'" data-toggle="modal" style="height:'+bh+'px;width:'+bh+'px; background-size: '+bh+'px '+bh+'px;" data-target="#UndiscoveredCoordModal"></div>';
                $('#galaxy_row_'+ny).append(data);
                ZoomClears[calczoom] = $('#innergrid').html();
            }
        }
    }else{
        document.getElementById('innergrid').innerHTML = "";
        $('#innergrid').append(ZoomClears[calczoom]);
    }
}

function MoveGalaxy(xx,yy){
    var x = parseInt(xx);
    var y = parseInt(yy);
    var newx = 0, newy = 0;

    if(x < 0){
        newx = parseInt(curx) - 1;
        loaddirection = "left";
    }else{
        newx = parseInt(curx) + x;
        loaddirection = "right";
    }
    
    if(y < 0){
        newy = parseInt(cury) - 1;
        loaddirection = "down";
    }else{
        newy = parseInt(cury) + y;
        loaddirection = "up";
    }

    PerformanceGalaxy(galaxyarr,newx,newy);
    //LoadGalaxy(newx,newy);
}


function cleanGalaxyArray(explore,explored,planets){
    var cleanExplored = [];
    cleanExplored = getUnique(explored);
    var cleanArray = [];
    /*cleanExplored.forEach(function(explored,index,object){
        if(planets.length > 0){
            if(planets[index].x == explored.x && planets[index] == explored.y){
                object.splice(index,1);
            }
        }
    });*/
    cleanArray = planets.concat(cleanExplored);
    cleanArray = cleanArray.concat(explore);

    cleanArray = cleanArray.reduce((unique, o) => {
        if(!unique.some(obj => obj.x === o.x && obj.y === o.y)) {
          unique.push(o);
        }
        return unique;
    },[]);

    console.log(cleanArray)
    return cleanArray;
}

function getUnique(arr) {
    const unique = arr;
    /*const unique = arr.filter((thing,index) => {
        return index === arr.findIndex(obj => {
          var isSameX = JSON.stringify(obj.x) === JSON.stringify(thing.x)
          var isSameY = JSON.stringify(obj.y) === JSON.stringify(thing.y)
          if(isSameX && isSameY){
              return true;
          }else{
              return false;
          }
        });
      });*/
      return unique;
}

function SetGalaxyHeader(){
    //('#galaxy_header').text("Galaxy ("+(xmin-1)+"/"+(ymax-1)+" to "+(xmax+1)+"/"+(ymin+1)+")");
}

function Zooming(mode){
    if(mode == "in"){
        if(zoomp > 0){
            zoomp--;
        }
    }else{
        if(zoomp < zoomLevels.length-1){
            zoomp++;
        }
    }

    CalcZoom();

    RenderGalaxy(galaxyarr,curx,cury);
}


/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///Modal

function SetDiscoveredModal(x,y){
    GalaxyArray.forEach(function(res){
        if(res[0].x == x && res[0].y == y){
            //Change Modal Text
            if(!dis_modal_txt){
                dis_modal_txt = $('#dis_modal_text').html();
            }
            var newText = replaceAll(dis_modal_txt,"user_",res[0].user);
            newText = replaceAll(newText,"x_",res[0].x);
            newText = replaceAll(newText,"y_",res[0].y);
            newText = replaceAll(newText,"date_",moment(res[0].date * 1000).format('LL'));
            newText = replaceAll(newText,"date2_",moment(res[0].date * 1000).format('LL'));
            $('#dis_modal_text').html(newText);
        }
    });
}

function SetUndiscoveredText(res,ship,callback = null){
    var udistance = "-", utime = "-",uarrival = "-",ureturn = "-",uuranium = "-",uspeed = "-",droprate = "-";
    var ux = "-",uy="-";

    if(res){
        ux = res[0].x;
        uy = res[0].y;
        udistance = distance(res[0].x,res[0].y,planetx,planety).toFixed(0);
    }
    if(ship){
        console.log(ship)
        uspeed = ship.speed;
        //uranium
        uuranium = parseFloat(((ship.consumption*udistance)*2).toFixed(5));
        if(parseFloat(uraniumqytu) >= uuranium){
        }else{
            uuranium = '<span class="text-dangerq">'+uuranium+'</span>';
        }

        var ttime = (udistance / uspeed) * 3600000;
        var unix = new Date().getTime();
        uarrival = moment(parseInt(ttime)+unix).format('L, hh:mm:ss');
        ureturn = moment(parseInt(ttime)+parseInt(ttime)+unix).format('L, hh:mm:ss');
        utime = msToHMS(ttime,false)

        if(ship.type == 'explorership'){
            droprate = '1%'
        }
        if(ship.type == 'explorership1'){
            var dr = (0.055 * Math.exp(-60 / udistance)) * 100;
            droprate = dr.toFixed(2)+'%'
        }
    }

    var newText = replaceAll(und_modal_txt,"x_",ux);
    newText = replaceAll(newText,"y_",uy);
    newText = replaceAll(newText,"dist_",udistance);
    newText = replaceAll(newText,"time_",utime);
    newText = replaceAll(newText,"arr_",uarrival);
    newText = replaceAll(newText,"ret_",ureturn);
    newText = replaceAll(newText,"ura_",uuranium);
    newText = replaceAll(newText,"speed_",uspeed);
    newText = replaceAll(newText,"droprate_",droprate);

    $('#und_modal_text').html(newText);
    $('#av_un').text(userUnused+ '/' + userMax)
    $('#un_available_planet').text(planetUnused+ '/' + planetMax)
}

var userUnused, userMax, planetUnused, planetMax;
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

var btnclickund = false;
var undsel = null;
var undbtn = null;
function SetUndiscoveredModal(x,y){
    //Unbind
    $( "#und_modal_btn" ).unbind();
    $( "#und_selection" ).unbind();

    activeMission(function(err,ares){
        $('#und_selection').val(0);
        if(!und_modal_txt){
            und_modal_txt = $('#und_modal_text').html();
        }
        var avmi = 0
        if (ares.mission_allowed) {
          avmi = 1;
        }
        SetUndiscoveredText(null,null);
        var ress;
        GalaxyArray.forEach(function(res){
            if(res[0].x == x && res[0].y == y){
                //Change Modal Text
                if(!und_modal_txt){
                    und_modal_txt = $('#und_modal_text').html();
                }
                ress = res;
                SetUndiscoveredText(res,null,ares);
            }
        });

        var ami = 0,amii = 0,amiii = 0;
        var firstfleetload = true;
        var send = false;
        var exi = {};
        var cshipname;
        $('#und_modal_btn').prop("disabled",true);
        console.log("ships",fleetjson);
        if(firstfleetload){
            fleetjson.forEach(function(ship,index){
                if (ship.for_sale < ship.quantity) {
                    console.log("explorer",ship);
                    if(ship.type == "explorership"){
                        ami = ship.quantity;
                        exi[ship.type] = ship;
                    }
                    if(ship.type == "explorership1"){
                        amii = ship.quantity;
                        exi[ship.type] = ship;
                    }
                    if(ship.type == "explorership2"){
                        amiii = ship.quantity;
                        exi[ship.type] = ship;
                    }
                }
            });
            //firstfleetload = false;
        }

        if(!loadedexplorerlist){
            $('#und_selection').html('');
            $('#und_selection').append($('<option>', { 
                value: "0",
                text : "Choose a explorer"
            }));
            if(ami > 0){
                $('#und_selection').append($('<option>', { 
                    value: "explorership",
                    text : "Explorer I ("+ami+")"
                }));
            }
            if(amii > 0){
                $('#und_selection').append($('<option>', { 
                    value: "explorership1",
                    text : "Explorer II ("+amii+")"
                }));
            }
            if(amiii > 0){
                $('#und_selection').append($('<option>', { 
                    value: "explorership2",
                    text : "Explorer III ("+amiii+")"
                }));
            }
            //loadedexplorerlist = true;
        }

        undsel = $("#und_selection").change(function () {
            var val = this.value;
            if(val.includes("explorer")){
                SetUndiscoveredText(ress,exi[val]);
                cshipname = exi[val];
                if(avmi <= 0){
                    $('#und_modal_btn').prop("disabled",true);
                    return;
                }
                $('#und_modal_btn').prop("disabled",false);
                return;
            }
            SetUndiscoveredText(ress,null);
            $('#und_modal_btn').prop("disabled",true);
        });

        $('#UndiscoveredCoordModal').data('bs.modal').options.backdrop = true;
        $('#unmiss').attr('disabled',false)
        if(!btnclickund && x != null && y != null){
            undbtn = $( "#und_modal_btn" ).one('click', function(){
                btnclickund = true;
                $('#UndiscoveredCoordModal').data('bs.modal').options.backdrop = 'static';
                $('#unmiss').attr('disabled',true)
                
                $('#und_modal_btn').html('<img src="img/loading.gif" height="15px" />');
                $('#und_modal_btn').prop("disabled",true);
                var scJson = {};
                var scCmd = {};
                scJson['username'] = username;
                scJson['type'] = "explorespace";
                scCmd['tr_var1'] = planetid;
                scCmd['tr_var2'] = x;
                scCmd['tr_var3'] = y;
                scCmd['tr_var4'] = cshipname.type;
                scJson['command'] = scCmd;
                var njson = JSON.stringify(scJson);

                x = null;
                y = null;

                var jsonrequest = {};
                jsonrequest['user'] = username;
                jsonrequest['planet'] = planetid;
                CheckTransactions(scJson);

                CustomJsonHandler(username,sc2app,njson,function(err,cujs){
                    var cu_js = cujs;
                    console.log(cujs,err);
                    btnclickund = false;
                    if(cujs){
                        MakeAPhonecall(apiServer + '/planetfleet',jsonrequest,fleetjson,function (err,res) {
                            if(res){
                                send = false;
                                $('#und_modal_btn').html('Explore now');
                                //window.location.href = '/fleet_missions';

                                $('#UndiscoveredCoordModal').modal('hide');
                                LoadGalaxy(curx,cury);
                                LoadFleetGalaxy();
                            }else{
                                $('#UndiscoveredCoordModal').modal('hide');
                                $('#und_modal_btn').html('Explore now');
                                alert('No response from Backend, Custom_JSON was send \n\n'+cu_js.result.operations["0"][1].json);
                            }
                        },'GET',null,scJson,cu_js.result.block_num);
                    }else{
                        $('#UndiscoveredCoordModal').modal('hide');
                        $('#und_modal_btn').html('Explore now');
                    }
                });
                //window.location.href = '/fleet?type=explore&x='+x+'&y='+y;
            });
        }
    })
}

var avipl = 0;
function SetPlanetModal(x,y){
    activeMission(function(err,ares){
        if (ares.mission_allowed)
          avipl = 1;
        else {
          avipl = 0
        }
        $('#av_pl').text(ares.cur + '/' + ares.max)
        $('#available_planet').text(ares.planet_unused + '/' + ares.planet_max)

        modalx = x;
        modaly = y;
        $('#modal_mission_btn').prop('disabled',true);
        if(undersiege){
            $('#planetselectg').empty().append('<option>Choose a mission</option>').append('<option>Break Siege</option>');
        }

        GalaxyArray.forEach(function(res){
            if(res[0].x == x && res[0].y == y){
                //Change Modal Text
                if(!pla_modal_text){
                    pla_modal_text = $('#pla_modal_text').html();
                }

                var json = {};
                json['id'] = res[0].id;

                $.ajax({
                    url: galaxyapi+'/loadplanet',
                    type: 'GET',
                    data: json,
                    success: function(msg) {
                        json = msg;
                        console.log(json);

                        var starter;

                        if(json.startplanet == 1){
                            starter = "Yes";
                        }else{
                            starter = "No";
                        }

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

                        var planetname = json.planet_name.charAt(0).toUpperCase() + json.planet_name.slice(1);

                        var newText = replaceAll(pla_modal_text,"x_",res[0].x);
                        newText = replaceAll(newText,"rarity_",bonus);
                        newText = replaceAll(newText,"type_",type);
                        newText = replaceAll(newText,"id_",res[0].id);
                        newText = replaceAll(newText,"y_",res[0].y);
                        newText = replaceAll(newText,"user_",json.user);
                        newText = replaceAll(newText,"starter_",starter);
                        newText = replaceAll(newText,"name_",planetname);
                        newText = replaceAll(newText,"date_",moment(json.planet_crts * 1000).format('LL'));
                        $('#pla_modal_text').html(newText);

                        $('#pla_modal_header').html(planetname);
                    }
                });
            }
        });
    })
}

function SetMission(value){
    console.log(value);
    $( "#modal_mission_btn" ).unbind();
    if(avipl <= 0){
        return;
    }
    if(value == "Choose a mission"){
        $('#modal_mission_btn').prop('disabled',true);
    }else{
        if(!undersiege){
            $('#modal_mission_btn').prop("disabled",false);
            $('#modal_mission_btn').click(function() {
                window.location.href = '/fleet?type='+value.toLowerCase()+'&x='+modalx+'&y='+modaly;
            });
        }else{
            if(value == "breaksiege"){
                $('#modal_mission_btn').prop("disabled",false);
                $('#modal_mission_btn').click(function() {
                    window.location.href = '/fleet?type='+value.toLowerCase()+'&x='+modalx+'&y='+modaly;
                });
            }
        }
    }
}


function LoadFleetGalaxy(){
    var jsonrequest = {};
    jsonrequest['user'] = username;
    jsonrequest['planet'] = planetid;
    $.ajax({
        url: galaxyapi+'/planetfleet',
        type: 'GET',
        data: jsonrequest,
        success: function(msg) {
            try {
                fleetjson = msg;
            } catch (e) {
                fleetjson = [];
            }
        }
    });
}

function CheckSiege(callback=null){
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
                }
            })

            if(callback){
                callback(null,undersiege);
            }
        }
    });
}


////MISC
var cordd = "";
$('#cordinput').on('input', function() {
    cordd = $(this).val();
});

$("#cordinput").on('keyup', function (e) {
    if (e.keyCode === 13) {
        var splited = cordd.split('/');
        if(splited[1] && $.isNumeric(splited[0]) && $.isNumeric(splited[1])){
            LoadGalaxy(Math.floor(splited[0]),Math.floor(splited[1]));
        }
    }
});

function CordsInput(event){
    var full = event.srcElement.value + event.key;
    var splited = full.split('/');
    if(splited[1] && parseInt(splited[0]) && parseInt(splited[1])){
        LoadGalaxy(splited[0],splited[1]);
    }
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


setInterval(function() {
    if(currentPlanetId != planetid){
        window.location.href = '/galaxy';
        StartGalaxy();
        LoadFleetGalaxy();
    }
}, 1000);

$(window).on('resize', function(){
    var newwidth = Math.floor($('#spacegrid').width())
    if(newwidth != mobwidth){
        mobwidth = newwidth;
        console.log('New Width')
        RenderGalaxy(galaxyarr,curx,cury)
    }
});



