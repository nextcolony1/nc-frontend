var idd = window.location.pathname.split('/')[2];
var path = window.location.pathname.split('/')[1];

var tmp_txt = "";

var showcasejsn;
var showcaseID;
var showcasename;

if(!username){
    var username = getCookie("user");
    var access = getCookie("access");
}
var owner;
var regex = /^([a-zA-Z0-9.#_-]+)$/;

var ischangingname = false;

var planetrawjson = "";

var blueprint = [];

if(path == "planet"){
    loadPlanetShowcase(idd,path);
}


var buildings = ['base','shipyard','researchcenter','coalmine','oremine','coppermine','uraniummine','coaldepot','oredepot','copperdepot','uraniumdepot', 'bunker', 'shieldgenerator'];
var ships = ['transportship','transportship1','transportship2','explorership','explorership1','scout','scout1','scout2','patrol','patrol1','patrol2','cutter','cutter1','cutter2','corvette','corvette1','corvette2','frigate','frigate1','frigate2','destroyer','destroyer1','destroyer2','cruiser','cruiser1','cruiser2','battlecruiser','battlecruiser1','battlecruiser2','carrier','carrier1','carrier2','dreadnought','dreadnought1','dreadnought2'
                ,'yamato','yamato1','yamato2','yamato3','yamato4','yamato5','yamato6','yamato7','yamato8','yamato9','yamato10','yamato11','yamato12','yamato13','yamato14','yamato15','yamato16','yamato17','yamato18','yamato19','yamato20'];

function loadPlanets(user,name){
    $('#dname').html(name+' <span class="caret"></span>')
    LoadOwnerPlanets(user,function(err,res){
        var planets = res.planets;
        planets.sort(dynamicSort("name"));
        planets.forEach(el=>{
            $('#dlist').append('<li><a href="'+el.id+'">'+el.name+'</a></li>')
        })
    })
}

function loadPlanetShowcase(id,path){
    var njson = {};
    njson['id'] = id;
    showcaseID = id;
    page = 0;

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
            loadPlanets(json.user,json.planet_name)
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
            document.getElementById("planet_img").src = "/img/planets/"+json.img;

            //Date Logic
            var date = moment(json.planet_crts*1000).format('LL');

            json['date'] = date;
            json['type'] = type;
            json['bonus'] = bonus;
            //starter
            var starter = "No";
            if(json.startplanet == 1){
                starter = "Yes";
            }
            json['starter'] = starter;

            //shield
            var scharged = "Not charged";
            if(json.shieldcharged == 1){
                scharged = "Charged";
            }
            json['shieldCharged'] = scharged;

            //charging
            var charging = "No";
            if(json.shieldcharge_busy > currentUTC){
                charging = "Yes"
                TickTook("char_finished",json.shieldcharge_busy,function(err,res){
                    if(res){}
                },"",true);
            }
            json['Charging'] = charging;

            //protection
            var protection = "No"
            if(json.shieldprotection_busy > currentUTC){
                protection = "Yes"
                TickTook("prot_finished",json.shieldprotection_busy,function(err,res){
                    if(res){}
                },"",true);
            }
            json['Protection'] = protection;

            showcasename = json.planet_name;
            owner = json.user;

            var dataJson = {};
            dataJson['planet'] = json;

            

            DataBuilder(dataJson);
        }
    });
}

function DataBuilder(dataJson){
    //Get Last Activity
    LoadTransactions({user:owner,limit:200},function(err,res){
        if(res){
            console.log(err,res)
            var DateString = "long time ago."
            var tr_type = "";
            if(res[0]){
                DateString = moment(res[0].date*1000).format('MMMM D, YYYY [at] h:mm:ss a');
                tr_type = res[0].tr_type;
            }
            dataJson['lastActivity'] = {type:tr_type,date:DateString};
            Renderer(dataJson);
            //Get Items
            LoadItems({planetid:showcaseID,user:owner,limit:200},function(err,res){
                //if(res){
                    var chest = 0, blueprint = 0;
                    if(res){
                        res.forEach(element => {
                            if(element.uid.charAt(0) == 'C'){
                                chest++;
                            }
                            if(element.uid.charAt(0) == 'B'){
                                blueprint++;
                            }
                        });
                    }
                    dataJson['items'] = {chest:chest,blueprint:blueprint};
                    Renderer(dataJson);
                    //Load Production
                    LoadProduction({id:showcaseID,user:owner},function(err,res){
                        var rune = "No";
                        if(res.misc.rune > 0){
                            rune = res.misc.rune+"%";
                        }
                        dataJson['productions'] = {rune:rune,unfiltered:{coal:res.coal,ore:res.ore,copper:res.copper,uranium:res.uranium}};
                        Renderer(dataJson);
                        //Load Planets
                        LoadOwnerPlanets(owner,function(err,res){
                            var total = res.planets.length;
                            dataJson['planets'] = {total:total,planets:res.planets}
                            Renderer(dataJson);
                            //Load Ressources
                            LoadData({id:showcaseID},'loadqyt',function(err,res){
                                dataJson['ressources'] = res;
                                //Loading Buildings
                                LoadData({id:showcaseID},'loadbuildings',function(err,res){
                                    var preordered = {};
                                    var ordered = {};
                                    res.forEach(el =>{
                                        preordered[el.name] = el;
                                    })
                                    buildings.forEach(function(el,i){
                                        ordered[i] = preordered[el];
                                    })
                                    dataJson['buildings'] = ordered;
                                    //Load Skills
                                    LoadData({user:owner},'loadskills',function(err,res){
                                        var preordered = {};
                                        res.forEach(el =>{
                                            preordered[el.name] = el;
                                        })
                                        dataJson['skills'] = preordered;
                                        //Load Ships
                                        LoadData({id:showcaseID},'shipyard',function(err,res){
                                            var preordered = {};
                                            var ordered = {};
                                            res.forEach(el =>{
                                                preordered[el.type] = el;
                                            })
                                            ships.forEach(function(el,i){
                                                ordered[i] = preordered[el];
                                            })
                                            dataJson['ships'] = ordered;
                                            //Load Fleet
                                            LoadData({planetid:showcaseID,user:owner},'loadfleet',function(err,res){
                                                var ordered = {};
                                                res.forEach(el=>{
                                                    if(ordered[el.type]){
                                                        ordered[el.type]++;
                                                    }else{
                                                        ordered[el.type] = 1;
                                                    }
                                                })
                                                dataJson['fleet'] = ordered;
                                                //Load Missions
                                                LoadData({planetid:showcaseID,user:owner,limit:25},'loadfleetmission',function(err,res){
                                                    var activehold = {};
                                                    var allmissions = {};
                                                    var ships = {};
                                                    res.forEach(el=>{
                                                        allmissions[el.arrival] = el;
                                                        if(el.arrival >= currentUTC || el.return >= currentUTC){
                                                            activehold[el.arrival] = el;
                                                            if(el.from_planet.id == showcaseID || el.type == "deploy" || el.type == "support"){
                                                                Object.keys(el.ships).forEach(function(key) {
                                                                    if(key != "total"){
                                                                        if(ships[key]){
                                                                            ships[key] = ships[key] + el.ships[key].n;
                                                                        }else{
                                                                            ships[key] = el.ships[key].n;
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    })
                                                    console.log(ships)
                                                    const ordered = {};
                                                    Object.keys(allmissions).reverse().forEach(function(key) {
                                                        ordered[key] = allmissions[key];
                                                    });
                                                    dataJson['fleetmission'] = {active:activehold,all:ordered,ships:ships}
                                                    //Renderer(dataJson);
                                                    GetBlueprints(function(err,res){
                                                        LastRenderer(dataJson)
                                                    })
                                                })
                                            })
                                        });
                                    })
                                })
                            })
                        })
                    })
                //}
            })
        }
    })
}

function Renderer(data){
    console.log(data);
    var planetData = data.planet;
    var lastActivity = data.lastActivity;
    var items = data.items;
    var productions = data.productions;
    var planets = data.planets;
    var ressources = data.ressources;

    var text = "";
    if(tmp_txt == ""){
        tmp_txt = document.getElementById('content').innerHTML;
    }
    text = tmp_txt;
    text = replaceAll(text,'totalbonus_',planetData.total_type);
    text = replaceAll(text,'bonus_',planetData.bonus);
    text = replaceAll(text,'type_',planetData.type);
    text = replaceAll(text,'owner_',planetData.user);
    text = replaceAll(text,'corx_',planetData.planet_corx);
    text = replaceAll(text,'cory_',planetData.planet_cory);
    text = replaceAll(text,'id_',planetData.planet_id);
    text = replaceAll(text,'name_',planetData.planet_name);
    text = replaceAll(text,'date_',planetData.date);
    text = replaceAll(text,'starter_',planetData.starter);
    text = replaceAll(text,'scharged_',planetData.shieldCharged);
    text = replaceAll(text,'charging_',planetData.Charging);
    text = replaceAll(text,'protection_',planetData.Protection);
    //LastActivity
    text = replaceAll(text,'lastact_',lastActivity.date);
    //Items
    if(items){
        text = replaceAll(text,'chest_',items.chest);
        text = replaceAll(text,'blueprint_',items.blueprint);
    }else{
        text = replaceAll(text,'chest_','loading...');
        text = replaceAll(text,'blueprint_','loading...');
    }
    //Productions
    if(productions){
        text = replaceAll(text,'rune_',productions.rune);
    }else{
        text = replaceAll(text,'rune_','loading...');
    }
    //Planets
    if(planets){
        text = replaceAll(text,'plc_',planets.total)
    }else{
        text = replaceAll(text,'plc_','loading...');
    }

    var starter = null;
    if(planetData.starter == "Yes"){
        starter = true;
    }
    activeMission(starter,function(err,res){
        text = replaceAll(text,'actmis_',res.cur + ' / ' + res.max)
        document.getElementById('content').innerHTML = text;
        $('#content').css('display','block');
    })
    $('#planet_name').text(planetData.planet_name);
    //$('#content').css('display','block');
}

function LastRenderer(data){
    var productions = data.productions;
    var ressources = data.ressources;
    var planet = data.planet;
    var buildings = data.buildings;
    var skills = data.skills;
    var dships = data.ships;
    var fleet = data.fleet;
    var fleetmission = data.fleetmission;
    var activemissions = fleetmission.all;

    //Planet
    $('#mapref').attr("href", "/galaxy?y="+planet.planet_cory+'&x='+planet.planet_corx)

    //Ressources
    Object.keys(productions.unfiltered).forEach(function(key) {
        if(key != "misc"){
            var curObj = productions.unfiltered[key]; 

            //Time
            var utc = new Date();
            utc = utc / 1000;
            var diff = (utc - ressources['lastUpdate']) / (3600*24);
            var timefull = 0;
            var resam = ressources[key];
            if(ressources[key+'depot'] > ressources[key]){
                resam = ressources[key] + (diff * ressources[key+'rate']);
            }
            if(ressources[key+'depot'] < resam){
                //resam = ressources[key+'depot'];
            }else{
                timefull = (((ressources[key+'depot'] - resam) / ressources[key+'rate']) * 86400) + utc;
            }
            var percent = ((curObj.safe * 100) / ressources[key+'depot']).toFixed(2);

            $('#t_ressources').append('<tbody>').append($('<tr>')
                .append($('<td>').append(capitalize(key)))
                .append($('<td>').append('<span id="'+key+'_res">'+resam.toFixed(2)+'</span>'))
                .append($('<td>').append('<span id="'+key+'_rest">-</span>'))
                .append($('<td>').append(ressources[key+'depot'].toFixed(2)))
                .append($('<td>').append('+'+ressources[key+'rate'].toFixed(1)+'/day'))
                .append($('<td>').append(curObj.safe.toFixed(2)+' ('+percent+'%)')))

            TickTook(key+'_rest',timefull,function(err,res){
                console.log(err,res)
                $('#'+key+'_rest').text('-')
                if(!err){
                    EndCountdown();
                }
            },"",true);
            ClientResUpdate(ressources[key],ressources[key+'depot'],ressources['lastUpdate'],ressources[key+'rate'],key);
        }
    })
    //Buildings
    Object.keys(buildings).forEach(function(key) {
        var curObj = buildings[key];
        var state = "No";
        var sstate = "No";
        var skill = 0;
        if(curObj.busy > currentUTC){
            state = "Yes";
        }
        if(skills[curObj.name].busy > currentUTC){
            sstate = "Yes";
        }
        if(buildings[key].skill){
            skill = buildings[key].skill;
        }

        $('#t_buildings').append('<tbody>').append($('<tr>')
        .append($('<td>').append(Translate(curObj.name) +' (lvl. '+curObj.current+')'))
        .append($('<td>').append(state))
        .append($('<td>').append('<span id="'+buildings[key].name+'_time">-</span>'))
        .append($('<td>').append(skill))
        .append($('<td>').append(sstate))
        .append($('<td>').append('<span id="'+buildings[key].name+'_stime">-</span>')))

        TickTook(buildings[key].name+'_time',curObj.busy,function(err,res){
            console.log(err,res)
            $('#'+buildings[key].name+'_time').text('-')
            if(!err){
                EndCountdown();
            }
        },"",true);
        TickTook(buildings[key].name+'_stime',skills[curObj.name].busy,function(err,res){
            console.log(err,res)
            $('#'+buildings[key].name+'_stime').text('-')
            if(!err){
                EndCountdown();
            }
        },"",true);
    });

    //Ships
    Object.keys(dships).reverse()
    Object.keys(dships).forEach(function(key) {
        var curObj = dships[key];
        var state = "No";
        var sstate = "No";
        var skill = 0;
        var busy = 0;
        var cur = 0;
        var total = 0;
        console.log(dships)
        if(curObj.busy_until){
            busy = curObj.busy_until;
        }
        if(busy > currentUTC){
            state = "Yes";
        }
        if(skills[curObj.class].busy > currentUTC){
            sstate = "Yes";
        }
        if(dships[key].skill){
            skill = dships[key].skill;
        }
        if(fleet[curObj.type]){
            cur = fleet[curObj.type];
            total = cur;
        }
        if(fleetmission.ships[curObj.type]){
            total = total + fleetmission.ships[curObj.type];
        }

        $('#t_ships').append('<tbody>').append($('<tr>')
        .append($('<td>').append(curObj.longname))
        .append($('<td>').append(cur+' / '+total))
        .append($('<td>').append(state))
        .append($('<td>').append('<span id="'+curObj.type+'_time">-</span>'))
        .append($('<td>').append(skill))
        .append($('<td>').append(sstate))
        .append($('<td>').append('<span id="'+curObj.type+'_stime">-</span>')))

        TickTook(curObj.type+'_time',busy,function(err,res){
            console.log(err,res)
            $('#'+curObj.type+'_time').text('-')
            if(!err){
                EndCountdown();
            }
        },"",true);
        TickTook(curObj.type+'_stime',skills[curObj.class].busy,function(err,res){
            console.log(err,res)
            $('#'+curObj.type+'_stime').text('-')
            if(!err){
                EndCountdown();
            }
        },"",true);
    });

    RenderMissions(activemissions)
}

var page = 1;
function loadmore(){
    //Load Missions
    LoadData({planetid:showcaseID,user:owner,limit:25,page:page},'loadfleetmission',function(err,res){
        var allmissions = {};
        res.forEach(el=>{
            allmissions[el.arrival] = el;
        })
        const ordered = {};
        Object.keys(allmissions).reverse().forEach(function(key) {
            ordered[key] = allmissions[key];
        });
        var dataJson = {};
        dataJson['fleetmission'] = {all:ordered}
        RenderMissions(ordered)
        page++;
    })
}

function RenderMissions(activemissions){
     //Missions
    if(Object.keys(activemissions).length < 25){
        console.log('less')
        $('#loadmore').css('display','none')
    }

     console.log(activemissions)
     Object.keys(activemissions).reverse().forEach(function(key) {
        var curObj = activemissions[key];
        var shipsarr = [];

        // Planet Builder
        var planetA,planetB;
        LoadPlanetData(curObj.from_planet,function(err,res){
            planetA = res;
            LoadPlanetData(curObj.to_planet,function(err,res){
                planetB = res;

                var PAText = "";
                var PBText = "";

                if(planetA.name){
                    PAText = '<span><b>'+planetA.name+'</b><br>Rarity: '+planetA.rare+'<br>Type: '+planetA.type+'<br>Owner: '+planetA.owner+'</span>'
                }
                if(planetB.name){
                    PBText = '<span><b>'+planetB.name+'</b><br>Rarity: '+planetB.rare+'<br>Type: '+planetB.type+'<br>Owner: '+planetB.owner+'</span>'
                }

                var sym = '<img src="/img/arrow-left.png" height="8px" style="margin-left:5px;">';
                var color = "white";
                if(curObj.from_planet.id == showcaseID){
                    sym = '<img src="/img/arrow-right.png" height="8px" style="margin-left:5px;">';
                }else{
                    if(curObj.type == "attack" || curObj.type == "siege" || curObj.type == "breaksiege"){
                        color = '#a94442'
                    }
                    if(curObj.type == "deploy" || curObj.type == "support"){
                        color = '#72a4d4'
                    }
                }

                var returntime = "-";

                //Mission Status
                var status = "";
                var statuscolor = "white";
                if(curObj.result == "explorer_lost"){
                    status = 'Lost';
                    statuscolor = '#a94442'
                }
                if(curObj.result == "planet_found"){
                    status = 'Planet';
                    statuscolor = '#5CB85C'
                }

                //Attack
                if(curObj.result == 0){
                    status = 'Draw'
                    statuscolor = 'white'
                }
                var win,lose;
                if(curObj.user == owner || curObj.type == 'support' || curObj.type == 'siege'){
                    win = 2;
                    lose = 1;
                }else{
                    win = 1;
                    lose = 2;
                }

                if(curObj.result == lose){
                    status = 'Defeated'
                    statuscolor = '#a94442'
                }
                if(curObj.result == win){
                    status = 'Victory'
                    statuscolor = '#5CB85C'
                }

                if(curObj.result == 'cancel' || curObj.cancel_trx != null){
                    status = 'Aborted';
                    statuscolor = '#dad986'
                }

                if(curObj.return){
                    returntime = moment(curObj.return*1000).format('DD/MM hh:mm:ss');
                }

                //Ship Tooltip
                var shiptext = "";
                var curAmShip = 0;
                Object.keys(curObj.ships).forEach(function(name,index){
                    var valv = curObj.ships[name];
                    if(name != 'total' && valv.pos > 0 && valv.n > 0){
                        shipsarr.push({name: name, n:valv.n, pos:valv.pos});
                    }
                    /*if(Number.isInteger(valv) && name != 'total'){
                        arrayShips.push({name: name, n:valv, pos:index});
                    }*/
                });

                if(curObj.type != "transport"){
                    shipsarr.sort((a,b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0)); 
                }else{
                    shipsarr.sort(function(a, b){  
                        return ships.indexOf(a.name) - ships.indexOf(b.name);
                    });
                }

                shipsarr.forEach(function(ship){
                    if(ship.name != 'total'){
                        shiptext += Translate(ship.name) + ": " + ship.n;
                        curAmShip = curAmShip + ship.n;
                        if(curAmShip < curObj.ships.total){
                            shiptext += "<br>";
                        }
                    }
                })

                //Type Tip
                var typetip = ""
                if(curObj.resources.coal > 0 || curObj.resources.ore > 0 || curObj.resources.uranium > 0 ||  curObj.resources.copper > 0){
                    typetip = '<span>'
                    typetip += 'Coal: '+curObj.resources.coal
                    typetip += '<br>Ore: '+curObj.resources.ore
                    typetip += '<br>Copper: '+curObj.resources.copper
                    typetip += '<br>Uranium: '+curObj.resources.uranium
                    typetip += '</span>'
                }

                //Status Tip
                var activestatus = "";
                if(curObj.battles > 0){
                    activestatus = '<a href="/report?mission='+curObj.id+'" style="font-size:13px; text-decoration: none; color:'+statuscolor+';">'+status+'</a>';
                }else{
                    activestatus = '<a style="font-size:13px; text-decoration: none; color:'+statuscolor+';">'+status+'</a>';
                }

                //Explore Tooltip
                if(curObj.result == "planet_found"){
                    var typ = 'Atmosphere'
                    if(planetB.type != 'Earth'){
                        typ = planetB.type
                    }

                    var plnfnd = '<span>Rarity: '+planetB.rare+'<br>Type: '+typ+'<br>Position: '+curObj.end_x+'/'+curObj.end_y+'</span>'
                    activestatus = '<a class="tooltips" style="text-decoration: none; color:'+statuscolor+'; font-size:13px;"">'+status+plnfnd+'</a>'
                }

                if(curObj.result == "explorer_lost"){
                    var end = '<span>Explorer got lost</span>'
                    activestatus = '<a class="tooltips" style="text-decoration: none; color:'+statuscolor+'; font-size:13px;"">'+status+end+'</a>'
                }

                if(curObj.result == 'cancel' || curObj.cancel_trx != null){
                    var end = '<span>Mission was aborted</span>'
                    activestatus = '<a class="tooltips" style="text-decoration: none; color:'+statuscolor+'; font-size:13px;"">'+status+end+'</a>'
                }

                if(curObj.new_stardust != null){
                    var end = '<span><b>Stardust found</b><br>The crew found a small amount of Stardust during the exploration.<br><br>+ '+curObj.new_stardust/100000000+' Stardust</span>'
                    activestatus = '<a class="tooltips" style="text-decoration: none; color:#72bcd4; font-size:12px;"">'+curObj.new_stardust/100000000+" SD"+end+'</a>'
                }
    
                if(curObj.new_item_id != null){
                    var end = '<span><b>Blueprint found</b><br>The crew found a blueprint during the exploration. This blueprint was found:<br><br>+ '+blueprint[curObj.new_item_id]+'</span>'
                    activestatus = '<a class="tooltips" style="text-decoration: none; color:#add8e6; font-size:12px;"">'+"Blueprint"+end+'</a>'
                }
    
                if(curObj.new_item_id != null && curObj.new_stardust != null){
                    var ends = '<span><b>Stardust found</b><br>The crew found a small amount of Stardust during the exploration.<br><br>+ '+curObj.new_stardust/100000000+' Stardust</span>'
                    var endb = '<span><b>Blueprint found</b><br>The crew found a blueprint during the exploration. This blueprint was found:<br><br>+ '+blueprint[curObj.new_item_id]+'</span>'
                    activestatus = '<a class="tooltips" style="text-decoration: none; color:#72bcd4; font-size:12px;"">'+curObj.new_stardust/100000000+" SD"+ends+'</a>'
                    activestatus = activestatus + ' / <a class="tooltips" style="text-decoration: none; color:#add8e6; font-size:12px;"">'+"Blueprint"+endb+'</a>'
                }

                $('#t_missions').append('<tbody>').append($('<tr>')
                .append($('<td>').append('<a class="tooltips" style="color: '+color+'; text-decoration:none">'+Translate(curObj.type)+typetip+'</a>'+sym))
                .append($('<td>').append('<a class="tooltips" style="text-decoration:none">'+curObj.ships.total+'<span>'+shiptext+'</span></a>'))
                .append($('<td>').append('<a class="tooltips" style="text-decoration:none" onclick="LoadGalaxyA(\''+curObj.start_x+'\',\''+curObj.start_y+'\')"> ['+curObj.start_x+':'+curObj.start_y+']'+PAText+'</a>'))
                .append($('<td>').append('<a class="tooltips" style="text-decoration:none" onclick="LoadGalaxyA(\''+curObj.end_x+'\',\''+curObj.end_y+'\')"> ['+curObj.end_x+':'+curObj.end_y+']'+PBText+'</a>'))
                .append($('<td>').append('<span id="'+key+'_atime">-</span>'))
                .append($('<td>').append(moment(curObj.arrival*1000).format('DD/MM hh:mm:ss')))
                .append($('<td>').append('<span id="'+key+'_rtime">-</span>'))
                .append($('<td>').append(returntime))
                .append($('<td>').append(activestatus)))

                TickTook(key+'_atime',curObj.arrival,function(err,res){
                    console.log(err,res)
                    $('#'+key+'_atime').text('-')
                    if(!err){
                        EndCountdown();
                    }
                },"",true);
                TickTook(key+'_rtime',curObj.return,function(err,res){
                    console.log(err,res)
                    $('#'+key+'_rtime').text('-')
                    if(!err){
                        EndCountdown();
                    }
                },"",true);

                $('#content').css('display','block');
            });
        })
    })
}

function EndCountdown(){
    loadPlanetShowcase(idd,'planet')
}

function ClientResUpdate(cur,max,last,rate,res){
    setInterval(function() {
        var utc = new Date();
        utc = utc / 1000;
        var diff = (utc - last) / (3600*24);
        var resam = cur;
        if(max > cur){
            resam = cur + (diff * rate);
        }
        if(max < resam){
            //resam = max;
        }
        $('#'+res+'_res').text(resam.toFixed(2));
    },3000);
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

function LoadProduction(json,callback){
     $.ajax({
        url: apiServer + '/loadproduction',
        type: 'GET',
        data: json,
        success: function(msg) {
            if(msg){
                callback(null,msg);
            }
        }
    });
}

function LoadData(json,path,callback){
     $.ajax({
        url: apiServer + '/'+path,
        type: 'GET',
        data: json,
        success: function(msg) {
            if(msg){
                callback(null,msg);
            }
        }
    });
}

function LoadGalaxyA(x,y){
    var cordx = parseInt(x);
    var cordy = parseInt(y);

    window.location.href = '/galaxy?x='+cordx+'&y='+cordy;
}

function LoadPlanetData(json,callback){
    var pln = {};
    if(json){
        var typ = 'atmosphere'
        if(json.planet_type != 'earth'){
            typ = json.planet_type;
        }

        pln['name'] = capitalize(json.name)
        pln['rare'] = capitalize(json.bonus);
        pln['type'] = capitalize(typ);
        pln['owner'] = capitalize(json.user);
    }

    callback(null,pln);
}

function LoadTransactions(json,callback){
     $.ajax({
        url: apiServer + '/transactions',
        type: 'GET',
        data: json,
        success: function(msg) {
            if(msg){
                var newjsn = [];
                msg.forEach(element => {
                    if(element.tr_var2 == showcaseID || element.tr_var1 == showcaseID){
                        newjsn.push(element)
                    }
                });
                callback(null,newjsn);
            }
        }
    });
}

function LoadItems(json,callback){
     $.ajax({
        url: apiServer + '/activateditems',
        type: 'GET',
        data: json,
        success: function(msg) {
            if(msg){
                callback(null,msg);
            }
        },
        error: function(){
            callback('failed at items',null);
        }
        
    });
}

function LoadOwnerPlanets(owner,callback){
    var json = {};
    json['user'] = owner;
     $.ajax({
        url: apiServer + '/loadplanets',
        type: 'GET',
        data: json,
        success: function(msg) {
            callback(null,msg);
        }
    });
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function activeMission(starterplanet,callback){
    var json = {};
    json['user'] = username;
     $.ajax({
        url: apiServer + '/loadskills',
        type: 'GET',
        data: json,
        success: function(sjson) {
            var missionlevel = 0;
            sjson.forEach(function(skill){
                if(skill.name == "missioncontrol"){
                    if(starterplanet){
                        missionlevel = skill.current * 2 + 1;
                    }else{
                        missionlevel = skill.current * 2;
                    }
                }
            })
            var json = {};
            json['user'] = username;
            json['active'] = 1;
            json['onlyuser'] = 1;
             $.ajax({
                url: apiServer + '/loadfleetmission',
                type: 'GET',
                data: json,
                success: function(msg) {
                    currentMissions = msg.length;
                    console.log(currentMissions,missionlevel)
                    //callback(null,{cur:0,max:missionlevel})
                    var cur = 0;
                    if(missionlevel-currentMissions > 0){
                        cur = missionlevel-currentMissions;
                    }
                    callback(null,{cur:(missionlevel-currentMissions),max:missionlevel})
                }
            })
        }
    });
}

//loadPlanet();