var item_div = "";
var temp_div = "";
var items = [];
var shop = []
var uid = "";
var sel_name = "";

var old_data = "";
var new_data = "";
var item_ticker = false;
var extra = "";

var planetchoosetmp = "";

var item_order = ['chest_01','chest_02','chest_03',"booster_01","booster_02","booster_03","blueprint_09","blueprint_10","blueprint_08","blueprint_15","blueprint_11","blueprint_16","blueprint_12","blueprint_17","blueprint_13","blueprint_18","blueprint_01","blueprint_19","blueprint_02","blueprint_20","blueprint_03","blueprint_21","blueprint_04","blueprint_22","blueprint_05","blueprint_23","blueprint_06","blueprint_24","blueprint_07","blueprint_14"];

function GetItemDiv(){
    $.ajax({ type: "GET",   
        url: "include/item_div",   
        async: false,
        success : function(html)
        {
            item_div = html;
        }
    });
}

function LoadItems(){
    SetQyt();
    items = [];
    var json = {};
    json['user'] = username;
    $.ajax({
        url: apiServer + '/loaditems',
        type: 'GET',
        data: json,
        success: function(msg) {
            try {
                json = msg;
            } catch (e) {
                json = [];
            }
            console.log(json)
            new_data = json;
            var typeArray = [];          
            json.forEach(Item => {
                if(!typeArray.includes(Item.id)){
                    if (Item.for_sale == 0) {
                      typeArray.push(Item.id);
                      items.push(Item);
                    }
                }
            });
            newItems = items;
            loadactivatedItems();
        }
    });
}

function itemOnSaleCount(itemId) {
   var itemOnSaleCount = 0;
   new_data.forEach(Item => {
       if (Item.id == itemId && Item.for_sale == 1) {
           itemOnSaleCount += 1;
       }
   })
   return itemOnSaleCount;
}

function loadactivatedItems(){
    var json = {};
    json['user'] = username;
    $.ajax({
        url: apiServer + '/loadshop',
        type: 'GET',
        data: json,
        success: function(jsn) {
            console.log(jsn)
            var shopids = [];
            jsn.forEach(function(data){
                shop.push(data)
                shopids = data.id;
            })

            items.sort(function(a, b){  
                return shopids.indexOf(a.id) - shopids.indexOf(b.id);
            });

            RenderItems();
        }
    });
}

var names = {};
var info = {};
function Info(name){
    marketfilter.forEach(function(data){
        names[data.type] = data.name;
        if(data.info2){
            info[data.type] = data.info2;
        }
    })

    return info[name];
}

function RenderItems(){
    $( "#item_row" ).html("");
    if(items.length == 0){
        $('#info_noitem').show();
    }

    sorting = [ 'b', 'c', 'b', 'b', 'c', 'd' ];
    result = []

    item_order.forEach(function(key) {
        var found = false;
        items = items.filter(function(item) {
            if(!found && item.id == key) {
                result.push(item);
                found = true;
                return false;
            } else 
                return true;
        })
    })

    console.log(result)

    for(var i = 0; i < result.length; i++){
        var cur_obj = result[i];

        console.log(cur_obj)
        if(cur_obj != null){
            $('#info_noitem').hide();

            temp_div = item_div;
            temp_div = temp_div.replace("name_",cur_obj.name);
            temp_div = temp_div.replace("img_","./img/shop/"+cur_obj.imgid+".png");
            if(cur_obj.coal){
                temp_div = temp_div.replace("1line_",cur_obj.coal + " " + Translate("coal") + ", " + cur_obj.ore + " " + Translate("ore"));
                temp_div = temp_div.replace("2line_",cur_obj.copper + " " + Translate("copper") + ", " + cur_obj.uranium + " " + Translate("uranium"));
                temp_div = temp_div.replace("btn_",Translate("open"));
                temp_div = temp_div.replace("target_","#OpenChestItemModal");
                temp_div = temp_div.replace("infota_","#InfoChestModal")
            }else if(cur_obj.booster){
                temp_div = temp_div.replace("1line_","Item");
                temp_div = temp_div.replace("2line_",cur_obj.booster+ "% "+ Translate("booster"));
                temp_div = temp_div.replace("3line_","");
                temp_div = temp_div.replace("4line_","");
                temp_div = temp_div.replace("btn_",Translate("merge"));
                temp_div = temp_div.replace("extra_",cur_obj.booster);
                temp_div = temp_div.replace("target_","#MergeBoosterItemModal");
                temp_div = temp_div.replace("infota_","#InfoRuneModal")
            }else if(cur_obj.blueprint){
                temp_div = temp_div.replace("1line_",'<img src="img/icons/ok3.png" width="11px" style="margin:0 3px 3px 0;"><span style="color:#add8e6;">Blueprint</span>');
                temp_div = temp_div.replace("2line_",Info(cur_obj.id));
                temp_div = temp_div.replace("btn_","Activate");
                temp_div = temp_div.replace("extra_",cur_obj.blueprint);
                temp_div = temp_div.replace("target_","#MergeBlueprintItemModal");
                temp_div = temp_div.replace("infota_","#InfoBlueprintModal")
            }else{
                temp_div = temp_div.replace("1line_","");
                temp_div = temp_div.replace("2line_","");
                temp_div = temp_div.replace("3line_","");
                temp_div = temp_div.replace("4line_","");
            }
            temp_div = replaceAll(temp_div,'uid_',cur_obj.uid);
            temp_div = temp_div.replace("extra_","");

            

            var word = "";
            if(cur_obj.total - itemOnSaleCount(cur_obj.id) > 1){
                word = "pieces";
            }else{
                word = "piece";
            }

            temp_div = temp_div.replace("total_",cur_obj.total - itemOnSaleCount(cur_obj.id));
            $( "#item_row" ).append(temp_div);
        }
    }
    ///////MODAL LOGIC
    if(planetchoosetmp == ""){
        planetchoosetmp = $( "#items_chest_modal" ).html();
    }
    GetMyPlanets(function(err,res){
        $( "#items_chest_modal" ).html(planetchoosetmp);
        $( "#items_booster_modal" ).html(planetchoosetmp);
		$( "#items_blueprint_modal" ).html(planetchoosetmp);
        planet_ids.forEach(function(id,index){
            console.log(id,index);
            $( "#items_chest_modal" ).append('<option value="'+id+'">'+planet_names[index]+'</option>');
            $( "#items_booster_modal" ).append('<option value="'+id+'">'+planet_names[index]+'</option>');
			$( "#items_blueprint_modal" ).append('<option value="'+id+'">'+planet_names[index]+'</option>');
        });
    })
}

function OpenItemModal (id,extra){
    sel_name = "";
    uid = id;
    extra = extra;
    if(extra){
        var htl = $('#items_merge_descr').html();
        htl = htl.replace("percent_",extra);
        $('#items_merge_descr').html(htl);
    }
}

var isSelling = false;
var sellopen = false;
function SellItemModal(id){
    sellopen = true;
    $('#sellitemsd').val("");
    $('#sellitembtn').html("Confirm")
    $('#SellItemModal').modal('show');
        $('#sellitembtn').unbind();
        $('#sellitembtn').attr('disabled',true);
        $('#sellitemsd').unbind();
        $('#sellitemsd').on('input', function () {
            this.value = this.value.match(/^\d+\.?\d{0,3}/);
            $('#sellitembtn').unbind();
            if(this.value > 0){
                $('#sellitembtn').click(function(){
                    SellItem(id);
                })
                $('#sellitembtn').attr('disabled',false);
            }else{
                $('#sellitembtn').attr('disabled',true); 
            }
        });
}

function SellItem(id){
    sellopen = false;
    $('#sellitembtn').attr('disabled',true);
    $('#sellitembtn').html('<img src="./img/loading.gif" height="15px" />');

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "ask";
    scCmd['tr_var1'] = "item";
    scCmd['tr_var2'] = id.toString();
    scCmd['tr_var3'] = parseFloat($('#sellitemsd').val());
    scCmd['tr_var4'] = "nextcolony";
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);

    CustomJsonHandler(username,sc2app,njson,function(res,err){
        isSelling = true;
        console.log(res,err);
        var njson = {};
        njson['user'] = username;
        MakeAPhonecall(apiServer + '/loaditems',njson, new_data,function(err,res){
            isSelling = false;
            if(!sellopen){
                $('#SellItemModal').modal('hide');
            }
            $('#sellitembtn').prop("disabled",false);
            $('#sellitembtn').html("Confirm")
            LoadItems();
        },'GET')
    });
}

function SetPlanet(name){
    if(name == "Choose a planet"){
        sel_name = "";
        $('#items_chest_modal_btn').prop('disabled', true);
    }else{
        sel_name = name;
        $('#items_chest_modal_btn').prop('disabled', false);
    }
}

function SetPlanetBooster(name){
    if(name == "Choose a planet"){
        sel_name = "";
        $('#items_merge_modal_btn').prop('disabled', true);
    }else{
        sel_name = name;
        var json = {};
        json['id'] = sel_name;

        $.ajax({
            url: apiServer + '/loadplanet',
            type: 'GET',
            data: json,
            success: function(msg) {
                console.log(msg)
                if(msg.planet_type != "earth"){
                    $('#items_merge_modal_btn').prop('disabled', false);
                }else{
                    $('#items_merge_modal_btn').prop('disabled', true);
                }
            }
        });
    }
}

function SetPlanetBlueprint(name){
    if(name == "Choose a planet"){
        sel_name = "";
        $('#blueprint_merge_modal_btn').prop('disabled', true);
    }else{
        sel_name = name;
        checkActivated(sel_name,uid,function(err,res){
            if(res == 'activated'){
                $('#blueprint_merge_modal_btn').prop('disabled', true);
            }else{
                $('#blueprint_merge_modal_btn').prop('disabled', false);
            }
        })
    }
}

function checkActivated(pln,uid,callback){
    var blueprint;
    items.forEach(function(data){
        if(data.uid == uid){
            blueprint = data.blueprint;
        }
    })
    shop.forEach(function(data){
        if(data.blueprint == blueprint){
            console.log(data.activated_planets);
            if(data.activated_planets.length > 0){
                data.activated_planets.forEach(function(plan){
                    console.log(plan,pln)
                    if(plan == pln){
                        callback(null,'activated')
                    }else{
                        callback(null,'not_activated')
                    }
                });
            }else{
                callback(null,'not_activated')
            }
        }
    })
}

function ActivateItem(){
    $('#items_chest_modal_btn').prop('disabled', true);
    $('#items_chest_modal_btn').html('<img src="img/loading.gif" height="15px" />');

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "activate";
    scCmd['tr_var1'] = uid;
    scCmd['tr_var2'] = sel_name;
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);
    if(sel_name != ""){
        CustomJsonHandler(username,sc2app,njson,function(res,err){
            SetQytCalculating(false);
            old_data = new_data;
            item_ticker = true;
            console.log(res,err);
        });
    }
}

function MergeItem(){
    $('#items_merge_modal_btn').prop('disabled', true);
    $('#items_merge_modal_btn').html('<img src="img/loading.gif" height="15px" />');
	$('#blueprint_merge_modal_btn').prop('disabled', true);
    $('#blueprint_merge_modal_btn').html('<img src="img/loading.gif" height="15px" />');


    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "activate";
    scCmd['tr_var1'] = uid;
    scCmd['tr_var2'] = sel_name;
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);
    if(sel_name != ""){
        CustomJsonHandler(username,sc2app,njson,function(res,err){
            SetQytCalculating(false);
            old_data = new_data;
            item_ticker = true;
            console.log(res,err);
        });
    }
}

function CheckChangeItems(){
    if(item_ticker == true){
        LoadItems();
        console.log(old_data.length, new_data.length);
        if(old_data.length != new_data.length){
            $('#items_chest_modal_btn').text("Open now");
            $('#OpenChestItemModal').modal('hide');
            $('#MergeBoosterItemModal').modal('hide');
			$('#MergeBlueprintItemModal').modal('hide');
            $('#GiftItemModal').modal('hide');
            $('#blueprint_merge_modal_btn').text("activate");
            SetQytCalculating(true);
            item_ticker = false;
        }
    }
}


setInterval(function() {
    CheckChangeItems();
}, 2000);

GetItemDiv();
LoadItems();