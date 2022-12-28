const moment = require('moment');

const trendAdapter = (trendItem) => {
	const { itemid, clock, value_avg } = trendItem;
	return {
		sensorId: itemid,
		time: moment.unix(clock).format('DD.MM.YYYY HH:mm:ss'),
		value: Number(value_avg),
	};
};

module.exports = trendAdapter;
