export const LOAD_SETTINGS = 'control-panel/load';

export const writeToSerial = (path, line) => (
	dispatch => {
		dispatch(writeConsoleLine(line));
		writeToPort(path, line.data);
	}
);


export const fetchSettings = () => (
	dispatch => {
		fileSystem.readFile('./data/settings.json', 'utf-8', (error, data) => {
			if (error) {
				console.log(error);
			} else {
				const settings = JSON.parse(data);
				settings.serialConfig.portConfig.baudRate = parseInt(settings.serialConfig.portConfig.baudRate, 10);
				settings.serialConfig.portConfig.dataBits = parseInt(settings.serialConfig.portConfig.dataBits, 10);
				settings.serialConfig.portConfig.stopBits = parseInt(settings.serialConfig.portConfig.stopBits, 10);
				dispatch(loadSettings(settings));
				dispatch(openSerialPort(
					settings.serialConfig.path,
					settings.serialConfig.portConfig
				));
			}
		});
	}
);