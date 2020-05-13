var buffbtndiv = "";
var buffs = null;

var isbuyingbuff = false;

function LoadBuffs(){
    var json = {};
    json['user'] = username;
    $.ajax({
        url: apiServer + '/buffs',
        type: 'GET',
        data: json,
        success: function(data) {
            console.log(data)
            buffs = data;
            RenderBuffs();
        }
    });
}

function LoadShipyard(){
    var json = {};
    json['user'] = username;
    json['planet'] = planetid;
    $.ajax({
        url: apiServer + '/planetshipyard',
        type: 'GET',
        data: json,
        success: function(data) {
            RenderBattlespeed(data);
        }
    });
}

function RenderBattlespeed(ships){
    console.log(ships)
    var data = {};
    ships.forEach(function(ship){
        if(!data[ship.class]){
            data[ship.class] = {};
        }

        if(data[ship.class]){
            var ndata = data[ship.class];
            ndata[ship.variant_name] = {};
            ndata[ship.variant_name]["basespeed"] = ship.basespeed;
            ndata[ship.variant_name]["battlespeed"] = ship.battlespeed;
        }
    })


    console.log(data)

    $('#speedtable').html("");
    Bufforder.forEach(function(name){
        $('#speedtable').append($('<tr>')
        .append($('<td>').append(name))
        .append($('<td>').append(data[name]['bullet'].basespeed))
        .append($('<td>').append('<span class="infocolor">'+data[name]['rocket'].battlespeed+'</span>'))
        .append($('<td>').append('<span class="infocolor">'+data[name]['laser'].battlespeed+'</span>'))
        .append($('<td>').append('<span class="infocolor">'+data[name]['bullet'].battlespeed+'</span>')))
    })
}

function RenderBuffs(){
    buffs.forEach(function(buff,index){
        $('#buff'+index+"_price").html(formatNumber(buff.price/100000000)+" Stardust")
        $('#buff'+index+"_days").html(buff.buff_duration)
    
        //Buttons
        if(buffbtndiv == ""){
            buffbtndiv = $('#buffbtn').html();
        }

        var activeBuffs = Math.ceil((buff.buff_end - currentUTC) / (buff.buff_duration*86400));
        if(activeBuffs <= 0){
            activeBuffs = 0;
        }

        var tmpbuff = buffbtndiv;
        //Time : November 22, 2019 at 5:34:54 pm
        tmpbuff = tmpbuff.replace('date_',moment(buff.buff_end*1000).format('MMMM D, YYYY [at] h:mm:ss a'))

        tmpbuff = tmpbuff.replace("buffs_",activeBuffs)
        tmpbuff = tmpbuff.replace('timer_','buff'+index+'_timer')
        tmpbuff = tmpbuff.replace('timerb_','buff'+index+'_timerb')
        tmpbuff = tmpbuff.replace('button_','buff'+index+'_button')

        $('#buff'+index+"_btn").html(tmpbuff);
        if(activeBuffs > 0){
            $('#buff'+index+"_timerb").css('display','block')
        }
        TickTook('buff'+index+"_timer",buff.buff_end,function(err,res){

        });

        //Enough SD
        $("#buff"+index+"_button").unbind();
        $('#buff'+index+"_button").html('Buy now');
        if(stardustb >= buff.price/100000000){
            $('#buff'+index+"_button").attr('disabled',false);
            $("#buff"+index+"_button").click(function() {
                if(!isbuyingbuff){
                    isbuyingbuff = true;
                    ActivateBuff(index,buff.name);
                }
            });
        }else{
            $('#buff'+index+"_button").attr('disabled',true);
        }
    });
}

function ActivateBuff(index,name){
    $('#buff'+index+"_button").attr('disabled',true);
    $('#buff'+index+"_button").html('<img src="img/loading.gif" height="15px" />');

    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "buff";
    scCmd['tr_var1'] = name;
    scJson['command'] = scCmd;

    api.setAccessToken(access);
    var njson = JSON.stringify(scJson);

    CustomJsonHandler(username,sc2app,njson,function(err,res){
        console.log(err,res);
        AwaitChangeBuff(index);
        if(err){
            $('#buff'+index+"_button").attr('disabled',false);
            $('#buff'+index+"_button").html('Buy now');
            isbuyingbuff = false;
        }
    });
}

function AwaitChangeBuff(index){
    var json = {};
    json['user'] = username;
    MakeAPhonecall(apiServer + '/buffs',json,buffs,function(err,res){
        if(res){
            LoadBuffs();
            GetBalance();
        }
        isbuyingbuff = false;
    },'GET');
}

LoadBuffs();