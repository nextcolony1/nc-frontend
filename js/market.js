var market_div;

var userFilter = "all"
var categoryFilter = "all"
var subcategoryFilter = "all"
var typeFilter = "all"
var filterDisplay = "all"

var boughtmarket = [];


//// LOAD START
function loadMarketDiv(){
    $.ajax({ 
        type: "GET",   
        url: "include/market_div",   
        async: false,
        success : function(html)
        {
            market_div = html;
            loadMarket();
        }
    });
}

function loadMarketData(){
    $.ajax({
        url: apiServer + '/marketstats',
        type: 'GET',
        success: function(data) {
            console.log(data);
            var total = data.items_on_market + data.planets_on_market + data.ships_on_market;
            $('#totalsell').text(formatNumber(total));
        }
    });
}
loadMarketData();

function loadMarket(){
    if(!market_div){
        loadMarketDiv();
        return;
    }

    if(!stardustt){
        GetBalance(function(){
            loadMarket();
        })
        return;
    }

    var request_json = {};
    if(filterDisplay == "all"){
        request_json['active'] = 1;
    }else{
        request_json['sold'] = 1;
        request_json['orderby'] = "sold";
        request_json['order'] = "desc";
    }

    //Filter
    //User Filter
    userFilter = userFilter.toLowerCase();
    if(userFilter != "all"){
        if(userFilter == "me"){
            userFilter = username;
        }
        request_json['user'] = userFilter;
    }
    //Category Filter
    if(categoryFilter != "all"){
        request_json['category'] = categoryFilter;
    }
    //Subcategory Filter
    if(subcategoryFilter != "all"){
        request_json['subcategory'] = subcategoryFilter;
    }
    //Type Filter
    if(typeFilter != "all"){
        request_json['type'] = typeFilter;
    }

    loadAPI(request_json);
}

function loadAPI(requestjson){
    if(filterDisplay == "all"){
        requestjson['limit'] = 200;
    }
    $.ajax({
        url: apiServer + '/asks',
        type: 'GET',
        data: requestjson,
        success: function(data) {
            console.log(data);
            if(filterDisplay == "all"){
                RenderMarket(data);
            }else{
                RenderHistory(data)
            }
        }
    });
}

function BuyAsk(id){
    $('#'+id+'_btn').attr('disabled','true')

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "fill_ask";
    scCmd['tr_var1'] = id;
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);

    CustomJsonHandler(username,sc2app,njson,function(err,res){
        if(err){
            $('#'+id+'_btn').attr('disabled','false')
        }else{
            boughtmarket.push(id);
        }
    });
}

function CancelAsk(id){
    $('#'+id+'_btn').attr('disabled','true')
    boughtmarket.push(id);

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "cancel_ask";
    scCmd['tr_var1'] = id;
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);

    CustomJsonHandler(username,sc2app,njson,function(err,res){
        if(err){
            $('#'+id+'_btn').attr('disabled','false')
        }else{
            boughtmarket.push(id);
        }
    });
}

var names = {};
var info = {};
function MarketNames(name){
    marketfilter.forEach(function(data){
        names[data.type] = data.name;
        if(data.info2){
            info[data.type] = data.info2;
        }
    })

    if(names[name].includes("Yamato")){
        return names[name];
    }else{
        return names[name].replace(" BP","");
    }
}

// LOAD END

// RENDER START
function RenderFilter(category="all",subcategory="all"){
    //Set Vars
    var subcategories = [];
    var item_types = [];

    //Reset Filter
    $('#subcategory_filter').html('<option value="all">Subcategory: All</option>');
    $('#type_filter').html('<option value="all">Type: All</option>');

    //Render Subcategory and Type
    marketfilter.forEach(function(item){
        // Subcategory
        if(!subcategories.includes(item.subcategory) && item.subcategory!="all"){
            subcategories.push(item.subcategory)
            if(category != "all" && category != item.category){
            }else{
                $('#subcategory_filter').append($('<option></option>').val(item.subcategory).html(capitalize(item.subcategory.replace("booster","rune"))))
            }
        }
        // Type
        if(!item_types.includes(item.type)){
            item_types.push(item.type)
            if(category != "all" && category != item.category){
            }else{
                if(category != "planet"){
                    if(subcategory != "all" && subcategory != item.subcategory){
                    }else{
                        $('#type_filter').append($('<option></option>').val(item.type).html(item.name))
                    }
                }else{
                    $('#type_filter').append($('<option></option>').val(item.type).html(item.name))
                }
            }
        }
    })

    //Planet Subcategory Exception
    if(category == "planet"){
        $('#subcategory_filter').append($('<option></option>').val("1").html("Common"));
        $('#subcategory_filter').append($('<option></option>').val("2").html("Uncommon"));
        $('#subcategory_filter').append($('<option></option>').val("3").html("Rare"));
        $('#subcategory_filter').append($('<option></option>').val("4").html("Legendary"));
    }

    //Set Category
    $("#category_filter").val(category);
    $("#subcategory_filter").val(subcategory);

    //Activate Selection
    $("#subcategory_filter").unbind();
    $("#subcategory_filter").on('change', function() {
        subcategoryFilter = this.value;
        typeFilter = "all";
        RenderFilter(categoryFilter,subcategoryFilter);
        loadMarket();
    });

    $("#type_filter").unbind();
    $("#type_filter").on('change', function() {
        typeFilter = this.value;
        loadMarket();
    });
}

function RenderHistory(dataarray){
    $('#market_history').css('display','');
    $('#market_row').css('display','none');
    $('#market_history_tbody').html("");
    var his = dataarray;//dataarray.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
    his.forEach(function(data){
        var price = Number(data.price /1e8).toLocaleString({ style: "decimal" });
        var location = "-";
        if(data.cords_hor != null && data.cords_ver){
            location = data.cords_hor + "/" + data.cords_ver
            location = '<a href="/galaxy?x='+data.cords_hor+'&y='+data.cords_ver+'" target="_blank">'+location+'</a>'
        }

        var subcategory = data.subcategory;
        if(data.category == "planet"){
            subcategory = PlanetIDToName("special",data.subcategory)
        }

        console.log(data);
        $('#market_history_tbody').append($('<tr>')
                .append($('<td>').append(moment(data.sold*1000).format('MMMM D, YYYY [at] h:mm:ss a')))
                .append($('<td>').append(capitalize(data.category)))
                .append($('<td>').append(capitalize(subcategory)))
                .append($('<td>').append(MarketNames(data.type)))
                .append($('<td>').append(location))
                .append($('<td>').append(data.user))
                .append($('<td>').append('<span class="stardust">'+price+'</span>')))
    })
}

function RenderMarket(dataarray){
    $('#market_history').css('display','none');
    $('#market_row').css('display','block');
    $('#market_row').html("");
    dataarray.forEach(function(data,index){
        var tmp_ = market_div;
        var modaltype = "";
        var extramodal = null;

        var price = Number(data.price /1e8).toLocaleString({ style: "decimal" });

        var item_name = MarketNames(data.type);

        tmp_ = tmp_.replace("bigname_",item_name)
        tmp_ = tmp_.replace("price_",formatNumber(price))

        if(data.category == "item"){
            tmp_ = tmp_.replace("img_",'/img/shop/'+data.type+".png")
        }
        if(data.category == "ship"){
            modaltype = "Ship"
            var shipimg = "";
            if(item_name.includes("Yamato")){
                shipimg = "yamato"
            }else{
                shipimg = item_name.replace(" ","_").replace("'","").toLowerCase();
            }
            tmp_ = tmp_.replace("img_",'/img/ships/'+(shipimg)+"_q.png")
            tmp_ = tmp_.replace("info1_","Ship");
        }

        if(data.category == "planet"){
            modaltype = data.uid;
            extramodal = "'"+ formatNumber(data.price/100000000) +"'"
            tmp_ = tmp_.replace("img_",'/img/planets/'+PlanetRawToIMG(data.type,data.subcategory,data.img_id)+".png")
            tmp_ = tmp_.replace("info1_",PlanetIDToName("special",data.subcategory) + " / " + PlanetIDToName("type",data.type))
            tmp_ = tmp_.replace("info2_","Coordinate: "+data.cords_hor+"/"+data.cords_ver);
        }

        if(data.subcategory == "blueprint"){
            modaltype = "Blueprint"
            tmp_ = tmp_.replace("info1_",'<img src="img/icons/ok3.png" width="11px" style="margin:0 3px 3px 0;"><span style="color:#add8e6;">Blueprint</span>')
        }

        if(item_name.includes("Rune")){
            modaltype = "Rune"
            tmp_ = tmp_.replace("info1_","Rune")
        }

        if(item_name.includes("Chest")){
            modaltype = "Chest"
            tmp_ = tmp_.replace("info1_","Chest")
            tmp_ = tmp_.replace("info2_",'Resources <a class="tooltips" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="13px" height="13px" style="margin:-2px 0 0 0;"><span>'+info[data.type]+'</span></a>');
        }

        tmp_ = tmp_.replace("seller_",data.user)
        //Set Info 2 Text

        //Yamato
        if(item_name.includes("Yamato")){
            tmp_ = tmp_.replace("info2_","Variant: Rocket/Laser/Bullet");
        }

        if(info[data.type]){
            tmp_ = tmp_.replace("info2_",info[data.type]);
        }

        tmp_ = tmp_.replace("info2_",".");
        tmp_ = tmp_.replace('btn_',data.id+'_btn')

        //Disable Btn
        if(data.user != username){
            tmp_ = tmp_.replace('btntext_','<span class="glyphicon glyphicon-tag" aria-hidden="true" style="color:#FFF;"></span> Buy now')
            if(stardustt < data.price/100000000){
                tmp_ = tmp_.replace('disabled_','disabled')
            }
            if(boughtmarket.includes(data.id)){
                tmp_ = tmp_.replace('disabled_','disabled')
            }
        }else{
            tmp_ = tmp_.replace('btn-info','btn-primary')
            tmp_ = tmp_.replace('btntext_','Cancel')
            if(boughtmarket.includes(data.id)){
                tmp_ = tmp_.replace('disabled_','disabled')
            }
        }

        console.log(extramodal)
        tmp_ = tmp_.replace("click_","OpenMarketModal('"+modaltype+"',"+extramodal+")")

        $('#market_row').append(tmp_);

        $('#'+data.id+'_btn').unbind();
        $('#'+data.id+'_btn').click(function(){
            if(data.user != username){
                BuyAsk(data.id);
            }else{
                CancelAsk(data.id);
            }
        })
    })
}

function OpenMarketModal(id,extra){
    if(id == "Chest"){
        $('#InfoChestModal').modal('show');
        return;
    }
    if(id == "Rune"){
        $('#InfoRuneModal').modal('show');
        return;
    }
    if(id == "Blueprint"){
        $('#InfoBlueprintModal').modal('show');
        return;
    }
    if(id == "Ship"){
        $('#InfoShipModal').modal('show');
        return;
    }
    PlanetMarketModal(id,extra);
}

var planethtml = $('#infoplanetdesc').html();
function PlanetMarketModal(id,extra){
    var njson = {};
    njson['id'] = id;
    $.ajax({
        url: apiServer +'/loadplanet',
        type: 'GET',
        data: njson,
        success: function(data) {
            var type = data.planet_type;
            if(type == "earth"){
                type = "atmosphere"
            }

            var tmp_ = planethtml;
            tmp_ = tmp_.replace("name_",data.planet_name)
            tmp_ = tmp_.replace("id_",data.planet_id)
            tmp_ = tmp_.replace("id_",data.planet_id)
            tmp_ = tmp_.replace("corx_",data.planet_corx)
            tmp_ = tmp_.replace("cory_",data.planet_cory)
            tmp_ = tmp_.replace("rare_",capitalize(data.planet_rarity))
            tmp_ = tmp_.replace("type_",capitalize(type))
            tmp_ = tmp_.replace("seller_",data.user)
            tmp_ = tmp_.replace("price_",extra)
            $('#infoplanetdesc').html(tmp_)
            $('#InfoPlanetModal').modal('show');
            console.log(data);
        },
    })
}


function CategoryFilter(){
    RenderFilter("all","all");
    $("#category_filter").unbind();
    $("#category_filter").on('change', function() {
        categoryFilter = this.value;
        subcategoryFilter = "all";
        typeFilter = "all";
        RenderFilter(categoryFilter);
        loadMarket();
    });
}


// Add Action to HTML
$("#user_filter").keypress(function (e) {
    if (e.which == 13) {
        userFilter = $("#user_filter").val();
        loadMarket();
        return false;
    }
});

$('#me_btn').click(function(){
    userFilter = "me";
    $("#user_filter").val(username);
    loadMarket();
})

$('#all_btn').click(function(){
    userFilter = "all";
    $("#user_filter").val("all");
    loadMarket();
})

var refreshbtn = null;
$('#refresh_btn').click(function(){
    loadMarket();
    $('#refresh_btn').attr("disabled",true);
    setTimeout(function () {$('#refresh_btn').attr("disabled",false)}, 3000);
})

$('#market_history_btn').click(function(){
    categoryFilter = "all";
    subcategoryFilter = "all";
    RenderFilter("all","all")
    filterDisplay = "history";
    typeFilter = "all"
    loadMarket();
});


$('#market_header').click(function(){
    categoryFilter = "all";
    subcategoryFilter = "all";
    RenderFilter("all","all")
    filterDisplay = "all";
    typeFilter = "all"
    loadMarket();
});

CategoryFilter();
loadMarketDiv();