var auction_planetIDs = [1006,1007,1008];
var auction_usernames = ['Nobody','Nobody','Nobody'];
var auction_price = [0,0,0];
var steem_main = "nextcolony";

var divauction = ["","",""];
var oldprice = [-1,-1,-1];
var auctioni = 0;

function SetInfoAuction(){
    var i = 0;
    auction_planetIDs.forEach(id =>{
        if(divauction[i] == ""){
            divauction[i] = document.getElementById("cur_bid_div"+i).innerHTML;
        }

        //If no Auction Set
        if(isNaN(auction_price[i])){
            auction_price[i] = 0;
        }
        if(auction_usernames[i] === null){
            auction_usernames[i] = "Nobody"; 
        }

        if(oldprice[i] < auction_price[i]){
            var tempdiv = divauction[i].replace("CUR_BID_PRICE",auction_price[i]);
            tempdiv = tempdiv.replace("CUR_BID_USER",auction_usernames[i]);
            tempdiv = tempdiv.replace("CUR_BID_MIN",auction_price[i]+1);
            document.getElementById("cur_bid_div"+i).innerHTML = tempdiv;
            document.getElementById("cur_bid_input"+i).placeholder = auction_price[i]+1;
            document.getElementById("cur_bid_input"+i).value = auction_price[i]+1;
        }

        oldprice[i] = auction_price[i];
        i++;
    });
}

function SetAuction(id){
    var value = document.getElementById("cur_bid_input"+id).value;

    document.getElementById("cur_bid_btn"+id).innerHTML = "Waiting for Blockchain...";
    document.getElementById("cur_bid_btn"+id).className = "btn btn-info btn-sm btn-block disabled";

    value = parseInt(value);

    if(value > auction_price[id]){
        OpenURL('https://app.steemconnect.com/sign/transfer?to='+steem_main+'&amount=0.001%20STEEM&memo=nc@{"type":"auctionbid","command":{"id":"'+auction_planetIDs[id]+'","bid":"'+value+'"}}&redirect_uri=http://nextcolony.io/');
    }
}

function GetLatestPrice(){
    if(auctioni > auction_planetIDs.length){
        auctioni = 0;
    }

    var json = {};
    json['id'] = auction_planetIDs[auctioni];

    $.ajax({
        url: apiServer + '/auction',
        type: 'POST',
        data: json,
        success: function(msg) {
            json = JSON.parse(msg);
            for(var i = 0; i < auction_planetIDs.length; i++){
                if(auction_planetIDs[i] == parseInt(json.id)){
                    auction_price[i] = parseInt(json.bid);
                    auction_usernames[i] = json.user;
                }
            }
            auctioni++;
            SetInfoAuction();
        },
        error: function(msg) {

        }
    });
}

//OnlyNumbers
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

function OpenURL(url) {
    var win = window.open(url, '_self');
    win.focus();
}

setInterval(function() {
    GetLatestPrice();
}, 1000);

GetLatestPrice();
SetInfoAuction();