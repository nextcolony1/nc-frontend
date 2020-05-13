function loadBattlefeed(){
    var jsn = {};
    jsn['limit'] = 200;
    $.ajax({
        url: apiServer + '/loadbattle',
        type: 'GET',
        data: jsn,
        success: function(data) {
            console.log(data);
            RenderBattlefeed(data)
        }
    });
}

function RenderBattlefeed(data){
    data.forEach(battle => {
        $('#battle_table').append($('<tr>')
            .append($('<td>').append(moment(battle.date*1000).format('MMMM D, YYYY [at] h:mm:ss a')))
            .append($('<td>').append(battle.attacker))
            .append($('<td>').append(battle.defender))
            .append($('<td>').append(battle.coal.toFixed(3)))
            .append($('<td>').append(battle.ore.toFixed(3)))
            .append($('<td>').append(battle.copper.toFixed(3)))
            .append($('<td>').append(battle.uranium.toFixed(3)))
            .append($('<td>').append('<a target="_blank" href="/report?mission='+battle.mission_id+'">Loot</a>')))
    });
}

loadBattlefeed()