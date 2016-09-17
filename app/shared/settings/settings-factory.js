Settings.factory('Settings', ['FileSystem', function (FileSystem) {

	var userSettings = FileSystem.readJSON('data/settings/settings.json');
	var defaultSettings = FileSystem.readJSON('app/shared/settings/settings-defaults.json');
	var settings = _.merge({}, defaultSettings, userSettings);

	return {
		get: function (path) {
			return _.get(settings, path);
		},
		set: function (path, value) {
			var currentSetting = settings;
			var keys = path.split('.');
			keys.forEach(function (key) {
				if (currentSetting[key]) {
					currentSetting = currentSetting[key];
				} else {
					currentSetting[key] = {};
				}
			});
			//@TODO
		}
	};
}]);