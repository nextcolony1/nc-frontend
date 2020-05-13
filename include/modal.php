<!-- BeispielModal -->
<div class="modal fade" id="BeispielModal" tabindex="-1" role="dialog" aria-labelledby="meinModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="meinModalLabel">Venus XII</h4>
      </div>
      <div class="modal-body">
        Dies ist die äußerst ausführliche und mitreissende Beschreibung dieses phänomenalen Modals, welcher nach einem Klick auf den Button Upgrade erscheint. Hiermit möchte ich die Länge des Containers prüfen und es scheint sehr gut zu funktionieren.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-sm btn-block" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- PlanetCoordModal -->
<div class="modal fade" id="PlanetCoordModal" tabindex="-1" role="dialog" aria-labelledby="meinModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="pla_modal_header">Planet: date_</h4>
      </div>
      <div class="modal-body" id="pla_modal_text">
        Planet name: name_ (<a href="planet/id_" style="color:#333;">view</a>)<br>
        ID: id_ <br>
        Coordinate: x_/y_<br>
        Owner: user_<br>
        Rarity: rarity_<br>
        Type: type_<br>
        Discovered: date_<br>
        Starter: starter_<br><br>
        <span style="font-size:13px; color:#1A5099;">Available Missions User: <span id="av_pl">-/-</span>, Planet: <span id="available_planet">-/-</span></span>
        <div style="margin:15px 0 10px 0;">
        <select class="form-control" id="planetselectg" style="width:100%;" onchange="SetMission(value)">
          <option>Choose a mission</option>
          <option>Transport</option>
          <option>Attack</option>
          <option>Siege</option>
          <option>Support</option>
          <option>Deploy</option>
        </select>
        </div>
      </div>
      <div class="modal-footer">
        <button style="display:none" id="cancelmis" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" id="modal_mission_btn" class="btn btn-success btn-sm btn-block" disabled="disabled">Start mission</button>
      </div>
    </div>
  </div>
</div>

<!-- DiscoveredCoordModal -->
<div class="modal fade" id="DiscoveredCoordModal" tabindex="-1" role="dialog" aria-labelledby="meinModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="meinModalLabel">Discovered</h4>
      </div>
      <div class="modal-body" id="dis_modal_text">
        Coordinate x_/y_ was discovered on date_ by user_. Nothing was found here.<br><br>
        Status: Discovered<br>
        Coordinate: x_/y_<br>
        Discovered: date2_<br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-sm btn-block" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- UndiscoveredCoordModal -->
<div class="modal fade" id="UndiscoveredCoordModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;" data-backdrop="dynamic" data-keyboard="false">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" id="unmiss" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Undiscovered</h4>
      </div>
      <div class="modal-body">
      <span id="und_modal_text">
        Status: Undiscovered<br>
        Coordinate: x_/y_<br>
        Distance (coordinates): dist_<br>
        Time needed (outward flight): time_<br>
        Arrival: arr_<br>
        Return: ret_<br>
        Required uranium (out/back): ura_<br>
        Maximum speed (coordinates per hour): speed_<br>
        Droprate (chance for a planet): droprate_<br><br>
        <span style="font-size:13px; color:#1A5099;">Available Missions User: <span id="av_un">-/-</span>, Planet: <span id="un_available_planet">-/-</span></span>
        </span>
        <div style="margin:15px 0 10px 0;">
        <select class="form-control" id="und_selection" style="width:100%;">
          <option value="0">Choose a explorer</option>
        </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="und_modal_btn" class="btn btn-success btn-sm btn-block">Explore now</button>
      </div>
    </div>
  </div>
</div>

<!-- RenamePlanetModal -->
<div class="modal fade" id="RenamePlanetModal" tabindex="-1" role="dialog" aria-labelledby="meinModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="meinModalLabel">Rename</h4>
      </div>
      <div class="modal-body">
        Here you can rename your planet and show your creativity.<br><br>
          <input autocomplete="off" id="renameinp" onkeydown='RenameFilter(event)'type="text" class="form-control" placeholder="Planetname">
          <span style="color:#ccc; font-size:11px;">Letters A-Z, numbers 0-9 and special characters .-#_</span>
      </div>
      <div class="modal-footer">
        <button type="button" id="renamebtn" onclick="RenamePlanet()" class="btn btn-success btn-sm btn-block">Safe</button>
      </div>
    </div>
  </div>
</div>


<!-- OpenChestItemModal -->
<div class="modal fade" id="OpenChestItemModal" tabindex="-1" role="dialog" aria-labelledby="meinModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="meinModalLabel">Open</h4>
      </div>
      <div class="modal-body">
        To which planet would you like to assign the resources of the opened chest? First select a planet and then click "Open now".<br><br>
        <select class="form-control" style="width:100%;" id="items_chest_modal" onchange="SetPlanet(value)">
          <option>Choose a planet</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" id="items_chest_modal_btn" onclick="ActivateItem()" disabled class="btn btn-success btn-sm btn-block">Open now</button>
      </div>
    </div>
  </div>
</div>

<!-- MergeBoosterItemModal -->
<div class="modal fade" id="MergeBoosterItemModal" tabindex="-1" role="dialog" aria-labelledby="meinModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="meinModalLabel">Merge</h4>
      </div>
      <div class="modal-body" id="items_merge_descr">
        To which planet would you like to merge the percent_% Booster? Please note that existing boosters will be overwritten. First select a planet and then click "Merge now".<br><br>
        <select class="form-control" style="width:100%;" id="items_booster_modal" onchange="SetPlanetBooster(value)">
          <option>Choose a planet</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" id="items_merge_modal_btn" disabled onclick="MergeItem()" class="btn btn-success btn-sm btn-block">Merge now</button>
      </div>
    </div>
  </div>
</div>

<!-- MergeBlueprintItemModal -->
<div class="modal fade" id="MergeBlueprintItemModal" tabindex="-1" role="dialog" aria-labelledby="meinModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="meinModalLabel">Activate</h4>
      </div>
      <div class="modal-body" id="items_merge_descr">
        To which planet would you like to activate the Blueprint? Please note that existing blueprints will not be overwritten. First select a planet and then click "Activate now".<br><br>
        <select class="form-control" style="width:100%;" id="items_blueprint_modal" onchange="SetPlanetBlueprint(value)">
          <option>Choose a planet</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" id="blueprint_merge_modal_btn" disabled onclick="MergeItem()" class="btn btn-success btn-sm btn-block">Activate now</button>
      </div>
    </div>
  </div>
</div>

<!-- GiftItemModal -->
<div class="modal fade" id="GiftItemModal" tabindex="-1" role="dialog" aria-labelledby="meinModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="meinModalLabel">Gift</h4>
      </div>
      <div class="modal-body" id="giftbody">
        <span id="giftbodytxt">
          To which user would you like to gift this item? Enter the username in the form field and then click "Gift now".<br><br>
        </span>
        <input type="text" id="gift_modal_input" class="form-control" placeholder="username">
      </div>
      <div class="modal-footer">
        <button type="button" id="gift_modal_btn" class="btn btn-success btn-sm btn-block">Gift now</button>
      </div>
    </div>
  </div>
</div>

<!-- MissionCancelModal -->
<div class="modal fade" id="MissionCancelModal" tabindex="-1" role="dialog" aria-labelledby="meinModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="meinModalLabel">Cancel Mission</h4>
      </div>
      <div class="modal-body">
        <span id="mission_cancel_text">
        You can cancel this mission now but then the required uranium for the flight will be lost. Are you sure you want to do this now?
        </span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success btn-sm btn-block" id="cancel_btn">Confirm</button>
      </div>
    </div>
  </div>
</div>

<!-- RespawnPlanetModal -->
<div class="modal fade" id="RespawnPlanetModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Respawn</h4>
      </div>
      <div class="modal-body">
          If all the tiles around you are already explored or you are constantly attacked, it is time to start over in a new location. Respawn allows you to start all over again in the beta galaxy. You'll start in a new area with potentially many empty tiles waiting to be explored by you. On respawn you will sacrifice the starter planet (alpha planet). You will get a new empty starter planet in a new location with new coordinates.<div style="margin:12px 0 12px 0;">Fee for respawn: <b>1000 Stardust</b></div><div id="nesr" style="color:#a94442;margin:0 0 10px 0;"><i>Not enough Stardust in your <a href="wallet" style="color:#a94442;" target="blank" class="steem-keychain-checked">wallet</a>.</i></div><div style="color:#a94442;margin:0 0 12px 0;"><i>- On respawn you will lose the planet with all ships, merged runes, and activated blueprints on it.<br>- Respawn is only possible without active own missions.<br>- Please read this notes carefully and be aware that this transaction is irreversible.</i></div>
      </div>
      <div class="modal-footer">
        <button type="button" id="renow" class="btn btn-success btn-sm btn-block">Respawn now</button>
      </div>
    </div>
  </div>
</div>

<!-- BurnPlanetModal -->
<div class="modal fade" id="BurnPlanetModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Burn planet for Stardust</h4>
      </div>
      <div class="modal-body">
          <div>You can burn this planet to get Stardust. The amount of Stardust depends on rarity and type. On burn you will sacrifice the planet with all ships, merged runes and activated blueprints on it.</div>
          <div style="margin:12px 0 12px 0;">Do you want to burn this planet?</div>
          <div id="burninfo" style="margin:12px 0 12px 0;"></div><div style="color:#a94442;margin:0 0 12px 0;"><i>- On burn you will lose the planet with all ships, merged runes and activated blueprints on it.<br>- Burn planet is only possible without active own missions.<br>- Please read this notes carefully and be aware that this transaction is irreversible.</i></div>
      </div>
      <div class="modal-footer">
        <button type="button" id="benow" class="btn btn-success btn-sm btn-block">Burn planet now</button>
      </div>
    </div>
  </div>
</div>

<!-- SellPlanetModal -->
<div class="modal fade" id="SellPlanetModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;" id="">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Sell</h4>
      </div>
      <div class="modal-body" id="sellinfo">
        Define a price in Stardust and click "Confirm" to put the planet on the market.<br><br>
        Planet name: name_ (<a href="ref_" style="color:#333;">view</a>)<br>
        ID: id_<br>
        Coordinate: corx_/cory_<br>
        Owner: username_<br>
        Rarity: rare_<br>
        Typ: type_<br>
        Discovered: discovered_<br><br>
        <div class="input-group input-group-sm" id="">
        <input type="text" id="sellsd" class="form-control">
        <span class="input-group-addon">Stardust</span>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="sellnow" class="cfsd btn btn-success btn-sm btn-block">Confirm</button>
      </div>
    </div>
  </div>
</div>

<!-- TransferStardustModal -->
<div class="modal fade" id="TransferStardustModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Transfer to account</h4>
      </div>
      <div class="modal-body">
        Move stardust to another account.<br>
        <div style="font-size:12px;margin: 12px 0 0 0;">From:</div>
        <div class="input-group input-group-sm">
        <span class="input-group-addon">@</span>
        <input type="text" class="form-control" id="myus" placeholder="" disabled="">
        </div>
        <div style="font-size:12px;margin: 10px 0 0 0;">To:</div>
        <div class="input-group input-group-sm" id="ipvlsd">
        <span class="input-group-addon">@</span>
        <input type="text" class="form-control" autocomplete="off" id="username" placeholder="username">
        </div>
        <div style="font-size:12px;margin: 10px 0 0 0;">Amount:</div>
        <div class="input-group input-group-sm">
        <input type="text" class="form-control" id="sdip" pattern="^\d*(\.\d{0,3})?$" />
        <span class="input-group-addon">STARDUST</span>
        </div>
        <div style="margin: 5px 0 0 0;"><botton href="" id="mdbl" style="color:#1A5099; font-size:12px; border-bottom:1px dotted; cursor:pointer;">Balance: 0 STARDUST</botton></div>
      </div>
      <div class="modal-footer">
        <button type="button" disabled id="cfsd" onclick="GiftSD()" class="cfsd btn btn-success btn-sm btn-block">Confirm</button>
      </div>
    </div>
  </div>
</div>

<!-- InfoStardustModal -->
<div class="modal fade" id="InfoStardustModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Stardust</h4>
      </div>
      <div class="modal-body">
        Mighty supernovae distributed stardust in space. When Planet Earth was formed more than four billion years ago, many elements came to Earth as Stardust. Stardust was a component of the dust in the interstellar medium before its incorporation into meteorites. The meteorites have stored those stardust grains. Everything we are, and everything in the universe, and on Earth originated from stardust, and it continually floats through us even today. It directly connects us to the universe, rebuilding our bodies over and again over our lifetimes.<br><br>
        Thanks to technological progress, Stardust can now be extracted from almost anything in space. The process is costly, and it is only possible to extract small amounts of stardust, but it is important for the interstellar community because it allows settlers and raiders an independent and transparent market. The new interstellar currency represents a significant step forward.<br><br>
        <i>"There is now a realistic chance to finally strengthen poorer colonies with Stardust to ensure that every colony can operate independently in the future. This is another important step towards a free and justice interstellar society," says Gioquis Baljar, head of the interstellar financial supervision committee.</i><br><br>
        Not all colonies accept Stardust as their main currency. The manipulation of the banks over many decades, high fluctuation, and several collapses of the financial markets continue to create uncertainty. There is still a long way and numerous negotiations to go before we find broad acceptance.<br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-sm btn-block" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Login Start -->
<div class="modal fade" id="KeychainLogin" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Registration/Login</h4>
      </div>
      <div class="modal-body">
      <div>
        <div>
          <div class="row">
            <div class="col-md-6">
            <div style="margin:0 0 10px 0;"><b>SteemConnect</b></div>
            SteemConnect is an easy and fast way to register/log in. It works on smartphones and is therefore recommended for mobile devices.<br><br>
            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Easy and fast 3-click-registration/login<br>
            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Works on smartphones<br><br>
            <button type="button" onclick="Login()" class="btn btn-info btn-sm btn-block">Registration/Login</button><br><br>
            </div>
            <div class="col-md-6">
            <div style="margin:0 0 10px 0;"><b>Keychain</b></div>
            Keychain is the safest way to register/log in. You have to download it from the <a href="https://chrome.google.com/webstore/detail/steem-keychain/lkcjlnjfpbikmcmbachjpdbijejflpcm" target="_blank" style="color:#333; text-decoration:underline;">Chrome Web Store</a>, then log in to Keychain. Type you username in the form and click on registration.
            <br><br>
            <div class="input-group input-group-sm">
            <span class="input-group-addon">@</span>
            <input id="keychainUser" type="text" class="form-control" name="username" autocomplete="on">
            </div>
            <div style="margin:10px 0 10px 0;">
            <button type="button" id="likc" onclick="LoginKeychain()" disabled class="btn btn-info btn-sm btn-block">Registration/Login</button>
            <br>
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="modal-footer">
        <div style="text-align:center; font-size:13px;">There are two ways to register/log in. Which one do you prefer?</div>
      </div>    
    </div>
  </div>
</div>
<!-- Login End -->

<!-- InfoPlanetModal -->
<div class="modal fade" id="InfoPlanetModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <h4 class="modal-title">Planet</h4>
      </div>
      <div class="modal-body" id="infoplanetdesc">
        Planet name: name_ (<a href="/planet/id_" style="color:#333;" target="_blank">view</a>)<br>
        ID: id_<br>
        Coordinate: corx_/cory_<br>
        Rarity: rare_<br>
        Type: type_<br>
        Seller: seller_<br>
        <div style="color:#1A5099">Price: price_ Stardust</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-sm btn-block" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- InfoBlueprintModal -->
<div class="modal fade" id="InfoBlueprintModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <h4 class="modal-title">Blueprint</h4>
      </div>
      <div class="modal-body">
        A Blueprint is required to build certain types of ships. The Blueprint represents the required knowledge. When you activate a Blueprint on a planet, you will unlock the permanent production of the new ship type in your planet shipyard. Blueprints are tradable, and some are limited.<br><br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-sm btn-block" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- InfoRuneModal -->
<div class="modal fade" id="InfoRuneModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <h4 class="modal-title">Rune</h4>
      </div>
      <div class="modal-body">
        With a Rune, you can permanently improve the productivity of a planet and thus makes it even more powerful and more valuable. Merge your Rune to a planet, and the Rune will become an integral part of the chosen planet. The rune acts like an additional boost. There are three different types: Rune (20%), Mighty Rune (50%), Holy Rune (100%), and Runes are limited.<br><br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-sm btn-block" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- InfoChestModal -->
<div class="modal fade" id="InfoChestModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <h4 class="modal-title">Chest</h4>
      </div>
      <div class="modal-body">
        If you run out of resources, you can buy additional supplies with the help of a Chest. Don't worry, even if the capacity of your depots is too small, your resources will arrive safely. Nothing will get lost.<br><br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-sm btn-block" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- InfoShipModal -->
<div class="modal fade" id="InfoShipModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <h4 class="modal-title">Ship</h4>
      </div>
      <div class="modal-body">
        This is a single ship. If you are going to buy a single ship on the market, it will be delivered to your starter (alpha) planet immediately.<br><br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-sm btn-block" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- SellItemModal -->
<div class="modal fade" id="SellItemModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="color:#333;" id="abId0.01381512780586669">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Sell</h4>
      </div>
      <div class="modal-body" id="abId0.3604846284728689">
        Define a price in Stardust and click "Confirm" to put the item on the market.<br><br>
        <div class="input-group input-group-sm" id="abId0.9328520165108476">
        <input type="text" id="sellitemsd" class="form-control">
        <span class="input-group-addon">Stardust</span>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="sellitembtn" class="btn btn-success btn-sm btn-block">Confirm</button>
      </div>
    </div>
  </div>
</div>

<!-- ConvertStardustModal -->
<div class="modal fade" id="ConvertStardustModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="color:#333;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Convert</h4>
      </div>
      <div class="modal-body">
      <div>
        <div>
          <div class="row" id="abId0.7541757308968728" abineguid="B2DB265FD4E547AE883EA8245744FA3A">
            <div class="col-md-6" id="abId0.5350712368421928">
            <div style="margin:0 0 10px 0;"><b>From NC to SE</b></div>
              Convert Stardust from your NextColony account to Steem Engine.<br>
              <div style="font-size:12px;margin: 14px 0 0 0;">Amount:</div>
              <div class="input-group input-group-sm" id="abId0.8446372418404235">
              <input id="input_ncse" type="text" class="form-control">
              <span class="input-group-addon">Stardust</span>
              </div>
              <div style="margin: 4px 0 10px 0;"><bottom href="" id="mbin" style="color:#1A5099; font-size:12px; border-bottom:1px dotted; cursor:pointer;">Balance: 3,115,000.000 Stardust</bottom></div>
              <button type="button" id="convert_ncse" class="btn btn-success btn-sm btn-block">Convert</button><br>
            </div>
            <div class="col-md-6" id="abId0.9831901468271955">
            <div style="margin:0 0 10px 0;"><b>From SE to NC</b></div>
              Convert Stardust from Steem Engine to your NextColony account.<br>
              <div style="font-size:12px;margin: 14px 0 0 0;">Amount:</div>
              <div class="input-group input-group-sm" id="abId0.5060494879282214">
              <input id="input_senc" type="text" class="form-control">
              <span class="input-group-addon">Stardust</span>
              </div>
              <div style="margin: 4px 0 10px 0;"><bottom href="" id="mbex" style="color:#1A5099; font-size:12px; border-bottom:1px dotted; cursor:pointer;">Balance: 250,000.000 Stardust</bottom></div>
              <button type="button" id="convert_senc" class="btn btn-info btn-sm btn-block">Convert</button>
              <div style="font-size:11px; text-align:center;">Secure conversion via SteemConnect/Keychain</div><br>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="modal-footer">
        <div style="text-align:center; font-size:13px;">Your Balance: <span style="color:#1A5099;" id="mbin1">3,115,000.000 Stardust</span> (In-game) / <span style="color:#1A5099;" id="mbex1">250,000.000 Stardust</span> (<a href="https://steem-engine.com/?p=market&amp;t=STARDUST" target="_blank" style="color:#333; text-decoration:underline;" class="steem-keychain-checked">Steem Engine</a> <img src="img/icons/link_333333.png" width="13px" height="13px" style="margin:-2px 0 0 0;">)</div>
      </div>    
    </div>
  </div>
</div>