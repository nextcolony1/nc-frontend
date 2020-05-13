var ranking_div = "";
var ranking_data;
var stardust_data;
var sortType = "meta_rate";

function LoadRankingDiv(type = "meta_rate"){
    $.ajax({ type: "GET",   
        url: "include/ranking_div",   
        async: false,
        success : function(html)
        {
            ranking_div = html;
            LoadRankingData(type);
        }
    });
}

function LoadRankingData(type = "meta_rate"){
    var json = {};
    json['limit'] = 150;
    if(type != "meta_rate"){
        json['sort'] = type;
    }

    if (type == "destroyed_ships_uranium") {
        json['sort'] = "destroyed";
    }


    $.ajax({
        url: apiServer + '/loadranking',
        type: 'GET',
        data: json,
        success: function(msg) {
            if(msg){
                var json = msg;
                console.log(json)
                ranking_data = json;
                if(type == "fleet"){
                    type = "ships";
                }
                ranking_data.sort((a,b) => (a[type] < b[type]) ? 1 : ((b[type] < a[type]) ? -1 : 0)); 
                //Stardust
                var json = {};
                $.ajax({
                    url: apiServer + '/wallet_ranking',
                    type: 'GET',
                    data: json,
                    success: function(njson) {
                        stardust_data = njson;
                        console.log(njson);
                        RenderRanking(ranking_data);
                    }
                });
            }
        }
    });
}

function RenderMode(type){
    console.log("render");
    LoadRankingDiv(type);
    DropdownText(type);
}

function DropdownText(type){
    if(type == "meta_rate"){
        $('#rktg').html('Production');
    }
    
    if(type == "destroyed_ships_uranium"){
        $('#rktg').html('Destroyed Ships');
    }

    if(type == "explorations"){
        $('#rktg').html('Explorations');
    }

    if(type == "planets"){
        $('#rktg').html('Planets');
    }

    if(type == "fleet"){
        $('#rktg').html('Fleet');
    }

    if(type == "meta_skill"){
        $('#rktg').html('Meta-Skill Level');
    }
}

function RenderRanking(data){
    $('#ranking_content').html('');
    data.forEach(function (el,index){
        var tmp = ranking_div;

        tmp = replaceAll(tmp,'pos_',index+1);
        tmp = replaceAll(tmp,'user_',el.user);
        tmp = replaceAll(tmp,'userimg_','https://steemitimages.com/u/'+el.user+'/avatar');
        tmp = replaceAll(tmp,'coal_',parseInt(el.coal));
        tmp = replaceAll(tmp,'ore_',parseInt(el.ore));
        tmp = replaceAll(tmp,'copper_',parseInt(el.copper));
        tmp = replaceAll(tmp,'uranium_',parseInt(el.uranium));
        tmp = replaceAll(tmp,'meta_level_',el.meta_skill);
        tmp = replaceAll(tmp,'exp_',el.explorations);
        tmp = replaceAll(tmp,'planets_',el.planets);

        tmp = replaceAll(tmp,'fle_',el.ships);
        tmp = replaceAll(tmp,'des_',el.destroyed_ships + ' ('+el.destroyed_ships_uranium+' U)');

        $('#ranking_content').append(tmp);
    });
}

LoadRankingDiv();