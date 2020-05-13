var production_div = "";
var path = window.location.pathname.split('/')[1];
var production_misc;

var productiondata = null;

function LoadProductionDiv(){
    $.ajax({ type: "GET",   
        url: "include/production_div",   
        async: false,
        success : function(html)
        {
            production_div = html;        
            productiondata = null;    
            LoadProductionData();

        }
    });
}

function LoadProductionData(callback = null){
    var json = {};
    json['id'] = planetid;
    json['user'] = username;

    if(productiondata == null){
        $.ajax({
            url: apiServer + '/loadproduction',
            type: 'GET',
            data: json,
            success: function(msg) {
                if(msg){
                    var json = msg;
                    console.log(msg)
                    if(!callback){
                        if(path == "production1" || path == "production"){
                            var sortedJson = {};
                            sortedJson['coal'] = json.coal;
                            sortedJson['ore'] = json.ore;
                            sortedJson['copper'] = json.copper;
                            sortedJson['uranium'] = json.uranium;
                            sortedJson['misc'] = json.misc;

                            RenderProduction(sortedJson);
                            $('#planetname').html(json.misc.planet_name);
                        }
                    }
                    production_misc = json.misc;
                    productiondata = production_misc;
                    if(callback){
                        callback(null,production_misc);
                    }
                }
            }
        });
    }else{
        if(callback){
            callback(null,productiondata);
        }
    }
}

function RenderProduction(prd_data){
    console.log(prd_data);
    $('#production_content').html('');
    $.each(prd_data, function(index, el) {
        console.log(index,el)
        if(index != 'misc'){
            if(el.booster == null){
                el.booster = 0; 
            }
            //Variables
            var totalbooster = el.booster*0.5;
            var hourproduction = el.production/24;

            var dayboost = (el.production * totalbooster)/100;
            var hourboost = (hourproduction * totalbooster)/100;

            var raritybooster = el.production;
            var dayrarity = (prd_data.misc.rate * raritybooster)/100;
            var hourrarity = ((prd_data.misc.rate/24) * raritybooster)/100;

            var runebooster = el.production;
            var dayrune = (prd_data.misc.rune * runebooster)/100;
            var hourrune = ((prd_data.misc.rune/24) * runebooster)/100;

            var daytotal = el.production + dayboost;
            var hourtotal = hourproduction + hourboost;

            var dayshield = 0, hourshield = 0;

            if(prd_data.misc.type != index || prd_data.misc.bonus == "common"){
            }else{
                daytotal += dayrarity;
                hourtotal += hourrarity;
            }
            if(prd_data.misc.type != index || prd_data.misc.bonus == "common" && prd_data.misc.type == 0){
            }else{
                daytotal += dayrune;
                hourtotal += hourrune;
            }

            if(prd_data.misc.shieldcharge_busy > currentUTC){
                dayshield = (daytotal * 0.1);
                hourshield = (hourtotal * 0.1);

                daytotal = daytotal - dayshield
                hourtotal = hourtotal - hourshield
            }
            console.log(dayshield)

            ///Time Calculator
            var CurrentRessource = 0;
            if(index == "coal"){
                CurrentRessource += coalqytu;
            }
            if(index == "ore"){
                CurrentRessource += oreqytu;
            }
            if(index == "copper"){
                CurrentRessource += copperqytu;
            }
            if(index == "uranium"){
                CurrentRessource += uraniumqytu;
            }

            var TimeNeeded = ((parseInt(el.depot) - CurrentRessource) / hourtotal) * 3600000;
            var utc = new Date().getTime();
            var tmpTotalTime = msToHMS(TimeNeeded);
            var TotalTime = parseInt(TimeNeeded + utc) / 1000;

            var tmp = production_div;
            //First Line
            tmp = replaceAll(tmp,'ressource_',capitalize(index));
            tmp = replaceAll(tmp,'level_',el.level);

            tmp = replaceAll(tmp,'prdpd_',el.production.toFixed(2));
            tmp = replaceAll(tmp,'prdph_',hourproduction.toFixed(2));

            //Second Line
            tmp = replaceAll(tmp,'booster_',el.booster);
            tmp = replaceAll(tmp,'boosterpd_',dayboost.toFixed(2));
            tmp = replaceAll(tmp,'boosterph_',hourboost.toFixed(2));
            if(totalbooster == 0){
                tmp = replaceAll(tmp,'boosterper_','');
            }else{
                tmp = replaceAll(tmp,'boosterper_','+'+totalbooster+'%');
            }

            //Third Line
            tmp = replaceAll(tmp,'rare_',capitalize(prd_data.misc.bonus));
            tmp = replaceAll(tmp,'rareper_','+'+prd_data.misc.rate+'%');
            tmp = replaceAll(tmp,'rarepd_',dayrarity.toFixed(2));
            tmp = replaceAll(tmp,'rareph_',hourrarity.toFixed(2));
            if(prd_data.misc.type != index || prd_data.misc.bonus == "common"){
                tmp = replaceAll(tmp,'rareboostdp','none');
            }

            //Fourth Line
            tmp = replaceAll(tmp,'rune_',capitalize(prd_data.misc.rune_name));
            tmp = replaceAll(tmp,'runeper_','+'+prd_data.misc.rune+'%');
            tmp = replaceAll(tmp,'runepd_',dayrune.toFixed(2));
            tmp = replaceAll(tmp,'runeph_',hourrune.toFixed(2));
            if(prd_data.misc.rune == 0 || prd_data.misc.rune == null){
                tmp = replaceAll(tmp,'runeboostdp','none');
            }else{
                if(prd_data.misc.type != index || prd_data.misc.bonus == "common"){
                    tmp = replaceAll(tmp,'runeboostdp','none');
                }
            }

            //Fifth Line
            tmp = replaceAll(tmp,'shieldpd',dayshield.toFixed(2));
            tmp = replaceAll(tmp,'shieldph',hourshield.toFixed(2));
            if(prd_data.misc.shieldcharge_busy > currentUTC){
                tmp = replaceAll(tmp,'shielddp','block');
            }else{
                tmp = replaceAll(tmp,'shielddp','none');
            }

            //Total Line
            tmp = replaceAll(tmp,'totalpd_',daytotal.toFixed(2));
            tmp = replaceAll(tmp,'totalph_',hourtotal.toFixed(2));

            tmp = replaceAll(tmp,'totaldepot_',el.depot);
			
			tmp = replaceAll(tmp,'safe_',el.safe.toFixed(2));
			
            if((TotalTime*1000) > utc){
                console.log(TotalTime);
                tmp = replaceAll(tmp,'fullin_',tmpTotalTime);
                TickTook('fullin'+capitalize(index),TotalTime,function(err,res){
                    if(res){
                        tmp = replaceAll(tmp,'fullindp','none');
                    }
                })
            }else{
                tmp = replaceAll(tmp,'fullindp','none');
                tmp = replaceAll(tmp,'fullin_',""); 
            }

            $('#production_content').append(tmp);
        }
        console.log(index,el);
    }); 

    $(function(){
        $('[data-toggle="popover"]').popover()
    })
}

function ProductionPlanetTricker(){
    OnPlanetChange(function (err,res) {
        if(res){
            LoadProductionDiv();
            ProductionPlanetTricker();
        }
    },'production') 
}

ProductionPlanetTricker();
LoadProductionDiv();