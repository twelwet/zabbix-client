const cliProgress = require('cli-progress');
const colors = require('ansi-colors');

const getBar = (barName, itemName) =>
	new cliProgress.SingleBar(
		{
			format:
				`${barName} |` + colors.green('{bar}') + `| {percentage}% || {value}/{total} ${itemName}`,
			barCompleteChar: '\u2588',
			barIncompleteChar: '\u2591',
			hideCursor: true,
		},
		cliProgress.Presets.shades_classic,
	);

const mockBar = {
	start: () => null,
	update: () => null,
	stop: () => null,
};

module.exports = { getBar, mockBar };
