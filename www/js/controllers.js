angular.module('starter.controllers', [])

.controller('main', function ($scope) {
	$scope.options = {
		location: "201 N Goodwin Ave, Urbana, IL 61801",
		time: {}
	}
	$scope.itineraries = []
	$scope.itinerary = {}
})

.controller('search', function ($scope) {

})

.controller('search.start', function ($scope, $state) {
	$scope.nextPage = function () {
		$state.go('search.categories')
	}
})

.controller('search.categories', function ($scope, $state, $filter, MainData) {
	$scope.categories = angular.copy(MainData.categories)
	$scope.nextPage = function () {
		$scope.options.categories = $filter('filter')($scope.categories, {
			checked: true
		})
		$state.go('search.options')
	}
})

.controller('search.options', function ($scope, $state, $ionicModal, $filter, MainData) {
	$ionicModal.fromTemplateUrl('modal.html', function ($ionicModal) {
		$scope.modal = $ionicModal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});
	$scope.locations = MainData.locations.filter(function (location) {
		for (var i = 0; i < $scope.options.categories.length; i++) {
			if ($scope.options.categories[i].name == location.category) {
				return true
			}
		}
		return false
	})
	$scope.possible_itineraries = combinations($scope.locations)
	for (var i = 0; i < $scope.possible_itineraries.length; i++) {
		cost = 0
		time = 0
		for (var j = 0; j < $scope.possible_itineraries[i].length; j++) {
			cost += $scope.possible_itineraries[i][j].cost
			time += $scope.possible_itineraries[i][j].time.hours * 60 + $scope.possible_itineraries[i][j].time.minutes
		}
		if (cost < $scope.options.budget && time < ($scope.options.time.hours * 60 + $scope.options.time.minutes)) {
			$scope.itineraries.push({
				locations: $scope.possible_itineraries[i],
				cost: cost,
				time: time
			})
		}
	}
	$scope.itineraries = shuffleArray($scope.itineraries.sort(function (a, b) {
		return b.time - a.time
	}).slice(0, 30)).slice(0, 5)

	$scope.selectItinerary = function (itinerary) {
		$scope.currentItinerary = itinerary
		$scope.modal.show()
	}

	$scope.nextPage = function () {
		$scope.$parent.$parent.itinerary = $scope.currentItinerary
		$state.go('itinerary')
	}

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	function combinations(set) {
		var k, i, combs, k_combs;
		combs = [];

		// Calculate all non-empty k-combinations
		for (k = 1; k <= set.length; k++) {
			k_combs = k_combinations(set, k);
			for (i = 0; i < k_combs.length; i++) {
				combs.push(k_combs[i]);
			}
		}
		return combs;
	}

	function k_combinations(set, k) {
		var i, j, combs, head, tailcombs;
		if (k > set.length || k <= 0) {
			return [];
		}

		if (k == set.length) {
			return [set];
		}

		if (k == 1) {
			combs = [];
			for (i = 0; i < set.length; i++) {
				combs.push([set[i]]);
			}
			return combs;
		}
		combs = [];
		for (i = 0; i < set.length - k + 1; i++) {
			head = set.slice(i, i + 1);
			tailcombs = k_combinations(set.slice(i + 1), k - 1);
			for (j = 0; j < tailcombs.length; j++) {
				combs.push(head.concat(tailcombs[j]));
			}
		}
		return combs;
	}
})

.controller('itinerary', function ($scope, uiGmapGoogleMapApi) {
	uiGmapGoogleMapApi.then(function (maps) {
		$scope.markers = $scope.itinerary.locations
		var waypoints = []
		for (var i = 0; i < $scope.markers.length; i++) {
			waypoints.push({
				location: $scope.markers[i].coords.latitude + ", " + $scope.markers[i].coords.longitude
			})
		}
		$scope.markers.push({
			id: 100,
			coords: {
				latitude: 40.114026,
				longitude: -88.224807
			}
		})
		$scope.mapOptions = {
			styles: [{
				"featureType": "landscape",
				"stylers": [{
					"hue": "#FFBB00"
				}, {
					"saturation": 43.400000000000006
				}, {
					"lightness": 37.599999999999994
				}, {
					"gamma": 1
				}]
			}, {
				"featureType": "road.highway",
				"stylers": [{
					"hue": "#FFC200"
				}, {
					"saturation": -61.8
				}, {
					"lightness": 45.599999999999994
				}, {
					"gamma": 1
				}]
			}, {
				"featureType": "road.arterial",
				"stylers": [{
					"hue": "#FF0300"
				}, {
					"saturation": -100
				}, {
					"lightness": 51.19999999999999
				}, {
					"gamma": 1
				}]
			}, {
				"featureType": "road.local",
				"stylers": [{
					"hue": "#FF0300"
				}, {
					"saturation": -100
				}, {
					"lightness": 52
				}, {
					"gamma": 1
				}]
			}, {
				"featureType": "water",
				"stylers": [{
					"hue": "#0078FF"
				}, {
					"saturation": -13.200000000000003
				}, {
					"lightness": 2.4000000000000057
				}, {
					"gamma": 1
				}]
			}, {
				"featureType": "poi",
				"stylers": [{
					"hue": "#00FF6A"
				}, {
					"saturation": -1.0989010989011234
				}, {
					"lightness": 11.200000000000017
				}, {
					"gamma": 1
				}]
			}]
		}

		var latitude_sum = 0
		var longitude_sum = 0
		for (var i = 0; i < $scope.markers.length; i++) {
			latitude_sum += $scope.markers[i].coords.latitude
			longitude_sum += $scope.markers[i].coords.longitude
		}
		var avg_latitude = latitude_sum / $scope.markers.length
		var avg_longitude = longitude_sum / $scope.markers.length
		$scope.map = {
			center: {
				latitude: avg_latitude,
				longitude: avg_longitude
			},
			zoom: 6,
			control: {}
		}
		var directionsDisplay = new maps.DirectionsRenderer({
			suppressMarkers: true
		});
		var directionsService = new maps.DirectionsService();
		var geocoder = new maps.Geocoder();

		// directions object -- with defaults
		$scope.directions = {
			origin: $scope.options.location,
			waypoints: waypoints,
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
