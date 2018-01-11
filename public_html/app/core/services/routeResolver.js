'use strict'

angular.module('routeResolverService', []).provider('routeResolver', function(){

	this.$get = function(){
		return this;
	};

	this.routeConfig = function() {
		var modsDirectory            = 'app/mods/',
			coreControllersDirectory = 'app/core/controllers/',

		setModsDirectory = function(modsDir){
			modsDirectory = modsDir;
		},

		getModsDirectory = function(){
			return modsDirectory;
		},

		getCoreControllersDirectory = function(){
			return coreControllersDirectory;
		}

		return {
			setModsDirectory: setModsDirectory,
			getModsDirectory: getModsDirectory,
			getCoreControllersDirectory: getCoreControllersDirectory
		};

	}();

	this.route = function(routeConfig){
		var resolve = function(name, secure, isCore, mod, load, check){			
			var routeDef = {};
			var modControllerFullPath = '';
			var modPath = '';
			var modViewFullPath = '';
			if (name == 'logout'){
				modControllerFullPath = 'app/core/controllers/logout.js';
			}
			else {
				modPath = routeConfig.getModsDirectory() + name + '/';
				modControllerFullPath = modPath + 'controller.js';
				routeDef.templateUrl = modPath + 'view.html';
				routeDef.css = modPath + 'style.css';
				routeDef.secure = (secure) ? secure : false;
			}

			routeDef.resolve = {
				load: function($location, $q, $rootScope){
					load($location);
					var dependencies = [modControllerFullPath];
					return resolveDependencies($q, $rootScope, dependencies);					
				},
				check: check
			};
			return routeDef;
		},

		resolveDependencies = function($q, $rootScope, dependences){
			var defer = $q.defer();
			requires(dependences, function(){
				defer.resolve();
				if(!$rootScope.$$phase)
					$rootScope.$apply()
			});
			return defer.promise;
		};

		return {
			resolve: resolve
		}
	}(this.routeConfig);
});