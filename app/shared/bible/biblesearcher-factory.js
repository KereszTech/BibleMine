Bible.factory('BibleSearcher', ['BibleLibrary', 'Settings', function (BibleLibrary, Settings) {

	var bibleBookTitles = BibleLibrary.getBookTitles('hu_karoli');
	var settingBookTitles = Settings.get('bookTitles.hu_karoli');
	// Create a new array that contains user defined book titles as the first.
	var bookTitles = [];
	bibleBookTitles.forEach(function (bookTitle, i) {
		bookTitles[i] = bibleBookTitles[i].slice();
		if (settingBookTitles && settingBookTitles[i]) {
			bookTitles[i].unshift(settingBookTitles[i]);
		}
	});


	function search(searchTerm) {
		var results = searchReferences(searchTerm);
		//results.fullTextSearch = BibleLibrary.search('hu_karoli', searchTerm);
		return results;
	}

	function searchReferences(searchTerm) {
		var references = guessReference(searchTerm);
		var results = [];

		references.forEach(function (reference) {
			var url = 'bible/hu_karoli/' + (reference.book + 1) + '/' + (reference.chapter + 1) + '/' + (reference.verse + 1);
			url += (reference.verseRange) ? '/' + (reference.verseRange + 1) : '';
			var name = bookTitles[reference.book][0] + ' ' + (reference.chapter + 1) + ',' + (reference.verse + 1);
			name += (reference.verseRange) ? '-' + (reference.verseRange + 1) : '';
			var content = BibleLibrary.getContent(reference);

			results.push({
				type: 'reference',
				reference: reference,
				url: url,
				name: name,
				content: (_.isArray(content)) ? content.join(' ') : content
			});
		});

		return results;
	}

	function createPartsFromText(text) {
		if (!text) {
			return [];
		}

		var separators = '., -';
		var numericalCharacters = '0123456789';
		var parts = [];
		var currentCharacter = '';
		var previousCharacter = '';
		processCharacters: for (var i = 0; i < text.length; ++i) {
			currentCharacter = text.charAt(i);
			if (numericalCharacters.indexOf(currentCharacter) > -1) {
				currentCharacter = Number.parseInt(currentCharacter, 10);
			}

			// If the first character is a separator, ignore it
			// otherwise, record the character.
			if (i === 0) {
				if (separators.indexOf(currentCharacter) === -1) {
					parts[0] = currentCharacter;
				}
				continue processCharacters;
			}

			previousCharacter = text.charAt(i - 1);
			if (numericalCharacters.indexOf(previousCharacter) > -1) {
				previousCharacter = Number.parseInt(previousCharacter, 10);
			}

			// If we have a separator, start a new segment (if there isn't already one).
			if (separators.indexOf(currentCharacter) > -1) {
				if (parts[parts.length - 1] !== '') {
					parts.push('');
				}
			// Record current/previous characters of the same type.
			} else if (_.isInteger(currentCharacter) === _.isInteger(previousCharacter)) {
				// Strings separated by separators should be in one block.
				if (separators.indexOf(previousCharacter) > -1 && !_.isInteger(currentCharacter) && !_.isInteger(parts[parts.length - 2])) {
					parts.pop();
					parts[parts.length - 1] += ' ' + currentCharacter;
				// Characters of the same type should be concatenated keeping their type.
				} else {
					if (_.isInteger(currentCharacter)) {
						parts[parts.length - 1] = parts[parts.length - 1] * 10 + currentCharacter;
					} else {
						parts[parts.length - 1] += currentCharacter;
					}
				}
			// Create new part when a character change occurs.
			} else {
				if (parts[parts.length - 1] === '') {
					parts.pop();
				}
				parts.push(currentCharacter);
			}
		}
		if (parts[parts.length - 1] === '') {
			parts.pop();
		}
		return parts;
	}

	/**
	 * Regularises a string: removes separators and makes it lower case.
	 *
	 * @param {string} a - String to clean.
	 * @returns {string} Cleaned string.
	 */
	function clean(text) {
		return text.replace(/\.|,| |-/gi, '').toLowerCase();
	}

	/**
	 * Returns the length until the two strings are identical.
	 *
	 * @param {string} a - String to compare.
	 * @param {string} b - String to compare.
	 * @returns {Number} Length until the strings are identical.
	 */
	function sameBeginingLegth (a, b) {
		for (var i = 0; i < a.length; ++i) {
			if (a[i] !== b[i]) {
				return i;
			}
		}
		return i;
	}

	function guessReference(searchTerm) {
		var parts = createPartsFromText(searchTerm);
		var results = [];
		if (parts.length === 0) {
			return results;
		}

		var PSALMS_INDEX = 18;
		var cleanedSearchTerm = clean(searchTerm);

		// Try to find results by book titles. We search for the ones with the longest identical beggining.
		var longestSameBeginingLength = 0;
		var longestSameBeginingBookIndexes = [];
		for (var bookIndex = 0; bookIndex < bookTitles.length; ++bookIndex) {

			// Find the most identical version of a given book's titles.
			var currentSameBeginingLength = 0;
			bookTitles[bookIndex].forEach(function (bookTitleAlt) {
				currentSameBeginingLength = Math.max(
					sameBeginingLegth(cleanedSearchTerm, clean(bookTitleAlt)),
					currentSameBeginingLength
				);
			});

			if (currentSameBeginingLength > longestSameBeginingLength) {
				longestSameBeginingLength = currentSameBeginingLength;
				longestSameBeginingBookIndexes = [bookIndex];
			} else if (longestSameBeginingLength && (currentSameBeginingLength === longestSameBeginingLength)) {
				longestSameBeginingBookIndexes.push(bookIndex);
			}
		}

		// Find out how many parts were processed as book title.
		var processedCharactersLength = 0;
		var lastProcessedPartIndex = 0;
		while (processedCharactersLength < longestSameBeginingLength) {
			processedCharactersLength += (parts[lastProcessedPartIndex] + "").length; // parts[lastProcessedPartIndex] can be integer, we need its length by digits.
			++lastProcessedPartIndex;
		}

		// Try to extract reference numbers from the remaining "non book title" parts.
		var referenceNumbers = [];
		while (parts[lastProcessedPartIndex] !== undefined) {
			if (_.isInteger(parts[lastProcessedPartIndex])) {
				referenceNumbers.push(parts[lastProcessedPartIndex]);
			}
			++lastProcessedPartIndex;
		}

		for (i = 0; i < longestSameBeginingBookIndexes.length; ++i) {
			results.push({
				book: longestSameBeginingBookIndexes[i],
				chapter: (referenceNumbers[0] !== undefined) ? referenceNumbers[0] - 1 : 0,
				verse: (referenceNumbers[1] !== undefined) ? referenceNumbers[1] - 1 : 0,
				verseRange: (referenceNumbers[2] !== undefined) ? referenceNumbers[2] - 1 : 0,
			});
		}

		// Special shortcuts for PSALMS.
		referenceNumbers = [];
		if (_.isInteger(parts[0])) {
			var i = 1;
			var shouldSearch = true;
			if (parts[1] === undefined) {
				results.unshift({
					book: PSALMS_INDEX,
					chapter: parts[0] - 1,
					verse: 0
				});
			} else {
				if (!_.isInteger(parts[1])) {
					var found = false;
					bookTitles[PSALMS_INDEX].forEach(function (bookTitleAlt) {
						if (bookTitleAlt.indexOf(parts[1]) > -1) {
							found = true;
						}
					});
					if (found) {
						i = 2;
					} else {
						shouldSearch = false;
					}
				}
				while (shouldSearch && (i < parts.length)) {
					if (_.isInteger(parts[i])) {
						referenceNumbers.push(parts[i]);
					}
					++i;
				}
				if (shouldSearch) {
					results.push({
						book: PSALMS_INDEX,
						chapter: parts[0] - 1,
						verse: (referenceNumbers[0] !== undefined) ? referenceNumbers[0] - 1 : 0,
						verseRange: (referenceNumbers[1] !== undefined) ? referenceNumbers[1] - 1 : 0
					});
				}
			}
		}

		return results;
	}


	return {
		search: search
	};
}]);
