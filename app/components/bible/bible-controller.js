BibleComponent.controller('BibleController', ['$scope', '$routeParams', 'BibleLibrary', function ($scope, $routeParams, BibleLibrary) {
	var currentBook = BibleLibrary.getContent({
		translation: $routeParams.translation,
		book: ($routeParams.book) ? $routeParams.book - 1 : 0
	});
	var currentChapterId = ($routeParams.chapter) ? $routeParams.chapter - 1 : 0;
	var currentChapter = currentBook.chapters[currentChapterId];
	$scope.title = currentBook.title[0] + ' ' + (currentChapterId + 1);// @TODO use the user defined title if it exists!
	$scope.currentChapter = currentChapter;
}]);