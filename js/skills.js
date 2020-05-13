var skill_div = "";
var temp_div = "";

//Test

var buildings = ['base','shipyard','researchcenter','coalmine','oremine','coppermine','uraniummine','coaldepot','oredepot','copperdepot','uraniumdepot', 'bunker','shieldgenerator'];
var ships = ['Transporter','Explorer','Scout','Patrol','Cutter','Corvette','Frigate','Destroyer','Cruiser','Battlecruiser','Carrier','Dreadnought','Yamato'];
var booster = ['coalbooster','orebooster','copperbooster','uraniumbooster', 'enlargebunker','depotincrease'];
var commander = ['missioncontrol','siegeprolongation','structureimprove', 'armorimprove', 'shieldimprove', 'rocketimprove', 'bulletimprove', 'laserimprove', 'regenerationbonus', 'repairbonus'];

var skills_arr = [];
var skill_objs = [];
var booster_up = "</b> (+ 0.5% per level)";
var enlargebunker_up = "</b> (+ 0.25% per level)";
var siege_up  = "</b> (+ 1.5 h per level)";

var reloadSkills = false;
var isEnchancing = false;
var oldJsonSkills;


//Skill Levels
var ResearchSkill = 0;
var totalLevel = 0;
var MaxLevel = 0;
var MaxLevelTotal = 5;

function GetSkillDiv(){
    $.ajax({ type: "GET",   
        url: "include/skills_div",   
        async: false,
        success : function(html)
        {
            skill_div = html;
            RenderSkills("building");
            LoadSkills();
        }
    });
}

function LoadSkills(){
    totalLevel = 0;
    LoadQyt(function(err,res){
        if(res){
            var json = {};
            json['user'] = username;
            $.ajax({
                url: apiServer + '/loadskills',
                type: 'GET',
                data: json,
                success: function(msg) {
                    try {
                        json = msg;
                    } catch (e) {
                        json = [];
                    }

                    console.log(json);
                    oldJsonSkills = json;
                    json.forEach(Item => {
                        skills_arr.push(Item);
                    });
                    PreRenderSkills();
                }
            });
        }
    })
}

function PreRenderSkills(){
    totalLevel = 0;
    MaxLevel = 0;
    OnPlanetChange(function(err,res){
        if(res){
            LoadSkills();
        }
    });

    RenderSkills("building");
    RenderSkills("ships");
    RenderSkills("booster");
    RenderSkills("commander");
}

function RenderSkills(category){
    var temparr = [];
    var endword = "";
    var clrprs = "";
    if(category == "building"){
        temparr = buildings;
        clrprs = "building";
    }
    if(category == "ships"){
        temparr = ships;
        clrprs = "ship";
    }
    if(category == "commander"){
        temparr = commander;
        clrprs = "commander";
    }
    if(category == "booster"){
        temparr = booster;
        endword = booster_up;
        clrprs = "research";
    }

    $( "#"+category+"_skills" ).html("");
    for(var i = 0; i < temparr.length; i++){
        var cur_obj;
        skills_arr.forEach(function(skill){
            if(skill.name == temparr[i]){
                cur_obj = skill;
            }
        });
        if(cur_obj){
            skill_objs[i] = cur_obj;
            var level = parseInt(cur_obj.current);
            totalLevel += level;
            //Set Level
            if(cur_obj.name == "researchcenter"){
                ResearchSkill = level;
            }
			if(cur_obj.name == "enlargebunker"){
				endword = enlargebunker_up
            }
            if(cur_obj.name == "depotincrease"){
				endword = "</b> (+ 2.5% per level)";
            }
            
            if(cur_obj.name.includes('improve')){
                endword = "</b> (+ 1.0% per level)";
            }
            if(cur_obj.name.includes('bonus')){
                endword = "</b> (+ 0.5% per level)";
            }
            if(cur_obj.name.includes('siegeprolongation')){
                endword = siege_up;
            }
			if(cur_obj.name.includes('depotincrease')){
                endword = "</b> (+ 2.5% per level)";
            }

            var time = msToHMS(cur_obj.time * 1000);

            

            temp_div = skill_div;
            temp_div = temp_div.replace("name_",Translate(cur_obj.name)+" "+endword);
            temp_div = temp_div.replace("level_",level);
            temp_div = temp_div.replace("TYPE_",clrprs);
            temp_div = temp_div.replace("skill_btn",cur_obj.name);
            temp_div = temp_div.replace("time_",time);
            if(level == 0){
                temp_div = temp_div.replace("percent_",0.2);
            }else{
                temp_div = temp_div.replace("percent_",level*MaxLevelTotal);
            }
            temp_div = temp_div.replace("percent_",level*MaxLevelTotal);
            temp_div = temp_div.replace("ore_",cur_obj.ore);
            temp_div = temp_div.replace("copper_",cur_obj.copper);
            temp_div = temp_div.replace("coal_",cur_obj.coal);
            temp_div = temp_div.replace("uranium_",cur_obj.uranium);

            //TickTook
            if(cur_obj.busy > currentUTC){
                temp_div = temp_div.replace("btn_","loading...");
                ClearTickTook = true;
                TickTook(cur_obj.name,cur_obj.busy,function(err,res){
                    if(res){
                        AwaitChangeSkill();
                    }
                });
                temp_div = temp_div.replace("skill_","");
            }else{

                //Check Max Level
                if(level >= 20){
                    temp_div = replaceAll(temp_div,"sc_","buttona")
                    temp_div = temp_div.replace("btn_","Max. Level");
                    temp_div = temp_div.replace("skill_","");
                }

                //Check Resources
                if(cur_obj.ore > oreqytu || cur_obj.copper > copperqytu || cur_obj.coal > coalqytu || cur_obj.uranium > uraniumqytu){
                    temp_div = temp_div.replace("btn_","Missing Resources");
                    temp_div = replaceAll(temp_div,"sc_","text-dangerq")
                    temp_div = temp_div.replace("skill_","");
                } else{
                    temp_div = replaceAll(temp_div,"sc_","buttona")
                    temp_div = temp_div.replace("btn_","Enhance now");
                    temp_div = temp_div.replace("skill_",cur_obj.name);
                }

                //Red Ressources
                if(cur_obj.ore > oreqytu){
                    temp_div = temp_div.replace("orec","text-dangerq");
                }
                if(cur_obj.coal > coalqytu){
                    temp_div = temp_div.replace("coalc","text-dangerq");
                }
                if(cur_obj.copper > copperqytu){
                    temp_div = temp_div.replace("copperc","text-dangerq");
                }
                if(cur_obj.uranium > uraniumqytu){
                    temp_div = temp_div.replace("uraniumc","text-dangerq");
                }
            }

            MaxLevel += 20;

            $( "#"+category+"_skills" ).append(temp_div);
            AfterRenderSkills();
        }
    }
}

function AfterRenderSkills(){
    reloadSkills = false;
    if(totalLevel == 0){
        $( "#meta_level" ).css("width","0.1%");
        $( "#meta_level" ).html("Level 0");
    }else{
        $( "#meta_level" ).css("width",(totalLevel/(MaxLevel)*100)+"%");
        if(totalLevel < 11){
            $( "#meta_level" ).html("lvl. "+totalLevel); 
        }else{
            $( "#meta_level" ).html("lvl. "+totalLevel); 
        }
    }
}

//Enhance now

function SetSkill(skill){
    if(skill != "" && !isEnchancing){
        var scJson = {};
        var scCmd = {};
        scJson['username'] = username;
        scJson['type'] = "enhance";
        scCmd['tr_var1'] = username;
        scCmd['tr_var2'] = planetid;
        scCmd['tr_var3'] = skill;
        scJson['command'] = scCmd;

        api.setAccessToken(access);
        var njson = JSON.stringify(scJson);

        $( "#"+skill ).text("Enhance...");

        isEnchancing = true;
        CustomJsonHandler(username,sc2app,njson,function(res,err){
            isEnchancing = true;
            AwaitChangeSkill()
            console.log(res,err);
        });
    }
}

//MISC
function SetProf(){
    $("#skill_prof").attr("src","https://steemitimages.com/u/"+username+"/avatar");
}

function AwaitChangeSkill(){
    var json = {};
    json['user'] = username;
    MakeAPhonecall(apiServer + '/loadskills',json,oldJsonSkills,function(err,res){
        if(res){
            isEnchancing = false;
            LoadSkills();
        }
    },'GET');
}

SetProf();
GetSkillDiv();