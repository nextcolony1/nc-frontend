var shop_div = "";
var temp_div = "";
var items = [];

var itemn = ['chest_01','chest_02','chest_03',"blueprint_11","blueprint_12","blueprint_13","blueprint_01","blueprint_02","blueprint_03","blueprint_04","blueprint_05","blueprint_06","blueprint_07","blueprint_09","blueprint_08","booster_01","booster_02","booster_03"];

function GetShopDiv(){
    $.ajax({ type: "GET",   
        url: "include/shop_div",   
        async: false,
        success : function(html)
        {
            shop_div = html;
        }
    });
}

function LoadShopItems(){
    var json = {};
    json['user'] = username;
    $.ajax({
        url: apiServer + '/loadshop',
        type: 'GET',
        data: json,
        success: function(msg) {
            json = msg;
            console.log(json);
            json.forEach(Item => {
                items.push(Item);
            });
            RenderShopItems();
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

function RenderShopItems(){
    for(var i = 0; i < items.length; i++){
        var cur_obj = null;
        items.forEach(function(item){
            if(item.id == itemn[i]){
                if(itemn.includes(item.id)){
                cur_obj = item;
                }
            }
        });
        console.log(cur_obj)
        if(cur_obj != null){
            //SteemConnect
            var obj = sc2trans+"@{'type':'buy','command':{'user':'"+username+"','itemid':'"+cur_obj.id+"','qty':'1'}}"

            temp_div = shop_div;
            temp_div = temp_div.replace("name_",cur_obj.name);
            temp_div = temp_div.replace("img_","./img/shop/"+cur_obj.imgid+".png");
            //Type
            if(cur_obj.coal){
                temp_div = temp_div.replace("1line_",cur_obj.coal + " " + Translate("coal") + ", " + cur_obj.ore + " " + Translate("ore"));
                temp_div = temp_div.replace("2line_",cur_obj.copper + " " + Translate("copper") + ", " + cur_obj.uranium + " " + Translate("uranium"));
                temp_div = temp_div.replace("3line_","");
                temp_div = temp_div.replace("max_","");
                temp_div = temp_div.replace("infota_","#InfoChestModal")
                temp_div = temp_div.replace("av_", cur_obj.left + "/" + cur_obj.total + " today left");
                        //disabled
                if(cur_obj.left <= 0){
                    temp_div = temp_div.replace("disabled_","disabled");
                }else{
                    temp_div = temp_div.replace("disabled_","");
                }
            }else if(cur_obj.booster){
                temp_div = temp_div.replace("1line_",cur_obj.booster+ "% "+ Translate("booster"));
                temp_div = temp_div.replace("2line_","");
                temp_div = temp_div.replace("3line_",cur_obj.max_left+" total left");
                temp_div = temp_div.replace("max_",cur_obj.max_left+" total left");
                temp_div = temp_div.replace("infota_","#InfoRuneModal")
                temp_div = temp_div.replace("av_", cur_obj.left + "/" + cur_obj.total + " today left");
                        //disabled
                if(cur_obj.max_left <= 0){
                    temp_div = temp_div.replace("disabled_","disabled");
                }else if(cur_obj.left <= 0){
                    temp_div = temp_div.replace("disabled_","disabled");
                }else{
                    temp_div = temp_div.replace("disabled_","");
                }
            }else if(cur_obj.blueprint){
                temp_div = temp_div.replace("1line_",'<img src="img/icons/ok3.png" width="11px" style="margin:0 3px 3px 0;"><span style="color:#add8e6;">Blueprint</span>');
                temp_div = temp_div.replace("2line_",Info(cur_obj.id));
                temp_div = temp_div.replace("3line_","");
                temp_div = temp_div.replace("max_","");
                temp_div = temp_div.replace("infota_","#InfoBlueprintModal")
                temp_div = temp_div.replace("av_", cur_obj.max_left+" total left");
                if(cur_obj.max_left <= 0){
                    temp_div = temp_div.replace("disabled_","disabled");
                }else{
                    temp_div = temp_div.replace("disabled_","");
                }
            }else{
                temp_div = temp_div.replace("1line_","");
                temp_div = temp_div.replace("2line_","");
                temp_div = temp_div.replace("3line_","");
                temp_div = temp_div.replace("4line_","");
                temp_div = temp_div.replace("max_","");
                temp_div = temp_div.replace("av_", cur_obj.left + "/" + cur_obj.total + " today");;
                if(cur_obj.left <= 0){
                    temp_div = temp_div.replace("disabled_","disabled");
                }else{
                    temp_div = temp_div.replace("disabled_","");
                }
            }
            if (cur_obj.cost)
            {
                temp_div = temp_div.replace("cost_",cur_obj.cost);
                temp_div = temp_div.replace("payment_","'"+cur_obj.cost+"','"+cur_obj.id+"'");

                $( "#shop_row" ).append(temp_div);
            }
        }
    }
}

function Payment(cost,id){
    var obj = sc2trans+"@{'type':'buy','command':{'user':'"+username+"','itemid':'"+id+"','qty':'1'}}"

    var op = ['transfer', {
        from: username,
        to: 'nextcolony',
        amount: cost+' STEEM',
        memo: obj
      }];
      steemconnect.sendOperation(op, {}, function(err, result) {
        console.log('Transfer result', err, result);
      });
}

GetShopDiv();
LoadShopItems();