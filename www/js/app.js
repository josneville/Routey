// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'uiGmapgoogle-maps'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.views.maxCache(0);
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
		.state('search', {
			url: '/search',
			abstract: true,
			templateUrl: 'templates/search.html',
			controller: 'search'
		})
		.state('search.start', {
			url: '/start',
			templateUrl: 'templates/search_start.html',
			controller: 'search.start'
		})
    .state('search.categories', {
			url: '/categories',
			templateUrl: 'templates/search_categories.html',
			controller: 'search.categories'
		})
    .state('search.options', {
			url: '/options',
			templateUrl: 'templates/search_options.html',
			controller: 'search.options'
		})
    .state('itinerary', {
			url: '/itinerary',
			templateUrl: 'templates/itinerary.html',
			controller: 'itinerary'
		})
		.state('options', {
			url: '/options',
			templateUrl: 'templates/options.html',
			controller: 'options'
		})
		.state('faq', {
			url: '/faq',
			templateUrl: 'templates/faq.html'
		})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/search/start');

});
