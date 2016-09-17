BibleMine.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'app/components/dashboard/dashboard-view.html',
		controller  : 'DashboardController'
	}).when('/bible/:translation/:book?/:chapter?/:verse?/:verseRange?', {
		templateUrl : 'app/components/bible/bible-view.html',
		controller  : 'BibleController'
	});
});