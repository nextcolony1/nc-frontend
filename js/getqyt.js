var username = getCookie("user"); 
var planetid = getCookie("planetid"); 

var orehtml = document.getElementById("qyt_ore").innerHTML;
var coalhtml = document.getElementById("qyt_coal").innerHTML;
var copperhtml = document.getElementById("qyt_copper").innerHTML;
var uraniumhtml = document.getElementById("qyt_uranium").innerHTML;

var oreqyt, coalqyt, copperqyt, uraniumqyt; //old
var oreqytu, coalqytu, copperqytu, uraniumqytu; //updated
var oremaxqyt, coalmaxqyt, coppermaxqyt, uraniummaxqyt; //Max
var orerate, coalrate, copperrate, uraniumrate; // Rate
var oreprd, coalprd, copperprd, uraniumprd; // Productions
var lastUpdateQyt;
var lastDiffQyt;

var isResourceCalculating = true;
var isStoppedProducing = false;

var stardustb = null;
var stardustt = null;


function GetQyt(callback = null){
    GetBalance();
    var json = {};
    json['id'] = planetid;

    $.ajax({ 
        url: apiServer + '/loadqyt',
        type: 'GET',
        data: json,
        success: function(msg) {
            json = msg;
            //json = msg;
            oreqyt = json.ore;
            coalqyt = json.coal;
            copperqyt = json.copper;
            uraniumqyt = json.uranium;
            
            orerate = json.orerate;
            coalrate = json.coalrate;
            copperrate = json.copperrate;
            uraniumrate = json.uraniumrate;

            oremaxqyt = json.oredepot;
            coalmaxqyt = json.coaldepot;
            coppermaxqyt = json.copperdepot;
            uraniummaxqyt = json.uraniumdepot;

            lastUpdateQyt = Math.floor(json.lastUpdate);

            lastDiffQyt = (Date.now() / 1000) - lastUpdateQyt;

            if(callback){
                SetQyt(function(err,res){
                    if(res){
                        callback(null,true);
                    }
                });
            }else{
                SetQyt();
            }
        },
        error: function(msg) {

        }
    });
}

function GetBalance(callback = null){
    var json = {};
    json['user'] = username;
        $.ajax({ 
            url: apiServer + '/wallet',
            type: 'GET',
            data: json,
            success: function(njson) {
                stardustt = (njson.supply / 100000000).toFixed(0);
                stardustb = (njson.stardust / 100000000);

                if(typeof SetDataSD === "function") { 
                    jsn = {};
                    jsn['balance'] = njson.stardust;
                    jsn['supply'] = njson.supply;
                    jsn['balance_se'] = 0;//njson.se_stardust;
                    SetDataSD(jsn);
                }
                if(typeof Stardust === "function") { 
                    Stardust();
                }
                if(typeof LoadBuffs === "function"){
                    RenderBuffs();
                }

                if(callback){
                    callback(null,stardustb);
                    return;
                }
                var sdt = '';
                if(stardustb > 900){
                    sdt = stardustb.toFixed(0);
                }else{
                    sdt = stardustb.toFixed(1);
                }
                $('#qyt_stardust').html(sdt+" SD"+'<span style="text-shadow:none;"><b>Stardust</b><br>Earn In-game tokens while playing!</span>')
            }
        });
}

function StardustWallet(callback){
    var json = {};
    json['user'] = username;
    json['limit'] = 30;
    $.ajax({ 
        url: apiServer + '/wallet',
        type: 'GET',
        data: json,
        success: function(json) {
            console.log("Wallet",json);
            stardustb = json.stardust;
            callback(null,true);
        }
    })
}

function GetPrd(){

}

function GetNPrd(callback=null){
    var json = {};
    json['id'] = planetid;
    json['user'] = username;


        $.ajax({ 
            url: apiServer + '/loadproduction',
            type: 'GET',
            data: json,
            success: function(json) {
                oreprd = json.ore;
                copperprd = json.copper;
                coalprd = json.coal;
                uraniumprd = json.uranium;
                if(typeof Production === "function") { 
                    Production();
                }
                if(callback){callback(null,true)};
            },
            error: function(msg) {

            }
        });
}

function SetQyt(callback = null){
    //Calc Timedifference
    var utc = new Date();
    utc = utc / 1000;
    var diff = (utc - lastUpdateQyt) / (3600*24);

    if(uraniummaxqyt > uraniumqyt){
        uraniumqytu = uraniumqyt + (diff * uraniumrate);
    }else{
        uraniumqytu = uraniumqyt;
    }
    if(coalmaxqyt > coalqyt){
        coalqytu = coalqyt + (diff * coalrate);
    }else{
        coalqytu = coalqyt;
    }
    if(oremaxqyt > oreqyt){
        oreqytu = oreqyt + (diff * orerate);
    }else{
        oreqytu = oreqyt;
    }
    if(coppermaxqyt > copperqyt){
        copperqytu = copperqyt + (diff * copperrate);
    }else{
        copperqytu = copperqyt;
    }

    //CalcDifferences

    //check if NaN
    if(isNaN(oreqytu)){
        oreqytu = 0;
    }
    if(isNaN(coalqytu)){
        coalqytu = 0;
    }
    if(isNaN(copperqytu)){
        copperqytu = 0;
    }
    if(isNaN(uraniumqytu)){
        uraniumqytu = 0;
    }

    //Remove MAX Danger
    document.getElementById("qyt_uranium").classList.remove("text-dangerq");
    document.getElementById("qyt_coal").classList.remove("text-dangerq");
    document.getElementById("qyt_copper").classList.remove("text-dangerq");
    document.getElementById("qyt_ore").classList.remove("text-dangerq");

    //Ranger Danger!
    if(uraniummaxqyt <= parseFloat(uraniumqytu)){
        if(uraniumqyt < uraniummaxqyt){
            uraniumqytu = parseFloat(uraniummaxqyt + ".00");
        }
        document.getElementById("qyt_uranium").classList.add("text-dangerq");
    }
    if(oremaxqyt <= parseFloat(oreqytu)){
        if(oreqyt < oremaxqyt){
            oreqytu = parseFloat(oremaxqyt + ".00");
        }
        document.getElementById("qyt_ore").classList.add("text-dangerq");
    }
    if(coalmaxqyt <= parseFloat(coalqytu)){
        if(coalqyt < coalmaxqyt){
            coalqytu = parseFloat(coalmaxqyt + ".00");
        }
        document.getElementById("qyt_coal").classList.add("text-dangerq");
    }
    if(coppermaxqyt <= parseFloat(copperqytu)){
        if(copperqyt < coppermaxqyt){
            copperqytu = parseFloat(coppermaxqyt + ".00");
        }
        document.getElementById("qyt_copper").classList.add("text-dangerq");
    }
    

    oreqytu = parseFloat(oreqytu);
    coalqytu = parseFloat(coalqytu);
    copperqytu = parseFloat(copperqytu);
    uraniumqytu = parseFloat(uraniumqytu);

    //ToFIXED
    if(oreqytu > 900){
        oreqytu = oreqytu.toFixed(0);
    }else{
        oreqytu = oreqytu.toFixed(1);
    }
    if(copperqytu > 900){
        copperqytu = copperqytu.toFixed(0);
    }else{
        copperqytu = copperqytu.toFixed(1);
    }
    if(coalqytu > 900){
        coalqytu = coalqytu.toFixed(0);
    }else{
        coalqytu = coalqytu.toFixed(1);
    }
    if(uraniumqytu > 900){
        uraniumqytu = uraniumqytu.toFixed(0);
    }else{
        uraniumqytu = uraniumqytu.toFixed(1);
    }


    GetNPrd(function(err,res){
        //Set Qyt in Header
        document.getElementById("qyt_ore").innerHTML = oreqytu+' Fe'+'<span style="text-shadow:none;"><b>Ore</b> (Resource)<br>+'+oreprd.production.toFixed(2)+' Fe / day<br>Capacity: '+oreprd.depot.toFixed(2)+' Fe</span>';
        document.getElementById("qyt_coal").innerHTML = coalqytu+' C'+'<span style="text-shadow:none;"><b>Coal</b> (Resource)<br>+'+coalprd.production.toFixed(2)+' C / day<br>Capacity: '+coalprd.depot.toFixed(2)+' C</span>';
        document.getElementById("qyt_copper").innerHTML = copperqytu+' Cu'+'<span style="text-shadow:none;"><b>Copper</b> (Resource)<br>+'+copperprd.production.toFixed(2)+' Cu / day<br>Capacity: '+copperprd.depot.toFixed(2)+' Cu</span>';
        document.getElementById("qyt_uranium").innerHTML = uraniumqytu+' U'+'<span style="text-shadow:none;"><b>Uranium</b> (Resource)<br>+'+uraniumprd.production.toFixed(2)+' U / day<br>Capacity: '+uraniumprd.depot.toFixed(2)+' U</span>';
    })

    if(callback){
        callback(null,true);
    }
}

function LoadQyt(callback){
    GetQyt(function(err,res){
        if(res){
            callback(null,true);
        }else{
            callback("Error while Loading Qyt",null);
        }
    });
}

function FastLoadQyt(callback){
    if(coalqyt > 0){
        callback(null,true)
    }else{
        GetQyt(function (err,res) {
            callback(err,res);
        })
    }
}

function SetQytCalculating(state){
    isResourceCalculating = state;
    coalqytu = 0;
    GetQyt();
}

function WaitForEnoughRes(coal,ore,copper,uranium,callback){
    var Ticker = setInterval(function() {
        if(coalqytu >= coal && oreqytu >= ore && copperqytu >= copper && uraniumqytu >= uranium){
            callback(null,true);
            clearInterval(Ticker);
        }
    }, 8000);
}

setInterval(function() {
    SetQyt();
}, 8000);

GetPrd();
GetQyt();
GetBalance();
