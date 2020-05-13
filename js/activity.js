var activitydata = {
    explorespace: "Explorer",
    transport: "Transport",
    deploy: "Deploy",
    support: "Support",
    attack: "Attack",
    siege: "Siege",
    breaksiege: "Break Siege",
    buildship: "Build Ship",
    upgrade: "Upgrade",
    enhance: "Enhance",
    activate: "Activate",
    giftitem: "Gift Item",
    giftplanet: "Gift Planet",
    renameplanet: "Rename Planet",
    cancel: "Cancel",
    enable: "Enable",
    charge: "Charge",
    newuser: "New User",
    transferstardust: "Transfer Stardust",
    issue: "Issue",
    issuestardust: "Issue Stardust",
    newseason: "New Season",
    upgradeyamato: "Upgrade Yamato",
    ask: "Ask",
    cancel_ask: "Cancel Ask",
    fill_ask: "Fill Ask",
    burn: "Burn",
    respawn: "Respawn",
    buff: "Buff"
}

var usera = "all";
var typea = "all";

function LoadActivityData(){
    var requestjson = {};
    if(typea != "all"){
        requestjson['type'] = typea;
    }
    if(usera != "all"){
        requestjson['user'] = usera;
    }

    $.ajax({
        url: apiServer + '/transactions',
        type: 'GET',
        data: requestjson,
        success: function(data) {
            console.log(data);
            RenderActivity(data)
        }
    });
}

function RenderOptions(){
    $('#activity_options').html("")
    $('#activity_options').append(
        $('<option></option>').val("all").html("All Commands")
    );
    Object.keys(activitydata).forEach(function(key) {
        $('#activity_options').append(
            $('<option></option>').val(key).html(activitydata[key])
        );
    });
    RenderOptionsActivity();
}

function RenderActivity(data){
    $('#activity_tb').html("")
    data.forEach(activity => {
        var status = "Unprocessed";
        var trx = '<a target="_blank" href="'+apiServer+'/loadtransaction?trx_id='+activity.trx+'">'+activity.trx.substring(0,8)+'...</a>';
        if(activity.tr_status == 1){
            status = "Success"
        }
        if(activity.tr_status == 2){
            status = '<span style="color:#a94442;">Failed</span>'
        }

        if(typea == "upgradeyamato"){
            $('#planet_header').css('display','');
            $('#activity_tb').append($('<tr>')
                .append($('<td>').append(moment(activity.date*1000).format('MMMM D, YYYY [at] h:mm:ss a')))
                .append($('<td>').append(activity.user))
                .append($('<td>').append(activitydata[activity.tr_type]))
                .append($('<td>').append(status))
                .append($('<td>').append('<a target="_blank" href="/planet/'+activity.tr_var1+'">View</a>'))
                .append($('<td>').append(trx)))
        }else{
            $('#planet_header').css('display','none');
            $('#activity_tb').append($('<tr>')
                .append($('<td>').append(moment(activity.date*1000).format('MMMM D, YYYY [at] h:mm:ss a')))
                .append($('<td>').append(activity.user))
                .append($('<td>').append(activitydata[activity.tr_type]))
                .append($('<td>').append(status))
                .append($('<td>').append(trx)))
        }

        
    });
}

// Add Action to HTML
$("#usera").keypress(function (e) {
    if (e.which == 13) {
        usera = $("#usera").val();
        LoadActivityData();
        return false;
    }
});

function RenderOptionsActivity(){
    $("#activity_options").unbind();
    $("#activity_options").on('change', function() {
        typea = this.value;
        LoadActivityData();
    });
}

$('#me_btn').click(function(){
    usera = username;
    $("#usera").val(username);
    LoadActivityData();
})

$('#all_btn').click(function(){
    usera = "all";
    $("#usera").val("all");
    LoadActivityData();
})

RenderOptions();
LoadActivityData();