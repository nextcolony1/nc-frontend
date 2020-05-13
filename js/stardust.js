var balance = 0;
var balance_se = 0;
var user = "";
var amount = 0;

var oldjsn = null;

var usipt = '';

var page = 0;
var thtl = "";

function LoadDataSD(){
    LoadHistory(0)
    var json = {};
    json['user'] = username;
    $.ajax({
        url: apiServer + '/wallet',
        type: 'GET',
        data: json,
        success: function(njson) {
            console.log(njson)
            oldjsn = njson;
            jsn = {};
            jsn['balance'] = njson.stardust;
            jsn['balance_se'] = 0//njson.se_stardust;
            jsn['supply'] = njson.supply;
            SetDataSD(jsn);
        }
    });
}

function LoadHistory(pg = null,check = false){
    if(pg == 0){
        page = pg;
    }

    var json = {};
    json['user'] = username;
    json['limit'] = 25;
    json['page'] = page;
    $.ajax({
        url: apiServer + '/wallet',
        type: 'GET',
        data: json,
        success: function(njson) {
            console.log(njson)
            console.log(page)

            if(page == 0){
                if(thtl == ""){
                    thtl = $('#trsd').html();
                }else{
                    $('#trsd').html(thtl);
                }
            }

            if(check){
                if(njson.length == 0){
                    $('#lmsd').css('display','none');
                }else{
                    $('#lmsd').css('display','block');
                }
            }

            if(!check){
                njson.transactions.forEach(function(data){
                    var date = moment(data.date*1000).format('MM/DD/YY');
                    var from = data.from_user;
                    var to = data.to_user;
                    var amount = (data.amount / 100000000).toFixed(3)

                    var type = "";
                    var amountHTML = "";
                    if(from != username){
                        amountHTML = '<span class="stardust">'+formatNumber(amount)+'</span>'
                    }else{
                        amountHTML = '<span class="text-dangerq">'+formatNumber(amount)+'</span>'
                    }

                    var trx = true;
                    var trxtd = '';
                    console.log(data)
                    if(data.tr_type == "shop"){
                        type = "Shop";
                        from = "nextcolony";
					}else if(data.tr_type == "gift"){
						type = "Gift";
					}else if(data.tr_type == "auction"){
						type = "Auction";
                    }else if(data.tr_type == "fee"){
						type = "Fee";
                    }else if(data.tr_type == "yamato"){
                        type = "Yamato";
                        //trx = false;
                    }else if(data.tr_type == "exploration"){
                        type = "Exploration";
                    }else if(data.tr_type == "burn"){
                        type = "Burning";
                    }else{
                        type = "Transfer";
                    }

                    //Mission
                    if(data.trx.substring(0,2) == "M-"){
                        trx = false;
                    }

                    if(trx){
                        trxtd = '<a href="'+apiServer+'/loadtransaction?trx_id='+data.trx+'" >'+data.trx.substring(0,8)+'...</a>';
                    }else{
                        trxtd = data.trx;
                    }

                    $('#trsd').append('<tbody>').append($('<tr>')
                        .append($('<td>').append(date))
                        .append($('<td>').append(from))
                        .append($('<td>').append(to))
                        .append($('<td>').append(type))
                        .append($('<td>').append(amountHTML))
                        .append($('<td>').append(trxtd)));
                })
            }
            if(!check){
                page++;
                LoadHistory(page,true);
            }
        }
    });
}

function SetDataSD(jsn){
    var tbalance = jsn.balance;
    var tbalance_se = jsn.balance_se;
    var supply = jsn.supply;
    if(tbalance == null){
        tbalance = 0;
    }else{
        tbalance = (tbalance / 100000000).toFixed(3);
    }

    if(tbalance_se == null){
        tbalance_se = 0;
    }else{
        tbalance_se = (tbalance_se / 100000000).toFixed(3);
    }

    supply = (supply / 100000000).toFixed(3);


    $('#sd_balance').html(formatNumber(tbalance));
    $('#se_sd').html(formatNumber(tbalance_se) + " Stardust");
    $('#sd_supply').html(formatNumber(supply));

    balance = parseFloat(tbalance);
    balance_se = parseFloat(tbalance_se);
}

function OpenSDModal(){
    $('#mdbl').text('Balance: '+formatNumber(balance)+' STARDUST')
    $('#username').val('');
    $('#sdip').val('');
    $('#myus').attr("placeholder", username).val("").focus().blur();
    $("#cfsd").attr('disabled',true);
    $('#TransferStardustModal').modal('show');
}

function ConvertSDModal(){
    $('#mbin').text('Balance: '+formatNumber(balance)+' STARDUST')
    $('#mbex').text('Balance: '+formatNumber(balance_se)+' STARDUST')

    $('#mbin1').text('Balance: '+formatNumber(Math.floor(balance))+' Stardust')
    $('#mbex1').text('Balance: '+formatNumber(Math.floor(balance_se))+' Stardust')

    $('#mbin').unbind();
    $('#mbin').click(function(){
        $('#input_ncse').val(balance);
        $('#convert_ncse').attr("disabled",false);
        $('#convert_ncse').unbind();
        $('#convert_ncse').click(function(){
            NCTOSE();
        })
    })

    $('#mbex').unbind();
    $('#mbex').click(function(){
        $('#input_senc').val(balance_se);
        $('#convert_senc').attr("disabled",false);
        $('#convert_senc').unbind();
        $('#convert_senc').click(function(){
            SETONC($('#input_senc').val())
        })
    })

    //Input
    $('#input_ncse').unbind();
    $('#input_ncse').on('input', function () {
        this.value = this.value.match(/^\d+\.?\d{0,3}/);
        if(this.value <= balance && this.value > 0){
            $('#convert_ncse').attr("disabled",false);
            $('#convert_ncse').unbind();
            $('#convert_ncse').click(function(){
                NCTOSE();
            })
        }else{
            $('#convert_ncse').attr("disabled",true);
        }
    });

    $('#input_senc').unbind();
    $('#input_senc').on('input', function () {
        this.value = this.value.match(/^\d+\.?\d{0,3}/);
        if(this.value <= balance_se && this.value > 0){
            $('#convert_senc').attr("disabled",false);
            $('#convert_senc').unbind();
            $('#convert_senc').click(function(){
                SETONC($('#input_senc').val())
            })
        }else{
            $('#convert_senc').attr("disabled",true);
        }
    });

    $('#convert_ncse').attr("disabled",true);
    $('#convert_senc').attr("disabled",true);
    $('#ConvertStardustModal').modal('show');
}

function NCTOSE(){
    amount = $('#input_ncse').val();
    user = "nextcolony.exch"
    GiftSDCJ('convert_ncse','ConvertStardustModal','input_ncse','Convert');
}

function SETONC(amounte){
    $('#convert_senc').attr("disabled",true);
    $('#convert_senc').html('<img src="./img/loading.gif" height="15px" />');

    var scJson = {};
    var scCmd = {};
    scJson['contractName'] = "tokens";
    scJson['contractAction'] = "transfer";
    scCmd['symbol'] = "STARDUST"
    scCmd['to'] = "nextcolony.exch";
    scCmd['quantity'] = parseFloat(amounte).toString();
    scCmd['memo'] = "";
    scJson['contractPayload'] = scCmd;
    var njson = JSON.stringify(scJson);
    customJsonToken(username,'ssc-mainnet1',njson,function(err,cujs){
        console.log(err,cujs);
        var json = {};
        json['user'] = username;
        MakeAPhonecall(apiServer + '/wallet',json,oldjsn,function (err,res) {
            $('#convert_senc').text("Convert");
            if(res){
                GetBalance();
                if(typeof Stardust === "function") { 
                    Stardust();
                }
                LoadDataSD();
                $('#convert_senc').attr("disabled",true);
                $('#input_senc').val('');
                $('#ConvertStardustModal').modal('hide');
            }
        },'GET');
    });
}

$('#username').on('input', function() {
    user = $('#username').val();
    ButtonDisableSD();
});

if(window.location.pathname == "/wallet"){
    LoadDataSD();
}

$(document).on('keydown', 'input[pattern]', function(e){
    var input = $(this);
    var oldVal = input.val();
    var regex = new RegExp(input.attr('pattern'), 'g');
  
    setTimeout(function(){
      var newVal = input.val();
      var CurVal = input.val();
      if(!regex.test(newVal)){
        input.val(oldVal); 
        CurVal = oldVal;
      }

      amount = CurVal;
      ButtonDisableSD();
    }, 0);
  });

$('#mdbl').click(function() {
    amount = balance;
    $('#sdip').val(amount);
    ButtonDisableSD();
});

function ButtonDisableSD(parse = false){
    var state = true;

    if(balance < parseFloat(amount)){
        state = true;
    }else{
        if(user != ""){
            state = false;
        }else{
            state = true;
        }
    }

    if(parseFloat(amount) == 0 || amount == ""){
        console.log("empty");
        state = true;
    }

    console.log(amount,balance,user);

    if(!parse){
        $(".cfsd").attr('disabled',state);
    }
    if(parse && state == false){
        GiftSDCJ();
    }
}

function GiftSD(){
    var json = {};
    json['user'] = $('#username').val();
    $.ajax({
        url: apiServer + '/loaduser',
        type: 'GET',
        data: json,
        success: function(njson) {
            if(njson.length == 0 || njson.username == username){
                user = "";
                $('#ipvlsd').addClass('has-error');
                ButtonDisableSD();
            }else{
                user = njson.username;
                $('#ipvlsd').removeClass('has-error');
                ButtonDisableSD(true);
            }
        }
    });
}


function GiftSDCJ(id="cfsd",modal="TransferStardustModal",ip="sdip",text="Confirm"){

    $('#'+id).attr("disabled",true);
    $('#'+id).html('<img src="./img/loading.gif" height="15px" />');
    console.log("Send Stardust")
    var scJson = {};
    var scCmd = {};
    scJson['username'] = username;
    scJson['type'] = "transferstardust";
    scCmd['tr_var1'] = Math.floor(amount);
    scCmd['tr_var2'] = user;
    scJson['command'] = scCmd;
    var njson = JSON.stringify(scJson);
    CustomJsonHandler(username,sc2app,njson,function(err,cujs){
        console.log(err,cujs);
        var json = {};
        json['user'] = username;
        MakeAPhonecall(apiServer + '/wallet',json,oldjsn,function (err,res) {
            if(res){
                $('#'+id).attr("disabled",false);
                $('#'+id).html(text);
                $('#'+modal).modal('hide');
                GetBalance();
                if(typeof Stardust === "function") { 
                    Stardust();
                }
                LoadDataSD();
            }else{
                $('#'+id).attr("disabled",false);
                $('#'+id).html(text);
                $('#'+modal).modal('hide');
                alert('No response from Backend, Custom_JSON was send \n\n'+cu_js.result.operations["0"][1].json);
            }
            $('#username').val('');
            $('#'+ip).val('');
        },'GET',null,scJson,cujs.result.block_num);
    });
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
  