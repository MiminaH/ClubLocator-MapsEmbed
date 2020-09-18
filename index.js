/* Rsoureces
    - Get Started with Maps Embed: https://developers.google.com/maps/documentation/embed/get-started
    - Create Map Style: https://mapstyle.withgoogle.com/ 
    - More on Zoom Levels: https://www.maps.ie/create-google-map/
*/

$(window).click(function (event) {
  // anywhere on screen is clicked (except dropdown itself).
  if (
    !$(event.target).is('.selected-value') &&
    $('.dropdown-items-ul').css('display') == 'block'
  ) {
    // hide dropdown if anywhere on screen is clicked (except dropdown itself).
    $('.dropdown-items-ul').slideToggle('show-dropdown');
  }

  // if one of dropdown items is clicked, set is as the selected item.
  if ($(event.target).parent().is('.dropdown-items-ul')) {
    $('.selected-value').text(event.target.id);
  }
});

function toggleDropdown() {
  // show/hide dropdown when dropdown-div is clicked (called in HTML).
  $('.dropdown-items-ul').slideToggle('show-dropdown');
}

/* ****************** Goggle Maps API ****************** */
var mapUrl = document.getElementById('map-iframe').src;

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(pos);

      document.getElementById('map-iframe').src = mapUrl.concat(
        '&z=14&ll=',
        position.coords.latitude,
        ',',
        position.coords.longitude
      );

      console.log(document.getElementById('map-iframe').src);

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      // infoWindow.open(map);
      // map.setCenter(pos);
    });
  } else {
    // Browser doesn't support Geolocation
    // handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  );
}

// let map, infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//   });
//   infoWindow = new google.maps.InfoWindow();

//   // Try HTML5 geolocation.

//   infoWindow.open(map);
// }
