var sc2app = pickAppName();
var sc2trans = 'nc-test';
var domain = location.protocol + "//" + location.host;
var isMobile = false;

if (/Mobi/.test(navigator.userAgent)) {
  isMobile = true;
}

var api = new steemconnect.Client({
  app: sc2app,
  callbackURL: domain+'/auth.php',
  scope: ['login','custom_json']
});

// ENV SNIFFING
function pickAppName() {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "140.82.34.132") {
    return "nextcolony.test"
  } else {
    return "nextcolony"
  }
}