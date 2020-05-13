var building_div = "";
var shield_div = "";
var temp_div = "";

var buildings = ['base','shipyard','researchcenter','coalmine','oremine','coppermine','uraniummine','coaldepot','oredepot','copperdepot','uraniumdepot', 'bunker', 'shieldgenerator'];

var buildings_arr = [];

var reloadBuildings = false;
var isUpgrading = false;
var isCharging = false;
var isEnabling = false;
var shieldcharge_busy = 0;
var shieldprotection_busy = 0;
var shieldcharged = 0;
var oldJsonBuildings;

var skilltree;
var prddata;
var researchlevel;

function GetBuildingDiv(){
    $.ajax({ type: "GET",   
        url: "include/building_div",   
        async: false,
        success : function(html)
        {
            building_div = html;
            GetShildDiv();
        }
    });
}

function GetShildDiv(){
    $.ajax({ type: "GET",   
        url: "include/building_shield_div",   
        async: false,
        success : function(html)
        {
            shield_div = html;
            LoadBuildings();
        }
    });
}


function LoadBuildings(){
    LoadQyt(function(err,res){
        if(res){
            var json = {};
            json['id'] = planetid;
            $.ajax({
                url: apiServer + '/loadbuildings',
                type: 'GET',
                data: json,
                success: function(msg) {
                    try {
                        json = msg;
                    } catch (e) {
                        json = [];
                    }

                    oldJsonBuildings = json;
                    json.forEach(Item => {
                        buildings_arr.push(Item);
                    });
                    LoadSkill();
                }
            });
        }
    })
}

function LoadSkill(){
    var json = {};
    json['user'] = username;
    $.ajax({
        url: apiServer + '/loadskills',
        type: 'GET',
        data: json,
        success: function(msg) {
            skilltree = msg;
            console.log(msg);
            LoadProduction();
        }
    });
}

function LoadProduction(){
    var json = {};
    json['id'] = planetid;
    json['user'] = username;

    $.ajax({
        url: apiServer + '/loadproduction',
        type: 'GET',
        data: json,
        success: function(json) {
            var sortedJson = {};
            sortedJson['coal'] = json.coal;
            sortedJson['ore'] = json.ore;
            sortedJson['copper'] = json.copper;
            sortedJson['uranium'] = json.uranium;
            sortedJson['misc'] = json.misc;
            prddata = sortedJson;
            PreRenderBuildings();
        }
    });
}

function PreRenderBuildings(){
    OnPlanetChange(function(err,res){
        if(res){
            isUpgrading = false;
            isCharging = false;
            isEnabling = false;
            LoadBuildings();
            LoadProductionDiv();
        }
    },'buildings');
    RenderBuildings();
}

function RenderBuildings(){
    $( "#Buildings" ).html("");
    for(var i = 0; i < buildings.length; i++){
        var cur_obj;
        var UpgradeCost = "";
        buildings_arr.forEach(function(building){
            if(building.name == buildings[i]){
                cur_obj = building;
            }
        });
        if(cur_obj){
            var level = parseInt(cur_obj.current);
            var time = msToHMS(cur_obj.time * 1000);
            var enough = true;
            var isBuilding = false;
			var isCharging = false;
			var isEnabling = false;
			if (cur_obj.name == "shieldgenerator")
			{
                UpgradeCost = "Upgrade ";

                temp_div = shield_div;
				var shieldcharge_busy = 0;
				var shieldprotection_busy = 0;
                var shieldcharged = 0;
                var shieldcharge_start = 0;

				shieldcharge_busy = cur_obj.misc.shieldcharge_busy;
				shieldprotection_busy = cur_obj.misc.shieldprotection_busy;
                shieldcharged = (cur_obj.misc.shieldcharged);

                var chargetime = (level * 4.8) * 3600;
					
                
				console.log(cur_obj);
				if(shieldcharge_busy > currentUTC){
                    temp_div = temp_div.replace('charingtext_','Charging in progress, finish in ');
                    shieldcharge_start = shieldcharge_busy - (level * 4.8) * 3600;

					isCharging = true;
                    temp_div = temp_div.replace("displaychargetimer_","block");
                    temp_div = temp_div.replace('pro_dis_','block');
					TickTook(cur_obj.name+"chargetimer",shieldcharge_busy,function(err,res){
						if(res){
							AwaitChangeBuildings();
						}
                    });
                    TickTook(cur_obj.name+"chargetimer2",shieldcharge_busy,function(err,res){
						if(res){
							AwaitChangeBuildings();
						}
                    });
                    //Processbar
                    var cr = currentUTC;
                    
                    var elp = cr - shieldcharge_start;
                    var prg = (elp / (shieldcharge_busy - shieldcharge_start)) * 100;

                    temp_div = temp_div.replace('prgn_',cr);
                    temp_div = temp_div.replace('prgne_',shieldcharge_busy);
                    temp_div = temp_div.replace('prgpr_',prg);
                    setInterval(function() {
                        cr = currentUTC;

                        elp = cr - shieldcharge_start;
                        prg = (elp / (shieldcharge_busy - shieldcharge_start)) * 100;
                        
                        $('#shieldprgbar').css('width',prg+"%")
                    }, 5000);
				}else{
                    temp_div = temp_div.replace('charingtext_','Charging time: '+msToHMS(chargetime * 1000));
                    //temp_div = temp_div.replace('pro_dis_','none');
					temp_div = temp_div.replace("displaychargetimer_","none");
				}
				if(shieldprotection_busy > currentUTC){
					isEnabling = true;
					temp_div = temp_div.replace("displayshieldtimer_","block");
					TickTook(cur_obj.name+"protectiontimer",shieldprotection_busy,function(err,res){
						if(res){
							AwaitChangeBuildings();
						}
					});
				}else{
					temp_div = temp_div.replace("displayshieldtimer_","none");
				}

				if (level == 0)
				{
					temp_div = temp_div.replace("chargedisabled_","disabled");
					temp_div = temp_div.replace("protectiondisabled_","disabled");
					
                }
                
                ///Production Level
                var curlvl = (level * 2.4) * 3600000;
                var nextlvl = ((level+1) * 2.4) * 3600000;

                temp_div = temp_div.replace('curprdlvl_',msToHMS(curlvl))
                temp_div = temp_div.replace('nextprdlvl_',msToHMS(nextlvl))

                
				
				console.log(shieldprotection_busy);
				if(isCharging || shieldcharged == 1){
					temp_div = temp_div.replace("chargedisabled_","disabled");
				}else{
					temp_div = temp_div.replace("chargedisabled_","");
					temp_div = temp_div.replace("onclickcharge_","Charge('"+cur_obj.name+"')");
				}
				if(isEnabling || shieldcharged == 0){
					temp_div = temp_div.replace("protectiondisabled_","disabled");
				}else{
					temp_div = temp_div.replace("protectiondisabled_","");
					temp_div = temp_div.replace("onclickprotection_","Enable('"+cur_obj.name+"')");
				}
				//}
			}
			else
			{
                temp_div = building_div;
				 temp_div = temp_div.replace("displaychargetimer_","none");
				 temp_div = temp_div.replace("chargedisplay_","none");
				 temp_div = temp_div.replace("displayshieldtimer_","none");
				 temp_div = temp_div.replace("protectiondisplay_","none");
			}
            temp_div = replaceAll(temp_div,"name_",Translate(cur_obj.name)+" "+level);
            temp_div = replaceAll(temp_div,"id_",cur_obj.name);
            temp_div = replaceAll(temp_div,"time_",time);
            temp_div = replaceAll(temp_div,"desc_",Translate(cur_obj.name+"_desc"));

            ////Costs
            var CostBuilder = "";
            if (cur_obj.name == "shieldgenerator")
			{
                CostBuilder = UpgradeCost + "cost" + ": ";
            }else{
                CostBuilder = UpgradeCost + Translate("cost") + ": ";
            }
            CostBuilder += RessourceBuilder(cur_obj.coal,cur_obj.ore,cur_obj.copper,cur_obj.uranium).cost;
            enough = RessourceBuilder(cur_obj.coal,cur_obj.ore,cur_obj.copper,cur_obj.uranium).enough;

            if(!enough){
                WaitForEnoughRes(cur_obj.coal,cur_obj.ore,cur_obj.copper,cur_obj.uranium,function(err,res){
                    if(res){
                        RenderBuildings();
                    }
                });
            }

            temp_div = replaceAll(temp_div,"cost_",CostBuilder);

            //Rare - Rune Booster
            var prdtext = "";
            if(cur_obj.name.includes('mine')){
                var res = cur_obj.name.replace('mine','');
                var prd = 0;
                LoadProductionData(function(err,res){
                    if(production_misc.type == res && production_misc.bonus != "common"){
                        prd += production_misc.rate;
                        if(production_misc.rune > 0){
                            console.log(prd);
                            prd += production_misc.rune;
                        }
                    }
                    if(prd > 0){
                        prdtext = ' (<span style="color:#5cb85c;">+'+prd+'%</span>)'
                    }else{
                        prdtext = "";
                    }
                })
            }

            if(cur_obj.name == "researchcenter"){
                researchlevel = level;
            }

            //Ressource Translation
            var res = "";
            var resl = "";
            if(cur_obj.name.includes("mine")){
                res = Translate(cur_obj.name.replace("mine",""));
                res += " / Day"+prdtext;
                resl += "";
            }
            if(cur_obj.name.includes("depot")){
                res = Translate(cur_obj.name.replace("depot",""));
                res += "";
                resl += "";
            }

            //Skill Tree
            var depotskill = 0;
            var rcenter = 0;
            var bunkerskill = 0;

            skilltree.forEach(function(skill){
                if(skill.name == "depotincrease"){
                    depotskill = skill.current;
                }
                if(skill.name == "researchcenter"){
                    rcenter = skill.current;
                }
                if(skill.name == "enlargebunker"){
                    bunkerskill = skill.current;
                }
            });

            //Productivity
            if(cur_obj.cur_rate){
                var prd_builder = '<p style="display: dis_prd; font-size: 13px">Current Level: '+cur_obj.cur_rate+" "+res;
                if(cur_obj.next_rate){
                    prd_builder = prd_builder +"<br>Next Level: "+cur_obj.next_rate+" "+resl;
                }
                prd_builder = prd_builder + "</p>"

                //Mine
                if(cur_obj.name.includes("mine")){
                    var res = cur_obj.name.replace('mine','');
                    $.each(prddata, function(index, el) {
                        if(index == res){
                            var totalbooster = el.booster*0.5;
                
                            var raritybooster = el.production;
                            var dayrarity = (prddata.misc.rate * raritybooster)/100;
                
                            var runebooster = el.production;
                            var dayrune = (prddata.misc.rune * runebooster)/100;

                            var prc = totalbooster;
                            var br = "";
                            var totalres = cur_obj.cur_rate;
                            if(el.booster > 0){
                                prd_builder = prd_builder + br+'<span style="font-size:13px;">Production Increase <a href="skills">Skill</a> (lvl. '+el.booster+') <span style="color:#5cb85c;">+'+prc+'%</span>: '+((prc/100) * cur_obj.cur_rate).toFixed(2)+' '+Translate(res)+' / Day</span>';
                                totalres += parseFloat(((prc/100) * cur_obj.cur_rate).toFixed(2))
                                br = "<br>";
                            }

                            if(prddata.misc.type == res && prddata.misc.rate > 0){
                                prd_builder = prd_builder + br+'<span style="font-size:13px;">Rarity Boost <a class="tooltips" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="14px" height="14px" style="margin:-3px 0 0 0;"><span>Based on the rarity your planet gets a boost to the associated type. These are the possible rarity boost levels in ascending order: Uncommon (10%), Rare (20%), Legendary (100%).</span></a> ('+capitalize(prddata.misc.bonus)+') <span style="color:#5cb85c;">+'+prddata.misc.rate+'%</span>: '+(dayrarity).toFixed(2)+' '+Translate(res)+' / Day</span>';
                                totalres += parseFloat((dayrarity).toFixed(2))
                                br = "<br>";
                            }

                            if(prddata.misc.rune > 0 && prddata.misc.type == res){
                                prd_builder = prd_builder + br+'<span style="font-size:13px;">Rune Boost <a class="tooltips" href="" style="text-decoration:none;font-size:11px;"><img src="img/icons/info.png" width="14px" height="14px" style="margin:-3px 0 0 0;"><span>The rune boost supports the rarity boost. There are three different runes in the shop. These are the possible gradations: Rune (20%), Mighty Rune (50%), Holy Rune (100%).</span></a> ('+prddata.misc.rune_name+') <span style="color:#5cb85c;">+'+prddata.misc.rune+'%</span>: '+dayrune.toFixed(2)+' '+Translate(res)+' / Day</span>';
                                totalres += parseFloat((dayrune).toFixed(2))
                                br = "<br>";
                            }

                            if(totalres > cur_obj.cur_rate){
                                prd_builder = prd_builder + '<p style="font-size:13px; margin:10px 0 0 0;"><b>Total Production:</b> '+totalres.toFixed(2)+' '+Translate(res)+' / Day</p>';
                            }

                            console.log("rarity",res,dayrarity);
                            console.log("rune",res,dayrune);
                        }
                    });
                };

                //DEPOT
                if(cur_obj.name.includes("depot")){
                    var res = cur_obj.name.replace('depot','');
                    $.each(prddata, function(index, el) {
                        if(index == res){
                            var depotu = (cur_obj.cur_rate * (depotskill * 2.5))/100;
                            var ru = (cur_obj.cur_rate * (researchlevel * 2.5))/100;
                            var tot = cur_obj.cur_rate + depotu + ru;

                            //Production
                            var totalbooster = el.booster*0.5;
                            var hourproduction = el.production/24;
                
                            var dayboost = (el.production * totalbooster)/100;
                            var hourboost = (hourproduction * totalbooster)/100;

                            var daytotal = el.production + dayboost;
                            var hourtotal = hourproduction + hourboost;

                            var raritybooster = el.production;
                            var dayrarity = (prddata.misc.rate * raritybooster)/100;
                            var hourrarity = ((prddata.misc.rate/24) * raritybooster)/100;

                            var runebooster = el.production;
                            var dayrune = (prddata.misc.rune * runebooster)/100;
                            var hourrune = ((prddata.misc.rune/24) * runebooster)/100;

                            var dayshield = 0, hourshield = 0;

                            if(prddata.misc.type != index || prddata.misc.bonus == "common"){
                            }else{
                                daytotal += dayrarity;
                                hourtotal += hourrarity;
                            }
                            if(prddata.misc.type != index || prddata.misc.bonus == "common" && prddata.misc.type == 0){
                            }else{
                                daytotal += dayrune;
                                hourtotal += hourrune;
                            }

                            if(prddata.misc.shieldcharge_busy > currentUTC){
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
                            /////////

                            if(depotskill > 0){
                                prd_builder = prd_builder + '<span style="font-size:13px;">Depots Capacity Increase <a href="skills">Skill</a> (lvl. '+depotskill+') <span style="color:#5cb85c;">+'+toFixed((depotskill * 2.5),2)+'%</span>: '+depotu.toFixed(2)+' '+capitalize(Translate(res))+'</span>';
                            }
                            if(researchlevel > 0){
                                if(depotskill > 0){
                                    prd_builder = prd_builder + '<br>'
                                }
                                prd_builder = prd_builder + '<span style="font-size:13px;">Research Center (lvl. '+researchlevel+') <span style="color:#5cb85c;">+'+toFixed((researchlevel * 2.5),2)+'%</span>: '+ru.toFixed(2)+' '+capitalize(Translate(res))+'</span>';
                            }


                            var fullin = ' (full in: <span id="depot_'+res+'_timer"></span>)';
                            console.log(res,TotalTime)
                            if((TotalTime*1000) > utc){
                                TickTook('depot_'+res+'_timer',TotalTime,function(err,res){
                                    if(res){
                                        $('depot_'+res).text("");
                                    }
                                })
                            }else{
                                fullin = "";
                            }


                            prd_builder = prd_builder + '<p style="font-size:13px; margin:10px 0 0 0;"><b>Total Capacity</b><span id="depot_'+res+'">'+fullin+'</span>: '+toFixed(tot,2)+' '+capitalize(Translate(res))+'</p>';

                            prd_builder = prd_builder + '<div style="border-bottom: 1px solid rgba(255, 255, 255, 0.20);margin:16px 0 14px 0;"></div>';

                            //Safe
                            var safep = (el.safe * 100) / tot; 

                            prd_builder = prd_builder + '<span style="font-size:13px;"><span style="color:#5cb85c;">Safe:</span> '+toFixed(el.safe,2)+' '+capitalize(Translate(res))+' ('+toFixed(safep,2)+'% of the total capacity)</span>';
                        }
                    });
                };
                
                temp_div = replaceAll(temp_div,"prd_",prd_builder);
                temp_div = replaceAll(temp_div,"dis_prd","block");
            }else{
                //temp_div = replaceAll(temp_div,"prd_","");
                //temp_div = replaceAll(temp_div,"dis_prd","none");
            }

            //Bunker
            if(cur_obj.name.includes("bunker")){
                var level = parseInt(cur_obj.current);

                var protection = 0;
                var sprotection = 5 + (level * 0.50);
                var nprotection = 5 + ((level+1) * 0.50);
                    protection = sprotection + (bunkerskill * 0.25);

                var prd_builder = '<p style="display: dis_prd; font-size: 13px">Protection Current Level: '+sprotection.toFixed(2)+"%";
                    prd_builder = prd_builder +"<br>Protection Next Level: "+nprotection.toFixed(2)+"%";
                    prd_builder = prd_builder + "</p>"

                if(bunkerskill > 0){
                    prd_builder = prd_builder + '<span style="font-size:13px;">Bunker Protection Increase <a href="skills">Skill</a> (lvl. '+bunkerskill+'): <span style="color:#5cb85c;">+'+(bunkerskill * 0.25)+'%</span></span>'
                }

                prd_builder = prd_builder + '<p style="font-size:13px; margin:10px 0 0 0;"><b>Total Protection:</b> '+protection.toFixed(2)+'%</p>';

                temp_div = replaceAll(temp_div,"prd_",prd_builder);
                temp_div = replaceAll(temp_div,"dis_prd","block");
            }

            if(Translate(cur_obj.name+"_note").length > 0){
                temp_div = replaceAll(temp_div,"prd_","<p style='font-size:13px'>"+Translate(cur_obj.name+"_note")+"</p>");
            }

            ////Upgrade Logic
            if(cur_obj.busy > currentUTC){
                isBuilding = true;
                temp_div = temp_div.replace("displaytimer_","block");
                TickTook(cur_obj.name+"timer",cur_obj.busy,function(err,res){
                    if(res){
                        AwaitChangeBuildings();
                    }
                });
            }else{
                temp_div = temp_div.replace("displaytimer_","none");
            }

            //Button
            if(level >= 20){
                temp_div = temp_div.replace("color_","success");
                temp_div = temp_div.replace("btn_","Max. Level");
                temp_div = temp_div.replace("disabled_","disabled");
            }

            if(cur_obj.skill < level+1){
                temp_div = temp_div.replace("color_","danger");
                temp_div = temp_div.replace("btn_",Translate('enhance')+" "+Translate(cur_obj.name) + " Skill");
                temp_div = temp_div.replace("onclick_","window.location.href = '/skills'");
                temp_div = temp_div.replace("disabled_","");
            }

            if(enough){
                temp_div = temp_div.replace("color_","success");
                temp_div = temp_div.replace("btn_",Translate('upgrade'));
                if(isBuilding){
                    temp_div = temp_div.replace("disabled_","disabled");
                }else{
                    temp_div = temp_div.replace("disabled_","");
                    temp_div = temp_div.replace("onclick_","Upgrade('"+cur_obj.name+"')");
                }
            }else{
                temp_div = temp_div.replace("color_","default");
                temp_div = temp_div.replace("btn_",Translate('miss_resources'));
                temp_div = temp_div.replace("disabled_","disabled");
            }

            $( "#Buildings" ).append(temp_div);
        }
    }
}

function AfterRenderBuildings(){
    reloadBuildings = false;
}

function Upgrade(name){
    console.log("Make Upgrade");
    console.log(name,isUpgrading);
    if(name != "" && !isUpgrading){
        var scJson = {};
        var scCmd = {};
        scJson['username'] = username;
        scJson['type'] = "upgrade";
        scCmd['tr_var1'] = planetid.toString();
        scCmd['tr_var2'] = name;
        scJson['command'] = scCmd;

        api.setAccessToken(access);
        var njson = JSON.stringify(scJson);

        $( "#"+name+"btn" ).html('<img src="img/loading.gif" height="15px" />');
        $( "#"+name+"btn" ).prop("disabled",true);

        isUpgrading = true;
        CustomJsonHandler(username,sc2app,njson,function(res,err){
            //isUpgrading[planetid] = true;
            AwaitChangeBuildings()
            console.log(res,err);
        });
    }
}

function Charge(name){
    console.log("Make Charge");
    if(name != "" && !isCharging){
        var scJson = {};
        var scCmd = {};
        scJson['username'] = username;
        scJson['type'] = "charge";
        scCmd['tr_var1'] = planetid.toString();
        scCmd['tr_var2'] = name;
        scJson['command'] = scCmd;

        api.setAccessToken(access);
        var njson = JSON.stringify(scJson);

        $( "#"+name+"chargebtn" ).html('<img src="img/loading.gif" height="15px" />');
        $( "#"+name+"chargebtn" ).prop("disabled",true);

        isCharging = true;
        CustomJsonHandler(username,sc2app,njson,function(res,err){
            isCharging = true;
            AwaitChangeBuildings()
            console.log(res,err);
        });
    }
}

function Enable(name){
    console.log("Make Charge");
    if(name != "" && !isEnabling){
        var scJson = {};
        var scCmd = {};
        scJson['username'] = username;
        scJson['type'] = "enable";
        scCmd['tr_var1'] = planetid.toString();
        scCmd['tr_var2'] = name;
        scJson['command'] = scCmd;

        api.setAccessToken(access);
        var njson = JSON.stringify(scJson);

        $( "#"+name+"protectionbtn" ).html('<img src="img/loading.gif" height="15px" />');
        $( "#"+name+"protectionbtn" ).prop("disabled",true);

        isEnabling = true;
        CustomJsonHandler(username,sc2app,njson,function(res,err){
            isEnabling = true;
            AwaitChangeBuildings()
            console.log(res,err);
        });
    }
}

function AwaitChangeBuildings(){
    var json = {};
    json['id'] = planetid;
    MakeAPhonecall(apiServer + '/loadbuildings',json,oldJsonBuildings,function(err,res){
        if(res){
            isUpgrading = false;
			isEnabling = false;
			isCharging = false;
            LoadBuildings();
        }
    },'GET');
}

GetBuildingDiv();