var ShipyardData = null;
var RawData = null;
var shiporder = ['transportship','transportship1','transportship2','transportship3','explorership','explorership1','scout','scout2','scout1','patrol','patrol2','patrol1','cutter','cutter2','cutter1','corvette','corvette2','corvette1','frigate','frigate2','frigate1','destroyer','destroyer2','destroyer1','cruiser','cruiser2','cruiser1','battlecruiser','battlecruiser2','battlecruiser1','carrier','carrier2','carrier1','dreadnought','dreadnought2','dreadnought1','yamato','yamato1','yamato2','yamato3','yamato4','yamato5','yamato6','yamato7','yamato8','yamato9','yamato10','yamato11','yamato12','yamato13','yamato14','yamato15','yamato16','yamato17','yamato18','yamato19','yamato20'];

var nextBuild = null;
var active = true;

var refresh = null;
var refreshIds = [];

var timer = null;
var spl = null;

function LoadShipyard(){
            var json = {};
            json['user'] = username;
            json['planet'] = planetid;
            $.ajax({
                url: apiServer + '/planetshipyard',
                type: 'GET',
                data: json,
                success: function(data) {
                    if(RawData != null && refresh != null){
                        if(compareKeys(data,RawData)){
                            return;
                        }
                    }
                    if(refreshIds.length == 0){
                        refresh = null;
                    }
                    RawData = data;

                    ShipyardData = []

                    shiporder.forEach(function(key) {
                        var found = false;
                        var d = data.filter(function(item) {
                            if(!found && item.type == key) {
                                ShipyardData.push(item);
                                if(item.busy_until > currentUTC && nextBuild == null){
                                    nextBuild = item.busy_until;
                                }
                                if(nextBuild != null && item.busy_until < nextBuild && item.busy_until > currentUTC && nextBuild != item.busy_until){
                                    nextBuild = item.busy_until;
                                }
                                found = true;
                                return false;
                            } else 
                                return true;
                        })
                    })

                    console.log("timer",nextBuild,currentUTC);
                    if(nextBuild > currentUTC){
                        timer = TickTook("nextTimer",nextBuild,function (err,res) {
                            PreLoadShipyard();
                        });
                    }else{
                        ClearTickTookf("nextTimer")
                        $('#nextTimer').html("-")
                    }

                    $('#nextRefresh').html('-');

                    FastLoadQyt(function (err,res) {
                        spl = null;
                        ShipyardBuilder(ShipyardData);
                    })
                }
            });
}

function ShipyardBuilder(shipyardData) {
    $('#shipyard').html("");

    $( ".buildbutton" ).each(function() {
        $( this ).prop("disabled",false);
    });

    shipyardData.forEach(ship => {
        var buildable = true;
        //Attack Name
        var attack_endname = "";
        if(ship.variant_name == "bullet"){
            attack_endname = " B";
        }
        if(ship.variant_name == "rocket"){
            attack_endname = " R";
        }
        if(ship.variant_name == "laser"){
            attack_endname = " L";
        }
        //Name Color
        var nameColor = "";
        if(ship.activated){
            nameColor = "white"
        }else{
            nameColor = "rgb(128, 128, 128)"
            buildable = false
            if(active){
                return;
            }
        }

        //Shipyard need
        var yard,skill;
        if(ship.shipyard_min_level <= ship.shipyard_level){
            yard = ship.shipyard_level;
        }else{
            yard = '<span class="text-dangerq">'+ship.shipyard_level+'</span>';
            buildable = false
        }
        if(ship.ship_skill == null){ship.ship_skill = 0}
        if(20 == ship.ship_skill){
            skill = ship.ship_skill;
        }else{
            skill = '<span class="text-dangerq">'+ship.ship_skill+'</span>';
            buildable = false
        }

        var scoal = ship.costs.coal, sore = ship.costs.ore, suranium = ship.costs.uranium, scopper = ship.costs.copper, sstardust = 0;
        
        if(coalqyt < ship.costs.coal){ scoal = '<span class="text-dangerq">'+ship.costs.coal+'</span>'; buildable = false}
        if(oreqyt < ship.costs.ore){ sore = '<span class="text-dangerq">'+ship.costs.ore+'</span>'; buildable = false}
        if(copperqyt < ship.costs.copper){ scopper = '<span class="text-dangerq">'+ship.costs.copper+'</span>'; buildable = false}
        if(uraniumqyt < ship.costs.uranium){ suranium = '<span class="text-dangerq">'+ship.costs.uranium+'</span>'; buildable = false}
        if(ship.costs.stardust != null){sstardust = ship.costs.stardust/100000000}
        if(stardustt < ship.costs.stardust/100000000){ sstardust = '<span class="text-dangerq">'+ship.costs.stardust/100000000+'</span>'; buildable = false}

        //Busy
        var busy = '<svg style="display:none" fill="currentColor" width="19" height="19" viewBox="0 0 24 24" class="material-design-icon__svg"><path d="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z"><title>Transaction sent</title></path></svg>'+"<span id='timer_"+ship.type+"'>-</span>";
        if(ship.busy_until > 0){
            var now = moment.utc();
            var busyUntil = moment(new Date(ship.busy_until * 1000));
            if (!now.isAfter(busyUntil)) {
                busy = "<span id='timer_"+ship.type+"'>"+ moment.duration(now.diff(busyUntil)).humanize()+"</span>";
                buildable = false
            }
        }

        //Build Button
        var build_btn = "";
        if(buildable && !refreshIds.includes(ship.type)){
            build_btn = '<button id="btn_'+ship.type+'" class="btn btn-success btn-xs buildbutton">Build</button>';
        }

        //A/D
        var attack = "-";
        if(ship.rocket > 0 || ship.bullet > 0 || ship.laser > 0){
            attack = ship.rocket + ship.bullet + ship.laser;
        }

        var defense = (ship.structure + ship.armor + ship.shield);
        if(ship.type == "yamato18" || ship.type == "yamato19" || ship.type == "yamato20"){
            defense = (defense/1000).toFixed(0) + "k"
        }

        $('#shipyard').append($('<tr>')
            .append($('<td>').append('<span style="color: '+nameColor+';">'+ship.longname+attack_endname+'</span>'))
            .append($('<td>').append(ship.shipyard_min_level))
            .append($('<td>').append(yard))
            .append($('<td>').append(skill))
            .append($('<td>').append(formatNumber(scoal)))
            .append($('<td>').append(formatNumber(sore)))
            .append($('<td>').append(formatNumber(scopper)))
            .append($('<td>').append(formatNumber(suranium)))
            .append($('<td>').append(formatNumber(sstardust)))
            .append($('<td>').append(ship.speed +' ('+ ship.basespeed + "/" + ship.battlespeed + ")"))
            .append($('<td>').append(moment.duration(parseInt(ship.costs.time), "seconds").humanize()))
            .append($('<td>').append(attack +"/"+ defense))
            .append($('<td>').append(busy))
            .append($('<td>').append(build_btn)));

        if(refresh > currentUTC && refreshIds.includes(ship.type)){
            TickTook('timer_'+ship.type,refresh/1000,function(err,res){});
        }

        ShipyardCountdown(ship.type,ship.busy_until);

        $('#btn_'+ship.type).unbind();
        $('#btn_'+ship.type).click(function(){
            $('#btn_'+ship.type).unbind();
            BuildShip(ship.type);
        })
    });
}

var sorted = "asc";
function sortAfter(sort){
    var data = ShipyardData;

    if(sort == "coal" || sort == "uranium" || sort == "copper" || sort == "ore" || sort == "stardust" || sort == "time"){
        data = data.sort((a,b) => (a.costs[sort] > b.costs[sort]) ? 1 : ((b.costs[sort] > a.costs[sort]) ? -1 : 0));
    }else if(sort == "AD"){
        data = data.sort((a,b) => ((a.rocket + a.bullet + a.laser) > (b.rocket + b.bullet + b.laser)) ? 1 : (((b.rocket + b.bullet + b.laser) > (a.rocket + a.bullet + a.laser)) ? -1 : 0));
    }else{
        data = data.sort((a,b) => (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0));
    }

    if(sorted == "asc"){
        data.reverse();
        sorted = "dec";
    }else{
        sorted = "asc";
    }

    console.log(data)

    ShipyardBuilder(data)
}

function SetTimer(){
    if(spl == null){
    refresh = Date.now() + 7000;
    refreshIds.forEach(function(data){
        if(!NewTime(data)){
            TickTook('timer_'+data,refresh/1000,function(err,res){})
        }
    })
    if(refreshIds.length > 0){
        console.log(refreshIds)
        TickTook('nextRefresh',refresh/1000,function(err,res){
            LoadShipyard();
        })
    }else{
        $('#nextRefresh').html('-')
    }
  }
}

function ClearTimerShipyard(){
    refresh = null;
    ClearTickTookf('nextRefresh');
    refreshIds.forEach(function(data){
      ClearTickTookf('timer_'+data);
    });
    refreshIds = [];
}

function BuildShip(name){
    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "buildship";
    scCmd['tr_var1'] = planetid.toString();
    scCmd['tr_var2'] = name;
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);

    console.log("Build "+name)

    $( ".buildbutton" ).each(function() {
        $( this ).prop("disabled",true);
    });

    refreshIds.push(name);
    SetTimer();
    CustomJsonHandler(username,sc2app,njson,function(err,res){
        if(res){
            if(refreshIds.includes(name)){
                var ship = GetShip(name);
                uraniumqyt = uraniumqyt - ship.costs.uranium;
                coalqyt = coalqyt - ship.costs.coal;
                oreqyt = oreqyt - ship.costs.ore;
                copperqyt = copperqyt - ship.costs.copper;
                lastUpdateQyt = Math.floor(Date.now() / 1000) - lastDiffQyt;
                SetQyt();
            }
        }

        $('#btn_'+name).css('display','none');
        ShipyardBuilder(ShipyardData);
    });
}

function GetShip(type) {
    var ship = null;
    ShipyardData.forEach(function (data) {
        if(data.type == type){
            ship = data;
        }
    })
    return ship;
}

function compareKeys(a, b) {
    var mode = true;
    a.forEach(function(data,index){
        if(b[index].busy_until != data.busy_until){
            ClearTickTookf(data.type)
            position = refreshIds.indexOf(data.type);
            if ( ~position ) refreshIds.splice(position, 1);
            mode = false;
        }
    })

    if(refreshIds.length > 0){
        SetTimer();
    }

    console.log("Compared "+mode)
    return mode;
}

function NewTime (type){
    var mode = false;
    ShipyardData.forEach(function (data) {
        if(data.type == type){
            if(data.busy_until > Date.now()/1000){
                position = refreshIds.indexOf(type);
                if ( ~position ) refreshIds.splice(position, 1);
                mode = true;
            }
        }
    })
    return mode;
}

var STickers = [];
function ShipyardCountdown(id,busy_until){
    if(STickers[id]){
        clearInterval(STickers[id]);
    }

    var STicker = setInterval(function() {
        var now = moment.utc();
        var busyUntil = moment(new Date(busy_until * 1000));
        if (!now.isAfter(busyUntil)) {
            $('#timer_'+id).html(moment.duration(now.diff(busyUntil)).humanize());
        }else{
            if(!refreshIds.includes(id)){
                $('#timer_'+id).html("-")
            }
            clearInterval(STickers[id]);
        }
    }, 1000);
    STickers[id] = STicker;
}


function ChangeMode(mode){
    if(mode == "Active"){
        active = true;
    }else{
        active = false;
    }
    $('#mode').html(mode);
    ShipyardBuilder(ShipyardData)
}

function PreLoadShipyard(){
    OnPlanetChange(function(err,res){
        if(res){
            spl = true;
            nextBuild = null;
            ClearTimerShipyard();
            LoadQyt(function (err,res) {
                PreLoadShipyard();
            })
        }
    },'shipyard_compact');
    LoadShipyard();
}

PreLoadShipyard();