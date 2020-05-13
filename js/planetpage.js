var planet_div = "";
var loadedPlanets = 0;
var isPlanetLoaded = false;
var allPlanetIds = [];
var allPlanetData = [];
var allPlanetTotal = 0;

//Filter Var's
var FilteredType = "";
var FilteredBonus = "";

var Filterpage = "";

var navTypes = ['All','Atmosphere','Ore','Coal','Copper','Uranium'];
var navBonus = ['All','Common','Uncommon','Rare','Legendary'];

var currentFrom = 0;
var steps = 18;

var query = window.location.search.substring(1);
var qs = parse_query_string(query);

var path = window.location.pathname.split('/')[1];

var curpage = 1;
if(qs.page){
    if(parseInt(qs.page)){
        curpage = parseInt(qs.page);
    }
}
RenderPagi(curpage);
if(path == "/planets"){
    LoadMorePlanets(curpage);
}
//var steps = 600;

function GetPlanetdiv(){
    $.ajax({ type: "GET",   
        url: "include/planet_div",   
        async: false,
        success : function(html)
        {
            planet_div = html;
            console.log(html);
        }
    });
}

function LoadMorePlanets(multiply){
    var end = steps * multiply; 
    console.log("Load More");
    LoadAllPlanets((end-steps),end);
}

function LoadAllPlanets(from=0,to=steps){
    var end = steps * curpage; 

    allPlanetIds = [];
    var json = {};
    json['user'] = "";
    json['from'] = end-steps;
    json['to'] = end;

    Filterpage = "all";

    var nfrom = from;
    console.log(from,to);

    $.ajax({
        url: apiServer + '/loadplanets',
        type: 'GET',
        data: json,
        success: function(msg) {
            json = msg.planets;
            allPlanetTotal = msg.misc.total;
            RenderPagi(curpage);
            console.log(json)
        
            if(json.length == (steps-1)){
                lastpage = false;
            }else{
                lastpage = true;
            }
            console.log(json.length)
            json.forEach(el => {
                allPlanetIds.push(el.id);
            });

            if(nfrom == 0){
                loadplanetpg(allPlanetIds); 
            }else{
                loadplanetpg(allPlanetIds,false); 
            }
        },
        error: function(msg) {

        }
    });
}

function loadplanetpg(arr,first=true){
    var uniqueIds = [];
    $.each(arr, function(i, el){
        if($.inArray(el, uniqueIds) === -1) uniqueIds.push(el);
    });
    console.log(uniqueIds);
    /*document.getElementById('myplanet').innerHTML = "";
    beginrow = "<div class='row' id='planetrow_0'></div>"
    $( "#myplanet" ).prepend(beginrow);
    beginrow = "";*/
    loadedPlanets = 0;
    if(loadedPlanets < uniqueIds.length){
        loadedPlanets = 1;
        var beginrow = "";
        uniqueIds.sort();
        allPlanetData = [];
        for(i = 0; i<uniqueIds.length; i++){
            var json = {};
            var cur = i;
            json['id'] = uniqueIds[i];

            $.ajax({
                url: apiServer + '/loadplanet',
                type: 'GET',
                data: json,
                success: function(msg) {
                    json = msg;
        
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

                    var data = {};
                    data['name'] = json.planet_name;
                    data['img'] = json.img;
                    data['type'] = type;
                    data['bonus'] = bonus;
                    data['id'] = json.planet_id;
                    data['time'] = json.planet_crts;

                    allPlanetData.push(data);
                    if(loadedPlanets == uniqueIds.length){
                        ShowPlanetsFiltered(allPlanetData);
                    }


                    beginrow = "";
                    loadedPlanets++;
                },
                error: function(msg) {
        
        
                }
            });
        }
    }
}


//Navigator
function PlanetPagi(site){
    if(!curpageloading){
        if(parseInt(site)){
            window.location.href =  path+"?page="+site;
        }else{
            if(site == "next"){
                if(!lastpage){
                    curpage++;
                    window.location.href =  path+"?page="+curpage;
                }
            }
            if(site == "back"){
                if(curpage > 1){
                    curpage--;
                    window.location.href =  path+"?page="+curpage;
                }
            }
        }
    }
}

function RenderPagi(site){
    var start,end;
    var pos;
    var length = 5;
    if(site <= length){
        start = 1;
        end = length;
        pos = site;
    }else{
        start = (site - length)+1;
        end = site+length;
        pos = length;
    }
    console.log(site)

    var maxPages = parseInt(allPlanetTotal / steps);
    for(var i = 1; i < 10; i++){
        console.log('cur-page: '+i+' max-pages: '+maxPages);
        console.log(i);
        if(i > maxPages){
            console.log('cur-page: '+i+' max-pages: '+maxPages);
        }
    }

    var x = 1;
    var y = start;
    for(var i=start;i<=end;i++){
        if(x==pos){
            console.log('pos:'+x+" site:"+site)
            $('#pagi_'+x).addClass('active');
            curbtn = site;
            curpage = site;
        }else{
            $('#pagi_'+x).removeClass('active');
        }

        $('#pagi_'+x).children().text(i);
        $('#pagi_'+x).attr("onclick","PlanetPagi("+y+")")
        y++;
        x++;
    }
}

function SetFilter(category,name){
    curpage = 1;
    RenderPagi(curpage);
    history.pushState(document.title, document.title, path+"?page="+curpage);
    console.log(category,name);
    if(category == "type"){
        FilteredType = name;
        if(name == "All"){
            FilteredType = "";
        }
        document.getElementById('nav_filter_typebtn').innerHTML = name + ' <span class="caret"></span>';
    }
    if(category == "rarity"){
        FilteredBonus = name;
        if(name == "All"){
            FilteredBonus = "";
        }
        document.getElementById('nav_filter_raritybtn').innerHTML = name + ' <span class="caret"></span>';
    }
    loadedPlanets = 0;
    if(Filterpage == "all"){
        LoadAllPlanets(0,steps);
    }else{
        loadplanetpg(planet_ids);
    }
}

function SetFilterHtml(){
    document.getElementById('nav_filter_rarity').innerHTML = "";
    navBonus.forEach(el => {
        document.getElementById('nav_filter_rarity').innerHTML += '<li><a href="#" onclick="SetFilter(\'rarity\',\''+el+'\')">'+el+'</a></li>';
    });
    document.getElementById('nav_filter_type').innerHTML = "";
    navTypes.forEach(el => {
        document.getElementById('nav_filter_type').innerHTML += '<li><a href="#" onclick="SetFilter(\'type\',\''+el+'\')">'+el+'</a></li>';
    });
}

function ShowPlanetsFiltered(data){
    var uniqueData = [];
    $.each(data, function(i, el){
        if($.inArray(el, uniqueData) === -1) uniqueData.push(el);
    });
    uniqueData.sort(function(x, y){
        return x.time - y.time;
    })

    document.getElementById('myplanet').innerHTML = "";
    beginrow = "<div class='row' id='planetrow_0'></div>"
    $( "#myplanet" ).prepend(beginrow);
    beginrow = "";

    uniqueData.forEach(function(res){
        ShowPlanetFiltered(res,0);
    });
    curpageloading = false;
    $('#pagi_loading').html('<br>');
}

function ShowPlanetFiltered(data,row){
    var render = true;
    if(FilteredBonus != ""){
        if(FilteredBonus != data.bonus){
            render = false;
        }
    }
    if(FilteredType != ""){
        if(FilteredType != data.type){
            render = false;
        }
    }

    var newDiv = planet_div.replace("name_",data.name);
    newDiv = newDiv.replace("img_","img/planets/"+data.img);
    newDiv = newDiv.replace("link_","/planet/"+data.id);
    newDiv = newDiv.replace("type_",data.type);
    newDiv = newDiv.replace("bonus_",data.bonus);
    newDiv = newDiv.replace("buy_","");

    if(render){
        $( "#planetrow_"+row ).append(newDiv);
    }
    $('#loadmore').css('display','');
}

GetPlanetdiv();
SetFilterHtml();

function LoadMyPlanets(){
    var planetinterval = setInterval(function() {
        if(planet_ids.length > 0 && !isPlanetLoaded){
            if(isPlanetLoaded == false){
            loadplanetpg(planet_ids);
            }
            Filterpage = "my";
            isPlanetLoaded = true;
            clearInterval(planetinterval);
        }
    }, 100);
}