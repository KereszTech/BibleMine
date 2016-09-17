Bible.factory('BibleLibrary', ['FileSystem', function (FileSystem) {
	var bibles = {};

	return {
		loadBible: function (translation) {
			if (!bibles[translation]) {
				bibles[translation] = FileSystem.readJSON('data/bibles/' + translation + '.json');
			}
		},
		getBookTitles: function (translation) {
			this.loadBible(translation);
			var bookTitles = [];
			bibles[translation].books.forEach(function (book) {
				bookTitles.push(book.title.slice());
			});
			return bookTitles;
		},
		getContent: function (reference) {
			var translation = 'hu_karoli';
			this.loadBible(translation);

			var content = bibles[translation].books[reference.book];

			if (reference.chapter !== undefined) {
				content = content.chapters[reference.chapter];
			}
			// 0 as a verse range is ignored.
			if (reference.verse !== undefined && !reference.verseRange) {
				content = content.verses[reference.verse];
			}

			if (reference.verseRange) {
				content = content.verses.slice(reference.verse, reference.verseRange + 1);
			}

			return content;
		},
		search: function (translation, searchTerm) {
			this.loadBible(translation);
			var results = [];
			bibles[translation].books.forEach(function (book) {
				book.chapters.forEach(function (chapter) {
					chapter.verses.forEach(function (verse, i) {
						if (verse.indexOf(searchTerm) > -1) {
							results.push(verse);
						}
					});
				});
			});
			return results;
		}
	};
}]);