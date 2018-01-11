'use strict'

var app = angular.module("mainApp", ['ngAnimate', 'ngSanitize', 'ngRoute', 'ngMask', 'angularCSS', 'chart.js', 'appConfigService', 'routeResolverService', 'tokenValidationService', 'restAPIService', 'languageService', 'brasil.filters']);

app.config(['$compileProvider', '$controllerProvider', '$filterProvider', '$provide', 'languageProvider',
			'$qProvider', '$httpProvider', '$routeProvider', 'routeResolverProvider', 'tokenValidationProvider', 'restAPIProvider', 'appConfigProvider',
	function($compileProvider, $controllerProvider, $filterProvider, $provide, languageProvider,
			 $qProvider, $httpProvider, $routeProvider, routeResolverProvider, tokenValidationProvider, restAPIProvider, appConfigProvider){
		app.register = {
			controller: $controllerProvider.register,
			directive:  $compileProvider.directive,
			filter:     $filterProvider.register,
			factory:    $provide.factory,
			service:    $provide.service
		};

		// Configure defaults providers
		$qProvider.errorOnUnhandledRejections(false);
		$httpProvider.defaults.cache = false;
		if (!$httpProvider.defaults.headers.get)
			$httpProvider.defaults.headers.get = {};
		$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
		$httpProvider.interceptors.push(['$q', function($q){
			return {
				'response': function (response) {
					return response;
				},
				'responseError': function (rejection) {
					if(rejection.status === 401) {
						location.reload();
					}
					return $q.reject(rejection);
				}
			}
		}]);

		// Configure App providers
		var route = routeResolverProvider.route;
		app.appConfig = appConfigProvider;
		app.validateToken = tokenValidationProvider.validate;
		app.restAPI = restAPIProvider;
		app.lang = languageProvider;

		// Configure Routes
		var routeLoad = function($location){
			app.setCurrentModule($location.path());
		};

		var routeCheck = function(){}

		app.appConfig.mods.forEach(function(m){
			$routeProvider.when('/' + m.name, route.resolve(m.name, false, false, m, routeLoad, routeCheck));
			if (!m.modal){
				$routeProvider.when('/' + m.name + '/:id', route.resolve(m.name, false, false, m, routeLoad, routeCheck));
			}
		});
		$routeProvider
			.when('/', route.resolve('dashboard', false, false, false, routeLoad, routeCheck))
			.when('/logout', route.resolve('logout', false, false, false, routeLoad))
			.otherwise({ redirectTo: '/' });

		app.plugins = {
			menuButtons: [],
			appPlugins: []
		};

		app.appConfig.plugins.forEach(function(p){
			require('app/plugins/' + p.name + '/plugin.js');
			if (p.type === 'menu-button'){
				app.plugins.menuButtons.push(p.name)
			}
			else
				app.plugins.appPlugins.push(p.name)
		});
	}
]);

app.run(['$window', '$rootScope', '$http', function($window, $rootScope, $http){
	app.restAPI.config(app.appConfig, $http);
	if (!app.validateToken()){
		$window.open('/login/', '_self');
		return
	}

	var token = localStorage.getItem("token", token);
	var t = token.split('.');
	try{
		var d = JSON.parse(atob(t[1]));
		$rootScope.Account = d.Account;
		$rootScope.AccountType = d.AccountType;
		$rootScope.LoginDate = new Date(d.iat * 1000);
	}catch(err){
		$window.open('/login/', '_self');
		return
	}
	app.lang.http = $http;
	var lang = $window.navigator.language || $window.navigator.userLanguage;
	lang = lang.toLowerCase();
	app.lang.config(app.appConfig.languages, localStorage.getItem("lang") || lang || app.appConfig.languages[0].code);
	// require('app/core/directives/uiMessageBox.js');
}]);