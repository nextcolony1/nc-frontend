var FleetData;
var limit = 100;
var type = null;

var onsell = [];
var optionfilter = [];

function loadFleet(){
    var fleetrequestjson = {};
    fleetrequestjson['user'] = username;
    fleetrequestjson['planet'] = planetid;
    fleetrequestjson['limit'] = limit;
    if(type){
        fleetrequestjson['type'] = type; 
    }
    console.log(fleetrequestjson)
    $.ajax({
        url: apiServer + '/planetships',
        type: 'GET',
        data: fleetrequestjson,
        success: function(data) {
            console.log(data)
            FleetData = sortedShips(data);

            if(limit == 100 && type == null){
                optionfilter = [];
                $('#selectsell').html("");
                $('#selectsell').append($('<option>', { value : "all" }).text("Type: All")); 
                var optiondata = _.chain(FleetData).sortBy("type").value();
                optiondata.forEach(function(ship){
                    var shipname = "";
                    //Yamato
                    if(ship.type.includes("yamato")){
                        var tier = ship.type.split('yamato')[1];
                        var style = "00"
                        var tiers = (style.substring(0, style.length - tier.length) + tier).toString();
                        shipname = Translate('Yamato')+' T-'+tiers
                    }else{
                        shipname = ship.longname;
                    }

                    if(!optionfilter.includes(ship.type)){
                        $('#selectsell').append($('<option>', { value : ship.type }).text(shipname)); 
                        optionfilter.push(ship.type)
                    }
                });
            }

            RenderFleetSell(FleetData);
        },
    });
}

function sortedShips(data) {
    var sortedShips = data;
    sortedShips = _.chain(sortedShips).sortBy("type").sortBy("shipyard_level").sortBy("for_sale").value();
    console.log(sortedShips)
    return sortedShips;
}


function OnPlanetChangeSellFleet(){
    OnPlanetChange(function(err,res){
        if(res){
            loadFleet();
            OnPlanetChangeSellFleet();
        }
    });
}

function RenderFleetSell(fleetdata){
    $('#fleet_st').html("");
    fleetdata.forEach(function(ship){
        var img;
        if(ship.type.includes("yamato")){
            img = "yamato";
        }else{
            img = ship.longname.replace(' ','_').toLowerCase();
        }

        var shipname = "";
        //Yamato
        if(ship.type.includes("yamato")){
            var tier = ship.type.split('yamato')[1];
            var style = "00"
            var tiers = (style.substring(0, style.length - tier.length) + tier).toString();
            shipname = Translate('Yamato')+' T-'+tiers
        }else{
            shipname = ship.longname;
        }

        var lastLine = "";
        if(ship.for_sale == 0){
            lastLine = '<div class="input-group"><input id="'+ship.id+'_sd" type="text" class="form-control input-sm" placeholder="Enter SD price..." style="font-size:12px; color:#ffffff; background-color:transparent;"><span class="input-group-btn"><button class="btn btn-info btn-sm" id="'+ship.id+'_sell" type="button">Sell</button></span></div>'
        }

        $('#fleet_st').append($('<tr>')
        .append($('<td>').append('<img src="img/ships/'+img+'.png" width="40px" style="margin: 0 5px 0 0;"> '+shipname))
        .append($('<td>').append(ship.for_sale))
        .append($('<td>').append(lastLine)))

        SellBtn(ship.id);
    })
}

function SellBtn(id){
    if(!onsell.includes(id)){
        $('#'+id+'_sd').on('input', function () {
            this.value = this.value.match(/^\d+\.?\d{0,3}/);
            $('#'+id+'_sell').unbind();
            if(this.value > 0){
                $('#'+id+'_sell').click(function() {
                    SellShip(id)
                });
                $('#'+id+'_sell').attr('disabled',false);
            }else{
                $('#'+id+'_sell').attr('disabled',true); 
            }
        });
    }else{
        $('#'+id+'_sell').attr('disabled',true); 
    }
}

function SellShip(id){
    $('#'+id+'_sell').attr('disabled','true')
    $('#'+id+'_sd').unbind();

    onsell.push(id);

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "ask";
    scCmd['tr_var1'] = "ship";
    scCmd['tr_var2'] = id.toString();
    scCmd['tr_var3'] = parseFloat($('#'+id+'_sd').val());
    scCmd['tr_var4'] = "nextcolony";
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);

    CustomJsonHandler(username,sc2app,njson,function(err,res){
        if(err){
            $('#'+id+'_sell').attr('disabled','false')
            SellBtn(id);
        }
    });
}

$("#selectsell").on('change', function() {
    if(this.value == "all"){
        type = null;
        loadFleet();
    }else{
        type = this.value;
        loadFleet();
    }
});

$('#set_btn').click(function() {
    var tlimit = $('#limit_in').val();
    if(tlimit && tlimit > 0){
        limit = tlimit;
        loadFleet()
    }
});

loadFleet();
OnPlanetChangeSellFleet();