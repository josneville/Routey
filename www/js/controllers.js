angular.module('starter.controllers', [])

.controller('search', function ($scope) {

})

.controller('search.start', function ($scope, $state) {
	$scope.nextPage = function () {
		$state.go('search.categories')
	}
})

.controller('search.categories', function ($scope, $state) {
	$scope.nextPage = function () {
		$state.go('search.options')
	}
})

.controller('search.options', function ($scope, $state, $ionicModal) {
	$ionicModal.fromTemplateUrl('modal.html', function ($ionicModal) {
		$scope.modal = $ionicModal;
	}, {
		// Use our scope for the scope of the modal to keep it simple
		scope: $scope,
		// The animation we want to use for the modal entrance
		animation: 'slide-in-up'
	});
	$scope.nextPage = function () {
		$state.go('itinerary')
	}
})

.controller('itinerary', function ($scope, uiGmapGoogleMapApi) {
	$scope.markers = [{
		id: 0,
		coords: {
			latitude: 40.117091,
			longitude: -88.242177
		}
	}, {
    id: 1,
    coords: {
      latitude: 40.413091,
      longitude: -87.142177
    }
  }, {
		id: 2,
		coords: {
			latitude: 41.113091,
			longitude: -88.142177
		}
	}]
	var latitude_sum = 0
	var longitude_sum = 0
	for (var i = 0; i < $scope.markers; i++) {
		latitude_sum += $scope.markers.coords.latitude
		longitude_sum += $scope.markers.coords.longitude
	}
	var avg_latitude = latitude_sum / $scope.markers.length
	var avg_longitude = longitude_sum / $scope.markers.length
	$scope.map = {
		center: {
			latitude: avg_latitude,
			longitude: avg_longitude
		},
		zoom: 4,
		control: {}
	}
	uiGmapGoogleMapApi.then(function (maps) {
		var directionsDisplay = new maps.DirectionsRenderer({
			suppressMarkers: true
		});
		var directionsService = new maps.DirectionsService();
		var geocoder = new maps.Geocoder();

		// directions object -- with defaults
		$scope.directions = {
			origin: $scope.markers[0].coords.latitude + "," + $scope.markers[0].coords.longitude,
			waypoints: [{
				location: $scope.markers[1].coords.latitude + "," + $scope.markers[1].coords.longitude
			},
      {
        location: $scope.markers[2].coords.latitude + "," + $scope.markers[2].coords.longitude
      }],
			showList: false
		}

		// get directions using google maps api
		$scope.getDirections = function () {
			var request = {
				origin: $scope.directions.origin,
				destination: $scope.directions.origin,
				waypoints: $scope.directions.waypoints,
				travelMode: maps.DirectionsTravelMode.DRIVING
			};
			directionsService.route(request, function (response, status) {
				if (status === maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
					directionsDisplay.setMap($scope.map.control.getGMap());
				} else {
					alert('Google route unsuccesfull!');
				}
			});
		}
		$scope.getDirections()
	})
})
