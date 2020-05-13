var touser = "";
var giftButtonPressed = false;

var oldgiftjson;
var rtext;
var Gifts = [];

var gifttype = "";
var plnid = "";

var acout = false;

var infp = 'Enter the username in the form field and then click on "Gift now" to gift a planet.<br><div style="margin:12px 0 12px 0;">Fee for planet transfer: <b>1000 Stardust</b></div>'
var prc = '<div style="color:#a94442;margin:0 0 12px 0;"><i>Warning: This transaction is irreversible. All ships on the planet will be transmitted.</i></div>'
var oout = '<div style="color:#a94442;margin:0 0 12px 0;"><i>Oops! You can not gift planets with outgoing missions.</i></div>'
var nesd = '<div style="color:#a94442;margin:0 0 10px 0;"><i>Not enough Stardust in your <a href="wallet" style="color:#333;" target="blank" class="steem-keychain-checked">wallet</a>.</i></div>'

/* SEND GIFT */
function SendGiftModal(id,user = "",type = "giftitem"){
    gifttype = type;
    $('#gift_modal_btn').html("Gift now");
    //Planet Gift
    if(gifttype != "giftitem"){
        $('#giftbodytxt').html(infp+prc);
        plnid = id;
        GetBalance(function(err,res){
            var sdi = '';
            console.log(res)
            if(res < 1000){
                acout = true;
                sdi = nesd;
            }
            CheckOutgoingMission(function(err,res){
                if(res == false){
                    $('#giftbodytxt').html(infp+prc+sdi); 
                }else{
                    acout = true;
                    $('#giftbodytxt').html(infp+oout+sdi);
                }
            });
        })
    }

    var dynuser = user;
    ModalGiftBtn(dynuser);
    $('#GiftItemModal').modal('show');
    $('#gift_modal_input').val('');
    $('#gift_modal_input').on('input', function() {
        dynuser = $('#gift_modal_input').val();
        if(debug){
            console.log('Gift user set to '+dynuser);
        }
        ModalGiftBtn(dynuser);
    });
    $('#gift_modal_btn').unbind("click");
    $('#gift_modal_btn').click(function() {
        if(dynuser != ""){
            if(debug){
                console.log('Gift Button Clicked')
            }
            $('#gift_modal_btn').html('<img src="img/loading.gif" height="15px" />');
            $('#gift_modal_btn').prop('disabled',true);
            giftButtonPressed = true;
            SendGift(id,dynuser);
        }
    });
}

function ModalGiftBtn(user){
    if(user == "" || user == username || acout){
        $('#gift_modal_btn').prop('disabled',true);
    }else{
        if(!giftButtonPressed){
            $('#gift_modal_btn').prop('disabled',false);
        }
    }
}

function SendGift(id,user){
    if(id != "" && user != ""){
        var scJson = {};
        var scCmd = {};
        scJson['username'] = username;
        scJson['type'] = gifttype;
        scCmd['tr_var1'] = id;
        scCmd['tr_var2'] = replaceAll(user," ","");
        scJson['command'] = scCmd;

        api.setAccessToken(access);
        var njson = JSON.stringify(scJson);
        SendGiftJson(njson);
    }
}

function SendGiftJson(json){
    CustomJsonHandler(username,sc2app,json,function(err,res){
        if(res){
            giftButtonPressed = false;
            if(gifttype == "giftitem"){
                old_data = new_data;
                item_ticker = true;
            }else{
                console.log('Send Planet')
                var json = {};
                json['user'] = username;
                MakeAPhonecall(apiServer + '/loadplanets',json,planetrawjson,function(err,res){
                    $('#gift_modal_btn').html('Gift now');
                    if(res){
                        if(path == "planet"){
                            location.reload();
                        }else{
                            planetid = null;
                            $('#GiftItemModal').modal('hide');
                            GetMyPlanets();
                        }
                    }
                },'GET',"planets");
            }
        }else{
            //SendGiftJson(json);
        }
    });
}

function CheckOutgoingMission(callback,id=plnid){
    var json = {};
    json['planetid'] = id;
    json['user'] = username;
    json['active'] = 1;
    $.ajax({
        url: apiServer + '/loadfleetmission',
        type: 'GET',
        data: json,
        success: function(data) {
            console.log(data)
            if(data.length > 0){
                var isoutgoing = false;
                data.forEach(mission => {
                    if(mission.from_planet.id == planetid){
                        isoutgoing = true;
                    }
                });
                callback(null,isoutgoing);
            }else{
                callback(null,false);
            }
        }
    })

}

/*  GET GIFT  */
function LoadGifts(){
    /*if(username){
        var json = {};
        json['user'] = username;
        $.ajax({
            url: apiServer + '/loadgift',
            type: 'GET',
            data: json,
            success: function(msg) {
                try {
                    json = msg;
                } catch (e) {
                    json = [];
                }
                if(oldgiftjson != JSON.stringify(json)){
                    //Current Gifts
                    var nGifts = [];
                    json.forEach(function(gift){
                        nGifts.push(gift);
                    })
                    //Logic
                    console.log(json);
                    if(oldgiftjson){
                        if(json[0]){
                            if(nGifts.length > Gifts.length){
                                console.log("New Gift!")
                                ShowGiftModal(json[json.length-1].name,json[json.length-1].from);
                            }
                        }
                    }
                    //Old Gifts
                    oldgiftjson = JSON.stringify(json);
                    Gifts = [];
                    json.forEach(function(gift){
                        Gifts.push(gift);
                    })
                }
            }
        });
    }*/
}

function ShowGiftModal(name,user){
    if(!rtext){
        rtext = $('#gift_modal_rtext').html();
    }
    var ttext = rtext;
    ttext = replaceAll(ttext,'username',user);
    ttext = replaceAll(ttext,'giftname',name);
    $('#gift_modal_rtext').html(ttext);
    $('#ReceiveGiftItemModal').modal('show');
    console.log(window.location.pathname);
    if(window.location.pathname == "/items"){
        item_ticker = true;
    }
}

/*setInterval(function() {
    if(window.location.pathname == "/items"){
        //LoadGifts();
    }
}, 3000);

setInterval(function() {
    //LoadGifts();
}, 10000);


LoadGifts();*/