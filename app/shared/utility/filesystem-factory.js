angular.module('Utility').factory('FileSystem', function () {
	var fileSystem = require('fs');

	return {
		readFile: function (path) {
			return fileSystem.readFileSync(path, 'utf-8');
		},
		writeFile: function(path, data) {

		},
		readJSON: function (path) {
			try {
				return JSON.parse(this.readFile(path));
			} catch (exception) {
				console.log('Error during bible source parse.', exception);
				return false;
			}
		},
		writeJSON: function (path, data) {
			this.writeFile(path, JSON.stringify(data));
		}
	};
});