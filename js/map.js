var map;
var geocoder;

//----- GOOGLE
//-------------------//

function initialize() { // Load map
  geocoder = new google.maps.Geocoder();
  var start = new google.maps.LatLng(43.648358, -79.397966);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: start,
    zoom: 13
  });
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push( // Legend positioning
  document.getElementById('legend'));
}


//----- INITIALIZE map
//----------------------//
	
google.maps.event.addDomListener(window, 'load', initialize);