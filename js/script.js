var map;
var geocoder;
var infoWindow;
var markers = []; //marker array
var greenDot = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'; //user location

//----- LOAD MAP & LEGEND
//----------------------------//

function initialize() { // Load map
	geocoder = new google.maps.Geocoder();
	var start = new google.maps.LatLng(43.648358, -79.397966);
	
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: start,
		zoom: 13
	});
	
}

function searchVenue() { // find address with keyword search, add marker and center map, find venue with Foursquare
	
	//----- GOOGLE GEOCODING
	//----------------------------//
	var address = document.getElementById('enter-location').value; // obtain keyword from user
	geocoder.geocode( { 'address' : address}, function(results, status) { // use Google Geocoder to find location
		
		if (status == google.maps.GeocoderStatus.OK) {
			var myLocation = results[0].geometry.location
			map.setCenter(myLocation);
			map.setZoom(16);
			var myLocationLL = myLocation.lat() + "," + myLocation.lng(); // extract latitude and longitude from Geocoder
			
			var marker = new google.maps.Marker({ // add marker for My Location
				map: map,
				icon: greenDot,
				position: myLocation
			});
			markers.push(marker); // push marker to array
			
			infoWindow = new google.maps.InfoWindow();
			infoWindow.setContent( // content of infoWindow
				'<strong class="wifi-name"> YOU ARE HERE </strong><br><br>'
			);
			infoWindow.open(map, marker);
			
			//------- FOURSQUARE venue explore
			//--------------------------------------//
			
			var FSURL = 'https://api.foursquare.com/v2/venues/explore'
			var FSclientID = 'XPLJELMLQRL45HGE13Z0ENWJ0M50GCZCXMCGSCF1VO5EHEOM';
			var FSclientSecret = '0EFGZ1LKHUBOYBQA2T2TSANKOU40A5SDSGIFPLDQVIIY1HSQ';
			
			$.ajax({  // GET foursquare venue explore
				url: FSURL,
				type: 'GET',
				dataType: 'json',
				data: {
					client_id: FSclientID,
					client_secret: FSclientSecret,
					// near: "toronto",
					// sortByDistance: 1,
					ll: myLocationLL,
					limit: 30,
					radius: 1000,
					v: 20140806,
					query: 'free wifi'
				},
				success: function(venues){
					console.log(venues.response.groups[0].items);
					displayInfo(venues.response.groups[0].items);
				}
			});
			
			function displayInfo(results) { // cycle through results to create markers
				for (var i = 0; i < results.length; i++) {
					createMarker(results[i]);
				}
			}
			
			function createMarker(place) { // create markers for venues
				var venueLoc = place.venue.location;
				// console.log(place.venue.location.lat+','+place.venue.location.lng);
				
				var marker = new google.maps.Marker({ // create markers
					map: map,
					position: venueLoc,
				});
				markers.push(marker); // push marker to array
				
				infoWindow = new google.maps.InfoWindow(); // create pop-up windows on markers
				google.maps.event.addListener(marker, 'click', function() {
					infoWindow.setContent( //content of infoWindow
						'<strong class="wifi-name">' + place.venue.name + '</strong><br><br>'
						+ place.venue.location.address + '<br>'
						+ place.venue.location.city + ', ' + place.venue.location.state + ' ' + place.venue.location.postalCode + '<br><br>'
						+ place.venue.contact.formattedPhone + '<br>'
						+ place.venue.url + '<br><br>'
						+ place.venue.hours.status + '<br>'
					);
					infoWindow.open(map, marker);
				});
			}
		}
		else {
			alert('Unable find location because: ' + status);
		}
	});
	
}

//----- MARKER controls
//--------------------------//

function clearMarkers() { // Turn off markers on map
	setAllMap(null);
}

function deleteMarkers() { // Turn off markers and then delete from array
	clearMarkers();
	markers = [];
}

function setAllMap(map) { // Place markers on map
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

//----- BUTTONS
//----------------------//

function clearMarkers() { // Turn off markers on map
	setAllMap(null);
}

function deleteMarkers() { // Turn off markers and then delete from array
	clearMarkers();
	markers = [];
}

function searchArea() { // clear previous markers and run address search and wifi search on click of Search button
	deleteMarkers();
	searchVenue();
}

function clearForm() { // clear form values and map markers
	deleteMarkers();
	document.getElementById("find-wifi").reset();
}

$('#enter-location').keypress(function (e) { // pressing Enter on Address textbox triggers click on search button
	if (e.which == 13) {
		$('.search').click();
		return false;
	}
});

//----- SMOOTH SCROLL
//----------------------//

$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});
//----- INITIALIZE map
//----------------------//
google.maps.event.addDomListener(window, 'load', initialize);
