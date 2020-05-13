var username = getCookie("user"); 
var planetid = getCookie("planetid"); 
var starterplanet = false;
var gplanetname = "";
var planetChanged = false;

var planet_type = 0;
var planet_bonus = 0;
var planet_ids = [];
var planet_names = [];
var planet_xs = [];
var planet_ys = [];

var planetx = 0;
var planety = 0;

var baselevel = 0;
var researchlevel = 0;
var shipyardlevel = 0;

var tries = 0; 


var planetrawjson = "";
var pto = 100;

function GetMyPlanets(callback = null){
    var json = {};
    if(username == ""){
        if(tries < 20){
            setTimeout(function () {
                GetMyPlanets();
            }, 1000);
            tries++;
        }else{
            console.log('Get planets failed. Try to refresh.')
        }
    }else{
        json['user'] = username;
        json['to'] = pto;
        $.ajax({ 
            url: apiServer + '/loadplanets',
            type: 'GET',
            data: json,
            cache: true,
            success: function(msg) {
                json = msg.planets;
                if(json.length == pto){
                    pto = pto + 100;
                    GetMyPlanets();
                    return;
                }
                planetrawjson = msg;
            

                planet_ids = [];
                planet_names = [];
                planet_xs = [];
                planet_ys = []

                var html = "";
                
                //html = html + '<li><a href="/myplanets.php">My Planets</a></li><li><a href="/planets.php">All Planets</a></li><li role="separator" class="divider"></li><li class="dropdown-header">Switch Planet:</li>';
                

                json.sort(dynamicSort("name"));
                console.log(json);
                json.forEach(el => {
                    html = html + '<li><a href="#" id="nav_planet'+el.id+'" onclick="loadPlanet(\''+el.id+'\')">'+el.name+'</a></li>';
                    if(!planet_ids.includes(el.id)){
                        if(!planetid && el.starter == 1){
                            planetid = el.id;
                            if(typeof loadPlanetShowcase === "function") { 
                                loadPlanetShowcase(planetid,path);
                            }
                        }
                        planet_ids.push(el.id);
                        planet_names.push(el.name);
                        planet_xs.push(el.posx);
                        planet_ys.push(el.posy);
                        if(planetid == el.id){
                            if (el.starter == 1) {
                                starterplanet = true;
                            }
                        }
                    }
                });

                document.getElementById("nav_planets").innerHTML = html;

                if(!callback){
                    loadPlanet(planetid);
                }else{
                    callback(null,true);
                }
            },
            error: function(msg) {

            }
        });
    }
}

function loadPlanet(id){
    planetChanged = true;
    setCookie("planetid",id);
    planetid = id;
    GetQyt();

    if(!planet_ids.includes(planetid)){
        planetid = null;
        GetMyPlanets();
    }

    var json = {};
    json['id'] = id;

    $.ajax({ 
        url: apiServer + '/loadplanet',
        type: 'GET',
        data: json,
        cache: true,
        success: function(msg) {
            json = msg;
            
            if (json.startplanet == 1) {
                starterplanet = true;
            }else{
                starterplanet = false;
            }

            //SetMainName
            document.getElementById("nav_curplanet").innerHTML = " "+ json.planet_name;
            document.getElementById("nav_curimg").src = "./img/planets/"+json.img;

            gplanetname = json.planet_name;

            //Planet Misc
            planet_type = json.planet_type;
            planet_bonus = json.planet_bonus;

            //Set Max Qyt
            MaxQyt("coaldepot",json.level_coaldepot)
            MaxQyt("oredepot",json.level_oredepot)
            MaxQyt("copperdepot",json.level_copperdepot)
            MaxQyt("uraniumdepot",json.level_uraniumdepot)

            var path = window.location.pathname;

            planetx = json.planet_corx;
            planety = json.planet_cory;

            baselevel = json.level_base;
            researchlevel = json.level_research;

            if(path == "/buildings"){
                LoadBuildings(json);
            }
        },
        error: function(msg) {


        }
    });
}

function loadLevel(name,level,id){
    document.getElementById("level_"+id).innerHTML = name +" "+ level;
}

function loadCost(id,json){
    try {
                json = json.cost;

                cost_base = 'COST<br><span class="glyphicon glyphicon-time" aria-hidden="true"></span> TIME';

                //DangerText Logic
                var coppercost,orecost,uraniumcost,coalcost;
                coppercost = json.copper + " Copper";
                coalcost = json.coal + " Coal";
                uraniumcost = json.uranium + " Uranium";
                orecost = json.ore + " Ore";

                if(json.copper > parseFloat(copperqytu)){
                    coppercost = "<span style='display:inline' class='text-dangerq'>"+coppercost+"</span>";
                }
                if(json.coal > parseFloat(coalqytu)){
                    coalcost = "<span style='display:inline' class='text-dangerq'>"+coalcost+"</span>";
                }
                if(json.uranium > parseFloat(uraniumqytu)){
                    uraniumcost = "<span style='display:inline' class='text-dangerq'>"+uraniumcost+"</span>";
                }
                if(json.ore > parseFloat(oreqytu)){
                    orecost = "<span style='display:inline' class='text-dangerq'>"+orecost+"</span>";
                }


                document.getElementById("cost_"+id).innerHTML = cost_base.replace("COST","Cost: "+coalcost+", "+orecost+", "+coppercost+", "+uraniumcost+"");
                cost_base = document.getElementById("cost_"+id).innerHTML;

                var time = json.time * 1000;
                var date = msToHMS(time);

                document.getElementById("cost_"+id).innerHTML = cost_base.replace("TIME",date);

                if(name == "base"){
                    baselevel = level;
                    console.log(baselevel);
                }

                if(name == "researchcenter"){
                    researchlevel = level;
                }

                if(name == "shipyard"){
                    shipyardlevel = level;
                    console.log(shipyardlevel);
                }
            } catch (error) {
        
            }
}

function loadPrd(name,level,id){
    /*var json = {};
    json['level'] = level;
    json['name'] = name;

    $.ajax({ 
        url: apiServer + '/loadprd',
        type: 'POST',
        data: json,
        success: function(msg) {
            json = JSON.parse(msg);
            
            var prdhtml = document.getElementById("prd_"+id).innerHTML;
            if(json.next){
                prdhtml = 'Current Level: CURRENTPRD '+capitalize(name)+' / Day<br>Next Level: NEXTPRD '+capitalize(name)+' / Day';
            }else{
                prdhtml = 'Current Level: CURRENTPRD '+capitalize(name)+' / Day';
            }
            document.getElementById("prd_"+id).innerHTML = prdhtml.replace("CURRENTPRD",json.current);
            prdhtml = document.getElementById("prd_"+id).innerHTML;

            document.getElementById("prd_"+id).innerHTML = prdhtml.replace("NEXTPRD",json.next);
        },
        error: function(msg) {

        }
    });*/
}

function loadCap(name,level,id){
    /*var json = {};
    json['level'] = level;
    json['name'] = name;

    $.ajax({ 
        url: apiServer + '/loadprd',
        type: 'POST',
        data: json,
        success: function(msg) {
            json = JSON.parse(msg);

            if(name.includes("depot")){
                name = name.split("depot")[0];
            }
            
            var prdhtml = document.getElementById("prd_"+id).innerHTML;
            if(json.next){
                prdhtml = 'Capacity current level: CURRENTPRD '+capitalize(name)+'<br>Capacity next level: NEXTPRD '+capitalize(name);
            }else{
                prdhtml = 'Capacity current level: CURRENTPRD '+capitalize(name);
            }
            document.getElementById("prd_"+id).innerHTML = prdhtml.replace("CURRENTPRD",json.current);
            prdhtml = document.getElementById("prd_"+id).innerHTML;

            document.getElementById("prd_"+id).innerHTML = prdhtml.replace("NEXTPRD",json.next);
        },
        error: function(msg) {

        }
    });*/
}

function MaxQyt(name,level){
    /*var json = {};
    json['level'] = level;
    json['name'] = name;

    $.ajax({ 
        url: apiServer + '/loadprd',
        type: 'POST',
        data: json,
        success: function(msg) {
            json = JSON.parse(msg);
            //Set Max QYT
            if(name == "coaldepot"){
                coalmaxqyt = json.current;
            }
            if(name == "copperdepot"){
                coppermaxqyt = json.current;
            }
            if(name == "oredepot"){
                oremaxqyt = json.current;
            }
            if(name == "uraniumdepot"){
                uraniummaxqyt = json.current;
            }

            GetQyt();
            SetQyt();
        },
        error: function(msg) {

        }
    });*/
}


//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////INTERVAL///////////////////////////

setInterval(function() {
    planetChanged = false;
    if(makeUpgrade == true || !planetid){
        GetMyPlanets();
        console.log("Reload Planets");
    }
}, 1000);

GetMyPlanets();