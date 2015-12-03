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
  .controller('itinerary', function ($scope) {
    
  })
