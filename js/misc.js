var currentUTC = 0;
var CallRequest = null;
var ClearTickTook = false;
var Tickers = {};
var Calls = {};
var debug = setDebug();
var PlanetTricker = {};
var PlanetCurrent = {};
var apiServer = "";
var jarunikServer = "";

var skipCache = {};

//Global Variablen
var Bufforder = ['Scout','Patrol','Cutter','Corvette','Frigate','Destroyer','Cruiser','Battlecruiser','Carrier','Dreadnought'];

// ENV SNIFFING
pickApiServer()
function pickApiServer() {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "140.82.34.132") {
        jarunikServer = "http://nc-client-test.jarunik.com";
        apiServer = "http://140.82.34.132/api"
    } else {
        jarunikServer = "https://nc-client.jarunik.com";
        apiServer = 'https://api.nextcolony.io'
    }
}

function setDebug() {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "140.82.34.132") {
      return true
    } else {
      return false
    }
}


if(debug){
    console.log('Debug Mode activiated')
}

function setCookie(c_name,c_value) {
    document.cookie = c_name+"="+c_value+"; expires=Thu, 01 Jan 2970 00:00:00 UTC;";
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  

function validateint(evt) {
    var theEvent = evt || window.event;
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if(!regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function validateintmin(evt) {
    var theEvent = evt || window.event;
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    if(event.target.value.length == 0){
        var regex = /[0-9,-]/;
    }else{
        var regex = /[0-9]/;
    }
    if(!regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function SafariTime(time){
    var s = time;
    var a = s.split(/[^0-9]/);
    var d = new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] ).getTime();

    return d;
}

function adjustForTimezone(date){
    var timeOffsetInMS = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() - timeOffsetInMS);
    return date
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  } 

function msToHMS( duration , nos = false, dayfix = false) {

    var milliseconds = parseInt((duration % 1000) / 100),
       seconds = parseInt((duration / 1000) % 60),
       minutes = parseInt((duration / (1000 * 60)) % 60),
       hours = parseInt((duration / (1000 * 60 * 60)) % 24);
       days = parseInt((duration / (1000 * 60 * 60 * 24)) % 3100000);

     days = (days < 10) ? "0" + days : days;
     hours = (hours < 10) ? "0" + hours : hours;
     minutes = (minutes < 10) ? "0" + minutes : minutes;
     seconds = (seconds < 10) ? "0" + seconds : seconds;

     var end = "";
     if(!nos){
        end = ":" + seconds;
     }

     if(days > 0){
        return days + ":" + hours + ":" + minutes + end ;
     }else{
         if(!dayfix){
            return hours + ":" + minutes + end ;
         }else{
            return "00:" + hours + ":" + minutes + end ;
         }
     }
}

function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }
  
  function customJsonToken(account, id, json, cb){
    var lap = planetid;
    api.customJson(['active'],[account],id,json,function(err,res){
        console.log("token",err,res)
      if(lap == planetid){
          if(err){
            window.open('https://www.steemconnect.com/sign/custom-json?id='+id+'&json='+json+'&authority=active&required_posting_auths=[]&required_auths=["'+account+'"]', '_blank');
          }else{
            cb(err,res); 
          }
      }
    })
  }
  

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function MakeAPhonecall(url,json,oldjson,callback,ajaxtype = 'POST',variable=null,cmd=null,block=null){
    var tmpjson;
    var ticker = 0;

    skipCache[url] = true;

    if(Calls[url+json] != null){
        clearInterval(Calls[url+json]);
    }

    Calls[url+json] = setInterval(function() {
        if (CallRequest !== null) {
            return;
        }

        CallRequest = $.ajax({
            url: url,
            type: ajaxtype,
            data: json,
            success: function(msg) {
                try {
                    if(ajaxtype == 'GET'){
                        tmpjson = msg;
                    }else{
                        tmpjson = JSON.parse(msg);
                    }
                } catch (e) {
                    callback("Parsing Error",null)
                }

                var str_o = JSON.stringify(oldjson);
                var str_n = JSON.stringify(tmpjson);


                if(variable == null){
                    if(str_o != str_n){
                        callback(null,json);
                        clearInterval(Calls[url+json]);
                    }
                }else{
                    console.log(oldjson[variable],tmpjson[variable])
                    console.log(tmpjson[tmpjson.length-1])
                    if(Array.isArray(tmpjson)){
                        if(tmpjson[tmpjson.length-1]){
                            console.log('Call is an Array')
                            if(oldjson.length != tmpjson.length){
                                callback(null,json);
                                clearInterval(Calls[url+json]);
                            }
                        }else{
                            if(oldjson[variable] != tmpjson[variable]){
                                callback(null,json);
                                clearInterval(Calls[url+json]);
                            }
                        }
                    }else{
                        if(oldjson[variable] instanceof Object){
                            console.log('Call is an Obj ')
                            if(oldjson[variable].length != tmpjson[variable].length){
                                callback(null,json);
                                clearInterval(Calls[url+json]);
                            }
                        }else{
                            console.log('Call is an "normal"')
                            if(oldjson[variable] != tmpjson[variable]){
                                callback(null,json);
                                clearInterval(Calls[url+json]);
                            }
                        }
                    }
                }

                if(ticker > 15){
                    if(cmd){
                        CheckTransactions(cmd,block,function(err,res){
                            if(res){
                                callback(null,json);
                            }else{
                                callback('Overticked',null); 
                            }
                        })
                    }else{
                        callback('Overticked',null);
                    }
                    clearInterval(Calls[url+json]);
                }
                ticker++;

                CallRequest = null;
            }
        });
    }, 3000);
}

function CustomJsonHandler(account, id, json, cb){
    if(!planetid){
        var planetid = 0;
    }
    var lap = planetid;
    api.customJson([],[account],id,json,function(err,res){
      if(lap == planetid){
        if(err && err.cause && err.cause.data && err.cause.data.stack[0]){
            if(err.cause.data.stack[0].context.file == "rc_plugin.cpp"){
                alert("Out of resource credits, please buy Steem and power up.")
            }
        }
        cb(err,res);
      }
    })
  }

function CheckTransactions(json,block,callback){
    var rjson = {};
    rjson['limit'] = 2;
    rjson['type'] = json.type;
    rjson['user'] = username;
    var url = apiServer + '/transactions';
    var ticker = 0;

    setInterval(function() {
        $.ajax({
            url: url,
            type: 'GET',
            data: rjson,
            success: function(data) {
                data.forEach(line => {
                    if(line.tr_type == json.type && line.user == username && line.block_num == block && line.tr_status == 1){
                        callback(null,'success')
                    }
                });

                if(ticker > 15){
                    callback('Overticked',null);
                }
                ticker++;
            }
        });
    }, 3000);
}

function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    
    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

function TickTook(id,timestamp,callback,add="",dayfix=false){
    $('#'+id).html('');

    ClearTickTook = false;
    var busytime = Math.floor(timestamp);
    var utc = new Date();
    utc = utc / 1000;
    var hms = "";
    
    if(!isNaN(busytime) && busytime > utc){
        hms = msToHMS((busytime - utc) * 1000,false,dayfix);
        if(hms){
            $("#"+id).html(hms);
        }else{
            $('#'+id).html('');
        }
    }else{
        callback("Expired, "+busytime+' '+utc,null);
        return;
    }

    if(busytime <= utc){
        callback("Expired",null)
    }

    if(isNaN(busytime)){
        callback("isNaN",null);
    }

    if(Tickers[id] != null){
        clearInterval(Tickers[id]);
    }

    //Interval
    var Ticker = setInterval(function() {
        utc = new Date();
        utc = utc / 1000;
        
        if(!isNaN(busytime) && busytime > utc){
            hms = msToHMS((busytime - utc) * 1000,false,dayfix);
            if(hms){
                $("#"+id).html(hms+add);
            }else{
                $('#'+id).html(''+add);
            }
        }else{
            callback(null,'Expired')
            clearInterval(Ticker);
        }
        if(busytime <= utc){
            callback('Expired',null)
            clearInterval(Ticker);
        }

        if(ClearTickTook){
            callback('Cleared',null)
            clearInterval(Ticker);
        }
    }, 1000);

    Tickers[id] = Ticker;
}

function ClearTickTookf(id) {
    clearInterval(Tickers[id]);
}

function OnPlanetChange(callback,id=null){
    if(id == null){
        var Ticker = setInterval(function() {
            if(planetChanged){
                LoadQyt(function(err,res){
                    callback(null,true);
                    clearInterval(Ticker);
                });
                planetChanged = false;
            }
        });
    }else{
        PlanetCurrent[id] = planetid;
        PlanetTricker[id] = setInterval(function() {
            if(PlanetCurrent[id] != planetid){
                LoadQyt(function(err,res){
                    callback(null,true);
                    clearInterval(PlanetTricker[id]);
                });
                PlanetCurrent[id] = planetid;
            }
        });
    }
}

function RessourceBuilder(coal,ore,copper,uranium,stardust = null){
    CostBuilder = "";
    var NotEnough = false;
    //Coal
    if(coalqytu > coal){
        CostBuilder = CostBuilder + " "+coal+" "+Translate("coal")+",";
    }else{
        NotEnough = true;
        CostBuilder = CostBuilder + " <span class='text-dangerq'>"+coal+" "+Translate("coal")+"</span>,";
    }
    //Ore
    if(oreqytu > ore){
        CostBuilder = CostBuilder + " "+ore+" "+Translate("ore")+",";
    }else{
        NotEnough = true;
        CostBuilder = CostBuilder + " <span class='text-dangerq'>"+ore+" "+Translate("ore")+"</span>,";
    }
    //Copper
    if(copperqytu > copper){
        CostBuilder = CostBuilder + " "+copper+" "+Translate("copper")+",";
    }else{
        NotEnough = true;
        CostBuilder = CostBuilder + " <span class='text-dangerq'>"+copper+" "+Translate("copper")+"</span>,";
    }
    //Uranium
    if(uraniumqytu > uranium){
        CostBuilder = CostBuilder + " "+uranium+" "+Translate("uranium");
    }else{
        NotEnough = true;
        CostBuilder = CostBuilder + " <span class='text-dangerq'>"+uranium+" "+Translate("uranium")+"</span>";
    }
    //Stardust
    if(stardust){
        var stardust = (stardust / 100000000)
        CostBuilder = CostBuilder + ','
        if(stardustb > stardust){
            CostBuilder = CostBuilder + " "+stardust+" SD";
        }else{
            NotEnough = true;
            CostBuilder = CostBuilder + " <span class='text-dangerq'>"+stardust+" SD"+"</span>";
        }
    }

    var Enough = !NotEnough;

    return {cost:CostBuilder,enough:Enough};
}

function distance(lat1, lon1, lat2, lon2) {
    lat1 = parseInt(lat1);
    lon1 = parseInt(lon1);
    if(lat1 != null && lon1 != null){
        var a = lat1 - lat2;
        var b = lon1 - lon2;

        var c = Math.sqrt( a*a + b*b );
        return c; 
    }else{
        return null; 
    }
}

function RevAjax(data){
    /*var name = data.url+JSON.stringify(data.data);
    var cache = null;
    try {
        cache = localStorage.getItem(name);
    } catch(err){}
    if(cache != null){
        if(typeof skipCache[data.url] === "undefined" || skipCache[data.url] == false){
            try {
                data.success(JSON.parse(cache));
            } catch (error) {}
        }
    }

    $.ajax({
        url: data.url,
        type: data.type,
        data: data.data,
        success: function(msg){
            if(cache != JSON.stringify(msg)){
                data.success(msg);
            }
            try {
                localStorage.setItem(name, JSON.stringify(msg));
            } catch (error) {}
        }
    })*/

    $.ajax({
        url: data.url,
        type: data.type,
        data: data.data,
        success: function(msg){
            data.success(msg);
        }
    })
}

function PlanetRawToIMG(type,special,id){
    if(id.length == 3){
        return id;
    }else{
        console.log(type,special,id)
        var img = "";
        // Special
        if(special == 1){img = "co_"};
        if(special == 2){img = "un_"};
        if(special == 3){img = "rar_"};
        if(special == 4){img = "leg_"};

        // Type
        if(type == 1){img = img+"atm_"}
        if(type == 2){img = img+"coal_"}
        if(type == 3){img = img+"ore_"}
        if(type == 4){img = img+"copper_"}
        if(type == 5){img = img+"uranium_"}

        if(id == null || id == 0){
            img = img+1;
        }else{
            img = img+id;
        }
        return img;
    }
}

function PlanetIDToName(type,id){
    var word = "";
    if(type == "type"){
        if(id == 1){word = "Atmosphere"};
        if(id == 2){word = "Coal"};
        if(id == 3){word = "Ore"};
        if(id == 4){word = "Copper"};
        if(id == 5){word = "Uranium"};
    }else{
        if(id == 1){word = "Common"};
        if(id == 2){word = "Uncommon"};
        if(id == 3){word = "Rare"};
        if(id == 4){word = "Legendary"};
    }
    return word;
}

function SetCurrentUTC(){
    var utc = new Date();
    utc = utc / 1000;
    currentUTC = utc;
}

function relDiff(a, b) {
    return  100 * Math.abs( ( a - b ) / ( (a+b)/2 ) );
   }

setInterval(function() {
    SetCurrentUTC();
}, 5000);
SetCurrentUTC();