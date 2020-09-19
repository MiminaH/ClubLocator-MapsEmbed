/* Rsoureces
    - Get Started with Maps Embed: https://developers.google.com/maps/documentation/embed/get-started
    - Create Map Style: https://mapstyle.withgoogle.com/ 
    - More on Zoom Levels: https://www.maps.ie/create-google-map/
*/

$(window).click(function (event) {
});



/* ****************** Goggle Maps API ****************** */
var currentLocation;
var mapUrl = document.getElementById('map-iframe').src;

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(currentLocation);

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

function locateNearestBranch() {
  if (currentLocation == null) {
    // get current location, if we don't have it.
    getCurrentLocation();
    return;
  }

  // set distances between current lcoation & branches.
  setBranchesDistance(currentLocation, branches);

  let nearestBranch = getNearestBranch(branches);

  clearBranchesDetailsDiv();
  showBranchDetail(nearestBranch);
}

// Get Nearest Branch -------------------------------------------------------------
function getNearestBranch(branches) {
  let nearestBranch;
  let i = branches[0].distance;

  for (branch of branches) {
    if (branch.distance <= i) {
      nearestBranch = branch;
    }
  }
  return nearestBranch;
}

// Clear Branches Details Div -----------------------------------------------------
function clearBranchesDetailsDiv() {
  $('.branches-details-div').html('');
}

// Show Branches Details Div ------------------------------------------------------

function showAllBranches() {
  clearBranchesDetailsDiv();

  let i = 1;

  for (branch of branches) {
    showBranchDetail(branch);
    if (i < branches.length) {
      $('.branches-details-div').append('<hr>');
    }
    i++;
  }
}

// Create Branch Details HTML ------------------------------------------------------

function showBranchDetail(branch) {
  if (branch.distance != '') {
    $('.branches-details-div').append(`
    <div class="branch-details-div">
      <a class="branch-title">${branch.name}</a>
      <a class="opening-hours">${branch.hours}</a>
      <a class="distance">${Math.round(branch.distance * 10) / 10} km away from you</a>
      <a class="address"><i class="fa fa-directions"></i> ${branch.address}</a>
      <a class="phone"><i class="fa fa-phone-alt"></i> ${branch.number}</a>
    </div>`);
  } else {
    $('.branches-details-div').append(`
    <div class="branch-details-div">
      <a class="branch-title">${branch.name}</a>
      <a class="opening-hours">${branch.hours}</a>
      <a class="address"><i class="fa fa-directions"></i> ${branch.address}</a>
      <a class="phone"><i class="fa fa-phone-alt"></i> ${branch.number}</a>
    </div>`);
  }
}

// Get Distance (in km) between two coordinates -----------------------------------

function haversine_distance(mk1, mk2) {
  var R = 6371.071; // Radius of the Earth in kilometers
  var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
}

function setBranchesDistance(currentLoc, branchesJSON) {
  for (branch of branchesJSON) {
    branch.distance = haversine_distance(currentLoc, branch.coordinates);
  }
}