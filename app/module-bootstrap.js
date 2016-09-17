var BibleMine = angular.module('BibleMine', ['ngRoute', 'MainHeaderComponent', 'MenuComponent', 'DashboardComponent', 'BibleComponent']);

// Shared stuff.
var Utility = angular.module('Utility', []);
var Settings = angular.module('Settings', ['Utility']);
var Bible = angular.module('Bible', ['Utility', 'Settings']);

// Application components.
var DashboardComponent = angular.module('DashboardComponent', []);
var BibleComponent = angular.module('BibleComponent', ['Bible']);
var MainHeaderComponent = angular.module('MainHeaderComponent', ['Bible']);
var MenuComponent = angular.module('MenuComponent', []);