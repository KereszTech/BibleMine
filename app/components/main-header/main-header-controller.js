MainHeaderComponent.controller('MainHeaderController', ['$scope', 'BibleSearcher', function ($scope, BibleSearcher) {
	$scope.searchTerm = '';
	$scope.searchResults = [];

	$scope.getVerse = function() {
		$scope.searchResults = BibleSearcher.search($scope.searchTerm);
	};
}]);