var foursquare = {};

foursquare.apiUrl = 'https://api.foursquare.com/v2/venues/explore';
foursquare.apiKey = 'R0QSI5RXZLR3RNVFLF5GNEI2MVHCPC5XLUOF51TRSQZVC154';
foursquare.secretKey = 'GUESJ3L0PXMMQAHMOSRDGGVGOEYHJIGZRQ1LO0RSRVSQUXWY';
foursquare.searchNear = 

foursquare.getInfo = function() {
// foursquare.getInfo = function(searchQuery) {
	$.ajax({
		url: foursquare.apiUrl,
		format: 'json',
		type: 'GET',
		data: {
			client_id: foursquare.apiKey,
			client_secret: foursquare.secretKey,
			near: "toronto",
			limit: 20,
			radius: 1000,
			v: 20140806,
			query: "free wifi"
		},
		success: function(venues) {
			console.log(venues.response.groups[0].items);
			foursquare.displayInfo(venues.response.groups[0].items);
		} //end success
	}); // end ajax
};  // end .getInfo function

foursquare.displayInfo = function(result) {
	$.each(result, function(index, item) {
		var $venueName = item.venue.name;
		console.log($venueName);
		var $venueAddress = item.venue.location.address;
		// console.log($venueAddress);
		var $venueCity = item.venue.location.city;
		// console.log($venueCity);
		var $venuePostalCode = item.venue.location.postalCode;
		// console.log($venuePostalCode);
	}); // end of each fuction
};  // end .displayInfo function

foursquare.init = function() {
	foursquare.getInfo();
}; //end init function

$(document).ready(function(){
  	foursquare.init();
});  // end ready function