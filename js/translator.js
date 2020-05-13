var words = {}

var words = [
   'Transporter','Explorer','Corvette','Frigate','Destroyer','Cruiser','Battlecruiser','Carrier','Dreadnought','Cutter','Patrol','Scout',
   'explorership', 'transportship',
   'orebooster','copperbooster','uraniumbooster','coalbooster','enlargebunker'];

var en = [
   'Transporter','Explorer','Corvette','Frigate','Destroyer','Cruiser','Battlecruiser','Carrier','Dreadnought','Cutter','Patrol','Scout',
   'Explorer', 'Transporter',
   'Ore Production Increase', 'Copper Production Increase', 'Uranium Production Increase', 'Coal Production Increase', 'Bunker Protection Increase'];

function LoadTranslation(){
   GetTranslations();
}

function GetTranslations(callback=null){
   var json = {};
   $.ajax({
      url: '/lang/en.json',
      type: 'GET',
      data: json,
      success: function(json) {
         words = json;
         if(callback){
            callback(null,words);
         }
      }
   });
}

function Translate(word){
   var translation = "";
   if(words[word]){
      translation = words[word];
   }
   
   return translation;
}

GetTranslations();