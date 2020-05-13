var attacktypes = ['corvette','frigate','destroyer','cruiser','battlecruiser','carrier','dreadnought', 'transportship','transportship1','transportship2','explorership',];
var attacktypestrs = ['transportship','transportship1','transportship2','explorership','explorership1','scout','scout1','scout2','patrol','patrol1','patrol2','cutter','cutter1','cutter2','corvette','corvette1','corvette2','frigate','frigate1','frigate2','destroyer','destroyer1','destroyer2','cruiser','cruiser1','cruiser2','battlecruiser','battlecruiser1','battlecruiser2','carrier','carrier1','carrier2','dreadnought','dreadnought1','dreadnought2',
                        'yamato','yamato1','yamato2','yamato3','yamato4','yamato5','yamato6','yamato7','yamato8','yamato9','yamato10','yamato11','yamato12','yamato13','yamato14','yamato15','yamato16','yamato17','yamato18','yamato19','yamato20','yamato21'];
var attacknums = []
var attacknum = 2;

var formation = attacktypestrs;
var formationqyt = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var shipsSelected = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var formationsJSON = {};

var attackhtml;

var attackpos = 0;

var chooseTxt = "Choose ship";

var length = [0,0,0,0,0,0,0,0];

function GetAttackHtml(){
    $.ajax({ type: "GET",   
        url: "include/battle_div",   
        async: false,
        success : function(html)
        {
            attackhtml = html;
        }
    });
}


function PreAttackScreen(){
    GetAttackHtml();
    //undersiege
    if(undersiege){
        posx = planetx;
        posy = planety;
        $('#fleet_attack_btn').text('Start mission');
        $('#fleet_attack_btn').click(function(){
            AttackScreen();
        });
    }else{
        $('#fleet_attack_btn').click(function(){
            AttackScreen();
        });
    }

    length.forEach(function(ship,index){
        var html = attackhtml;
        var options = '<option value="1">'+chooseTxt+"</option>";
        var total = 0;
        attacktypestrs.forEach(ship=>{
            var fleeti = ShipTypes.indexOf(ship);
            if(fleeti >= 0){
                total = ShipTotal[fleeti];
                options += '<option value ="'+ship+'">'+Translate(ship)+' ('+total+')</option>'
            }else {
                total = 0;
            }            
        })
        //Table Gen
        html = html.replace('options_',options);
        html = replaceAll(html,'POS_',attackpos)

        $('#fleet_select_attack_tbody').append(html);

        /*//KeyPress
        $('#attack_tbli_'+attackpos).on('input', function(){
            validateint(event); MaxSelectAttack(event,ship)
        });*/
        attackpos++;
    })
}

function FilterDropdown(){
    var SelectedShips = [];
    var Pos = [];
    console.log(shipsSelected)
    formation.forEach(function(type,index){
        if(shipsSelected[index] != 0){
            SelectedShips.push(shipsSelected[index]);
            Pos.push(index);
        }
    });
    console.log(SelectedShips,Pos)
    attacktypes.forEach(function(ship,index){
            $("#attack_sel_"+index).html('<option value="1">'+chooseTxt+"</option>");
            attacktypestrs.forEach(ship=>{
                var fleeti = ShipTypes.indexOf(ship);
                if(fleeti >= 0){
                    total = ShipTotal[fleeti];
                    $("#attack_sel_"+index).append($('<option>',
                    {
                        value: ship,
                        text : Translate(ship)+' ('+total+')'
                    }));
                }
            })
            
            var ni = Pos.indexOf(index);
            if(ni >= 0){
                console.log(Pos[ni]);
                $('#attack_sel_'+Pos[ni]).val(SelectedShips[ni]);
            }

            shipsSelected.forEach(function(ship,i){
                var ni = Pos.indexOf(i);
                if(Pos[ni] != index){
                    $("#attack_sel_"+index+" option[value='" + ship + "']").remove();
                }
            })
    });
}

function AttackScreen(){
    totalSelect = 0;
    totalCapa = 0;
    totalCons = 0;
    //formation
    console.log(shipsSelected)
    console.log(formation)
    shipsSelected.forEach(function(type,index){
        var i = formation.indexOf(type);
        var qyt = formationqyt[i];
        if(formationqyt[i] > 0){
            type = type;
            formationsJSON[type] = {pos:index+1, n:qyt}

            //Total Select
            var ix = ShipTypes.indexOf(type);
            totalSelect += qyt;
            totalCapa += ShipCapa[ix] * qyt;
            totalCons += ShipCons[ix] * qyt;
            if(!slowSpeed){
                slowSpeed = ShipSpeed[ix];
            }
            if(slowSpeed > ShipSpeed[ix]){
                slowSpeed = ShipSpeed[ix];
            }
        }
    })
    console.log(formationsJSON)
    if(undersiege){
        StartMission();
    }else{
        NextStep('send',2)
    }
}

function Sort(pos,direction){
    var newpos = pos;
    if(direction == 1){
        if(pos > 0){
            newpos -= 1;
        }
    }else{
        if(pos < length.length-1){
            newpos += 1;
        }
    }
    //Selector
    var curhtml = $('#attack_sel_'+pos).html();
    var newhtml = $('#attack_sel_'+newpos).html();
    var cursel = $('#attack_sel_'+pos).val();
    var newsel = $('#attack_sel_'+newpos).val();
    //Input
    var curvalue = $('#attack_tbli_'+pos).val();
    var newvalue = $('#attack_tbli_'+newpos).val();

    //Formation
    var newwpos = formation[newpos];
    var oldpos = formation[pos];
    var newqyt = formationqyt[newpos];
    var oldqyt = formationqyt[pos];
    var newf = shipsSelected[newpos];
    var oldf = shipsSelected[pos];

    //Formation
    formation[newpos] = oldpos;
    formation[pos] = newwpos;
    formationqyt[newpos] = oldqyt;
    formationqyt[pos] = newqyt;
    shipsSelected[newpos] = oldf;
    shipsSelected[pos] = newf;

    //Selctor
    $('#attack_sel_'+pos).html(newhtml).promise().done(function(){
        $('#attack_sel_'+pos).val(newsel);
        changeAttackFleet(newsel,false);
    });
    $('#attack_sel_'+newpos).html(curhtml).promise().done(function(){
        $('#attack_sel_'+newpos).val(cursel);
        changeAttackFleet(cursel,false);
    });


    //Input
    $('#attack_tbli_'+pos).val(newvalue);
    $('#attack_tbli_'+newpos).val(curvalue);

    //KeyPress
    $('#attack_tbli_'+pos).unbind("input");
    $('#attack_tbli_'+newpos).unbind("input");
    $('#attack_tbli_'+pos).on('input', function(){
        MaxSelectAttack(event,formation[pos])
    });
    $('#attack_tbli_'+newpos).on('input', function(){
        MaxSelectAttack(event,formation[newpos])
    });

    $('#attack_tbli_'+pos).keypress(function (e) {
        validateint(e);
    });
    $('#attack_tbli_'+newpos).keypress(function (e) {
        validateint(e);
    });
}

function MaxSelectAttack(event,type){  
    console.log(type)
    
    var key = event.data;
    var valv = parseInt(event.target.value);

    var total = 0;
    var i = parseInt(attacknums[type]);
    
    if(i == 0){
        i = "";
    }
    if(isNaN(i)){
        i = "";
    }
    var fleeti = ShipTypes.indexOf(type);
    if(fleeti >= 0){
        total = ShipTotal[fleeti];
    }else {
        total = 0;
    }

    var form = formation.indexOf(type);

    formationqyt[form] = 0;
    var sum = formationqyt.reduce(function(pv, cv) { return pv + cv; }, 0);
    if(sum == 0){
        $('#fleet_attack_btn').prop( "disabled", true );
    }

    if(valv > total){
        $('#fleet_attack_btn').prop( "disabled", true );
        event.returnValue = false; 
        return;
    }

    if(key == "Backspace"){
        if(valv < 10){
            $('#fleet_attack_btn').prop( "disabled", true );
        }
        event.returnValue = true;
        return;
    }

    if(!isNaN(valv)){
        formationqyt[form] = valv;
        var sum = formationqyt.reduce(function(pv, cv) { return pv + cv; }, 0);
        if(sum > 0){
            $('#fleet_attack_btn').prop( "disabled", false );
        }
    }
}

function changeAttackFleet(valv,raw=true,ID = null){
    if(raw){
        ID = valv.id;
        ID = ID.slice(-1);
        valv = valv.value;
    }
    var type = valv;
    var reset = false;
    if(type == "1"){
        type = shipsSelected[ID];
        reset = true;
    }

    var i = formation.indexOf(type);
    if(raw){
        var fleeti = ShipTypes.indexOf(valv);
        var tot = ShipTotal[fleeti];


        if(isNaN(tot)){
            tot = '';
        }else{
            /*if(valv.includes('explorership') || valv.includes('transportship')){
                tot = 1;
            }*/
        }
        formationqyt[i] = tot;
    }

    $('#attack_tbli_'+ID).val(tot);


    console.log(formationqyt);
    var sum = formationqyt.reduce(function(pv, cv) { return pv + cv; }, 0);
    if(sum == 0){
        $('#fleet_attack_btn').prop( "disabled", true );
    }else{
        $('#fleet_attack_btn').prop( "disabled", false );
    }

    if(!reset){
        shipsSelected[ID] = type;
        FilterDropdown();
    }else{
        shipsSelected[ID] = 0;
    }

    if(raw){
        $('#attack_tbli_'+ID).on('input', function(){
            validateint(event); MaxSelectAttack(event,type)
        });
    }
}