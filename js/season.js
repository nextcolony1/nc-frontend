var list = null;
function loadSeason(){
    var json = {};
    $.ajax({
        url: apiServer + '/seasonranking',
        type: 'GET',
        data: json,
        success: function(json) {
            console.log(json)
            $('#sname').text(json.name)
            $('#sdate').text(moment(json.start_date*1000).format('Do MMMM YYYY, h:mm a') + ' - ' + moment(json.end_date*1000).format('Do MMMM YYYY, h:mm a'))
            $('#sinfo').text("Prize Pool: "+json.steem_rewards+" STEEM, Leach Rate: "+(json.leach_rate*100)+"%, Deploy Rate: "+(json.deploy_rate*100)+"%");
            if(json.end_date > currentUTC){
                $('#stimer').html('Season ends in <span id="stimerc"></span>')
                TickTook("stimerc",json.end_date,function(err,res){
                    $('#stimer').html('<i>No Active Season</i>')
                })
            }else{
                $('#stimer').html('<i>No Active Season</i>')
            }


            list = json.ranking;
            renderSeason('total_reward')

            //Activate Buttons
            $('#urp').click(function() {
                renderSeason('build_reward')
            })
            $('#drp').click(function() {
                renderSeason('destroy_reward')
            })
            $('#trp').click(function() {
                renderSeason('total_reward')
            })
        }
    })
}

var reverse = true;
function renderSeason(type){
    $('#tbody').html('');

    list = list.sort(dynamicSort(type))
    if(reverse){
        list.reverse();
        reverse = false;
    }else{
        reverse = true;
    }
    var pos = 1;
    var last_total = 0;
    list.forEach(data => {
        //icon
        var icon = "";
        if(pos == 1){
            icon = '<img src="/img/icons/crown_gold.png" height="16px"></img>'
        }
        if(pos > 1 && pos <= 10){
            icon = '<img src="/img/icons/crown.png" height="16px"></img>'
        }
        if(pos == 2 && last_total == data.total_reward){
            icon = '<img src="/img/icons/crown_gold.png" height="16px"></img>'
        }

        $('#table').append('<tbody id="tbody">').append($('<tr>')
            .append($('<td>').append(pos))
            .append($('<td>').append(icon))
            .append($('<td>').append('<span><img src="https://steemitimages.com/u/'+data.user+'/avatar" height="13px" class="img-rounded" style="margin:0px;"> '+data.user+'</span>'))
            .append($('<td>').append(data.build_reward/100000000))
            .append($('<td>').append(data.destroy_reward/100000000))
            .append($('<td>').append(data.total_reward/100000000)))

        last_total = data.total_reward
        pos++;
    });
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

loadSeason();