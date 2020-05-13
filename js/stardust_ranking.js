function LoadSDRanking(){

    var json = {};
    $.ajax({
        url: apiServer + '/wallet_ranking',
        type: 'GET',
        data: json,
        success: function(njson) {
            console.log(njson)
            njson.forEach(function(data,index){
                if(data.stardust > 0){

                var amount = formatNumber((data.stardust / 100000000).toFixed(3));
                var settler = data.user;
                var supply = (data.percentage*100).toFixed(2);

                $('#sdrk').append('<tbody>').append($('<tr>')
                    .append($('<td>').append(index+1))
                    .append($('<td>').append('<img src="https://steemitimages.com/u/'+settler+'/avatar" height="13px" width="13px" class="img-rounded" style="margin:0px;"> '+settler+'</span>'))
                    .append($('<td>').append('<span class="stardust">'+amount+'</span>'))
                    .append($('<td>').append(supply+"%")));
                }
            })
            GetBalance(function(err,res){
                $('#tstardust').html(formatNumber(stardustt));
            })
        }
    });
}


function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
  

LoadSDRanking();