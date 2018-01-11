'use strict'

var app = angular.module("mainApp");
app.controller('homeCtrl', ['$scope', '$rootScope', '$window', '$location', function($scope, $rootScope, $window, $location){
	$scope.homeView = '';
	app.appConfig.mods.unshift({name: "dashboard", caption: "Visão Geral", menu_group: "", icon: "dashboard"});
	$scope.plugins = app.plugins;
	$scope.lang = app.lang;
	$scope.currentModule = {
		name: 'dashboard',
		caption: 'Visão Geral',
		icon: 'dashboard'
	};
	app.currentModule = $scope.currentModule;
	app.setTitle = function(){
		if (!!$scope.lang.l["mod_" + $scope.currentModule.name])
			$scope.appTitle = app.appConfig.appName + ' :: ' + $scope.lang.l["mod_" + $scope.currentModule.name].name;
		else
			$scope.appTitle = app.appConfig.appName + ' :: ' + $scope.currentModule.caption;
	}

	$scope.changeLang = function(lang){
		app.lang.setLang(lang, function(){
			location.reload();
		});
	}

	$scope.isModuleActive = function(name){
		return name === $scope.currentModule.name
	}

	app.validateToken(app.restAPI, function(err){
		if (!!err)
			$location.path('/logout');
		else {
			$scope.homeView = '/app/core/views/home.html';
			$scope.msgBoxView = '/app/core/views/uiMessageBox.html';
		}
	});

	$scope.appConfig = app.appConfig;

	var mods = app.appConfig.mods;
	var groups = app.appConfig.menu_groups;
	$scope.menu = [];

	var curGroup = '';

	var getGroup = function(name){
		var group = null;

		$scope.menu.forEach(function(g){
			if (g.isGroup && g.name == name){
				group = g;
				return false;
			}
		});

		if (group == null) {
			var g_icon = "";
			var g_caption = "";
			groups.forEach(function(g){
				if (g.name == name){
					g_icon = g.icon;
					g_caption = g.caption;
				}
			});
			group = {name: name, caption: g_caption, icon: g_icon, active: false, isGroup: true, isOpen: false, items: []}
			$scope.menu.push(group);
		}
		return group;
	};

	mods.forEach(function(m){
		if (m.menu_group == '' || !m.menu_group)
			$scope.menu.push({name: m.name, caption: m.caption, icon: m.icon, active: false, isGroup: false});
		else {
			var group = getGroup(m.menu_group);
			group.items.push({name: m.name, caption: m.caption, icon: m.icon, active: false, isGroup: false});
		}
	});

	$scope.setCurrentModule = function(path){
		var p = path;
		if (path){
			p = path.split('/');
			p = '/' + p[1];
		}

		app.appConfig.mods.forEach(function(m){
			if (p === '/' + m.name || (p === '/' && m.name === 'dashboard')){
				$scope.currentModule = {
					name: m.name,
					caption: m.caption,
					icon: m.icon
				};
				app.setTitle();
				$scope.menu.forEach(function(m){
					m.active = false;
					if (m.isGroup) {
						var isActive = false;
						m.items.forEach(function(s){
							s.active = false;
							if (s.name == $scope.currentModule.name) {
								s.active = true;
								isActive = true;
							}
						});
						if (isActive){
							m.isOpen = true
						}
					}
					else if (m.name == $scope.currentModule.name)
						m.active = true;
				});
			}

		});
	}
	app.setCurrentModule = $scope.setCurrentModule;
	$scope.showMessageBox = false;
	app.messageBox = function(msg){
		$scope.showMessageBox = !$scope.showMessageBox;
		$scope.messageBoxContent = msg;
	}
}]);