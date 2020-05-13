var report_div = "";
var report_main = "";

var mission = "";
var variant = "";

var structure = {}, armor = {}, shield = {};

var ships = ['transportship','transportship1','transportship2','explorership','explorership1','scout','scout1','patrol','patrol1','cutter','cutter1','corvette','corvette1','frigate','frigate1','destroyer','destroyer1','cruiser','cruiser1','battlecruiser','battlecruiser1','carrier','carrier1','dreadnought','dreadnought1'];

/// URL Handler
var query = window.location.search.substring(1);
var qs = parse_query_string(query);

function GetReportDiv(){
    $.ajax({ type: "GET",   
        url: "include/report_div",   
        async: false,
        success : function(html)
        {
            report_div = html;
            $.ajax({ type: "GET",   
                url: "include/report_main_div",   
                async: false,
                success : function(html)
                {
                    report_main = html;
                    GetReport();
                }
            });
        }
    });
}

function GetReport(){
    var json = {};
    json['user'] = username;
    json['mission_id'] = mission;
    if(variant != ""){
        json['battle_number'] = variant;
    }
    $.ajax({
        url: apiServer + '/loadbattle',
        type: 'GET',
        data: json,
        success: function(jsn) {
            RenderReport(jsn);
            console.log(jsn)
        }
    });
}

function shipyard(){
    var json = {};
    json['user'] = username;
    json['planet'] = planetid;
    $.ajax({
        url: apiServer + '/planetshipyard',
        type: 'GET',
        data: json,
        success: function(jsn) {
            jsn.forEach(ship => {
                console.log(ship)
                structure[ship.type] = ship.structure;
                armor[ship.type] = ship.armor;
                shield[ship.type] = ship.shield;
            });
            GetReport();
        }
    });
}

function RenderReport(json){

    var jsn = json[json.length-1];

    var AState = 'Draw', AColor = 'white';
    var BState = 'Draw', BColor = 'white';
    var ASign = '', BSign = '';
    var WinColor = '#5CB85C', LoseColor = '#a94442';

    var result = 0;
    result = jsn.result;

    //State
    if(result == 2){
        AColor = WinColor;
        AState = "Won";
        ASign = '+';
        BColor = LoseColor;
        BState = "Lost";
        BSign = "-";
    }
    if(result == 1){
        AColor = LoseColor;
        AState = "Lost";
        ASign = '-';
        BColor = WinColor;
        BState = "Won";
        BSign = '+';
    }

    var date = moment.unix(jsn.date).format('MM/DD/YY, h:mm:ss');

    var tmp_main = report_main;
    tmp_main = replaceAll(tmp_main,'attacker_',jsn.attacker)
    tmp_main = replaceAll(tmp_main,'defender_',jsn.defender)

    tmp_main = replaceAll(tmp_main,'fx_',jsn.cords_hor)
    tmp_main = replaceAll(tmp_main,'fy_',jsn.cords_ver)

    tmp_main = replaceAll(tmp_main,'tx_',jsn.cords_hor_dest)
    tmp_main = replaceAll(tmp_main,'ty_',jsn.cords_ver_dest)

    tmp_main = replaceAll(tmp_main,'date_',date)

    //Color
    tmp_main = replaceAll(tmp_main,'acolor_',AColor)
    tmp_main = replaceAll(tmp_main,'bcolor_',BColor)

    //State
    tmp_main = replaceAll(tmp_main,'astate_',AState)
    tmp_main = replaceAll(tmp_main,'bstate_',BState)

    //Sign
    tmp_main = replaceAll(tmp_main,'as_',ASign)
    tmp_main = replaceAll(tmp_main,'bs_',BSign)

    //Ressources
    tmp_main = replaceAll(tmp_main,'coal_',jsn.coal)
    tmp_main = replaceAll(tmp_main,'ore_',jsn.ore)
    tmp_main = replaceAll(tmp_main,'copper_',jsn.copper)
    tmp_main = replaceAll(tmp_main,'uranium_',jsn.uranium)

    $('#content').prepend(tmp_main)

    ///Ships
    //Before
    var aships = jsn.initial_attacker_ships;
    var dships = jsn.initial_defender_ships;

    var afships = jsn.final_attacker_ships;
    var dfships = jsn.final_defender_ships;

    RenderTable(aships,afships,'attack_ships')
    RenderTable(dships,dfships,'defend_ships')
}

function RenderTable(data,final,id){
    var ix = 0;
    console.log(data)

    final.sort((a,b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0)); 

    final.forEach(function(ship,index){
        //if(final.some( final => final['pos'] === (index+1).toString() )){
            let fship = final.filter( final => final['type'] === ship.type )[0]
            let iship = data.filter( data => data['type'] === ship.type )[0]

        
            var tmp_ship = report_div;

            var strc = iship.structure.toFixed(2);
            var armo = iship.armor.toFixed(2);
            var shie = iship.shield.toFixed(2);

            var cstrc = fship.structure.toFixed(2);
            var carmo = fship.armor.toFixed(2);
            var cshie = fship.shield.toFixed(2);

            var strk = "", armr = "", shid = "";
            if(cstrc != strc){
                strk = '<span style="color:#a94442;">'+(strc-cstrc).toFixed(2)+'</span>/'
            }
            if(carmo != armo){
                armr = '<span style="color:#a94442;">'+(armo-carmo).toFixed(2)+'</span>/'
            }
            if(cshie != shie){
                shid = '<span style="color:#a94442;">'+(shie-cshie).toFixed(2)+'</span>/'
            }
            
            tmp_ship = replaceAll(tmp_ship,'name_',Translate(fship.type))

            var lost = "";
            if(fship.lost > 0){
                lost = '<span style="color:#a94442;">'+fship.lost+'</span>/'
            }

            tmp_ship = replaceAll(tmp_ship,'amount_',lost+fship.n)

            tmp_ship = replaceAll(tmp_ship,'structure_',strk+strc)
            tmp_ship = replaceAll(tmp_ship,'armor_',armr+armo)
            tmp_ship = replaceAll(tmp_ship,'shield',shid+shie)

            $('#'+id).append(tmp_ship);
            ix++;
        //}
    });
}

/// URL Handler
if(qs.mission){
    mission = qs.mission;
    if(qs.variant){
        variant = qs.variant;
    }
    GetReportDiv();
}