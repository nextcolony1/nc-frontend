var makeUpgrade = false;
var upgrade_name = "";
var upgrade_prev_level = 0;

var handlernames = [];

var oldjsonupg;

function Upgrade(name){
    console.log(name + " " + makeUpgrade);
    if(makeUpgrade == false){
        makeUpgrade = true;

        //ButtonTextHandler
        document.getElementById("upg_btn_"+name).innerHTML = "Upgrading...";
        document.getElementById("upg_btn_"+name).disabled = true;
        document.getElementById("upg_btn_"+name).onclick = "";

        NewUpgrade(name);
    }
}

function NewUpgrade(name){
    var json = {};
    json['level'] = 0;
    json['name'] = name;
    json['planetID'] = planetid;
    json['busy'] = name;

    $.ajax({
        url: apiServer + '/loadcost',
        type: 'GET',
        data: json,
        success: function(msg) {
            if(msg){
                console.log("Phase 1: Loadcost");
                oldjsonupg = msg;
                var scJson = {};
                var scCmd = {};
                scJson['username'] = username;
                scJson['type'] = "upgrade";
                scCmd['tr_var1'] = planetid.toString();
                scCmd['tr_var2'] = name;
                scJson['command'] = scCmd;
        
                api.setAccessToken(access);
                var njson = JSON.stringify(scJson);
                CustomJsonHandler(username,sc2app,njson,function(err,res){
                    if(res){
                        console.log("Phase 2: Send Custom Json");
                        MakeAPhonecall("/api/loadcost",json,oldjsonupg,function(err,res){
                            if(res){
                                console.log("Phase 3: Yeah");
                                makeUpgrade = false;
                            }
                        });
                    }
                });
            }
        }
    });
}


function UpgradeHandler(name,json){
    var html = document.getElementById("upg_"+name);
    //UpgradeTime
    var date = new Date();
    //var busytime = Math.floor(SafariTime(json.busy)/1000) + date.getTimezoneOffset();
    var busytime = moment.utc(json.busy).unix();
    var utc = new Date();
    utc = utc / 1000;
    var UpgradeTimestr = "";
    var htmltimer = "";
    if(!isNaN(busytime) && busytime > utc){
        UpgradeTimestr = msToHMS((busytime - utc) * 1000);
        htmltimer = '<div style="text-align: center; color: #ffffff; font-size:12px;" id="Timer_'+name+'">Next Upgrade available in '+UpgradeTimestr+'</div>';
    }
    handlernames.push({name:name, time: busytime});

    //If Req is higher then base
    if(json.base <= baselevel || json.research <= researchlevel){
        if(parseFloat(oreqytu) >= json.ore && parseFloat(coalqytu) >= json.coal && parseFloat(copperqytu) >= json.copper && parseFloat(uraniumqytu) >= json.uranium){
            if(makeUpgrade == false){
                var dis = "";
                if(!isNaN(busytime) && busytime > utc){
                    dis = 'disabled="disabled"';
                }

                document.getElementById("upg_"+name).innerHTML =  htmltimer +'<button type="button" class="btn btn-success btn-sm btn-block" id="upg_btn_'+name+'" onclick="Upgrade(\''+name+'\')" '+dis+'>Upgrade</button>';  
            }
        }else{
            document.getElementById("upg_"+name).innerHTML = htmltimer + '<button type="button" class="btn btn-default btn-sm btn-block" disabled="disabled">Miss Resources</button>';  
        }

        if(!html.innerHTML.includes("Instant upgrade")){
           // html.innerHTML = html.innerHTML + '<button type="button" class="btn btn-info btn-sm btn-block">0.075 STEEM</button> <div style="text-align: center; color: #696969; font-size:12px;">Instant upgrade</div>';
        }
    }else{
        //Set Text
        var text = "";
        if(json.base > baselevel){
            text = "Base";
        }
        if(json.research > researchlevel){
            text = "Research";
        }
        if(json.research > researchlevel && json.base > baselevel){
            text = "Base and Research";
        }
        //Set HTML
        html.innerHTML = htmltimer + '<button type="button" class="btn btn-danger btn-sm btn-block" disabled="disabled">Upgrade '+text+'</button>';
    }
}

function UpgradeTimer(){
    var utc = new Date();
    utc = utc / 1000;
    handlernames.forEach(function(res){
        if(!isNaN(res.time) && res.time > utc){
            var UpgradeTimestr = msToHMS((res.time - utc) * 1000);
            document.getElementById("Timer_"+res.name).innerHTML = "Next Upgrade available in "+UpgradeTimestr;
        }
    });
}

function CheckUpgrade(){
    var level = 0;
    if(makeUpgrade == true){
        GetQyt();
    }
}


setInterval(function() {
    CheckUpgrade();
    UpgradeTimer();
}, 1000);