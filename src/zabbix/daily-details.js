const zabbix = require('./service');
const {
	getSensor,
	getInterface,
	getHostSummary,
	getTrend,
	getHours,
	getLinkDay,
} = require('./util');
const { getBar, mockBar } = require('../progress-bar/progress');
const chalk = require('chalk');

const getDailyDetails = async (props) => {
	const service = zabbix;
	const { mode, allHosts, date, limit, isBar, linkDayMethod } = props;
	const { unix, humanDate } = date;

	const result = [];

	const bar = isBar
		? getBar(`${chalk.bold('PENDING')}. [${chalk.green(humanDate)}] Загрузка данных.`, 'hosts')
		: mockBar;
	bar.start(allHosts.length, result.length);

	for (const targetHost of allHosts) {
		const targetSensor = await getSensor(service, targetHost.id, 'icmpping');
		const targetInterface = await getInterface(service, targetHost.id);
		const trend = await getTrend(service, targetHost.id, targetSensor.id, unix, limit);
		const hours = getHours(trend);
		const linkDay = getLinkDay(linkDayMethod, hours);

		const hostSummary = getHostSummary(
			mode,
			humanDate,
			targetHost,
			targetSensor,
			targetInterface,
			hours,
			linkDay,
		);

		result.push(hostSummary);
		bar.update(result.length);
	}
	bar.stop();

	return { data: result, date: humanDate };
};

module.exports = getDailyDetails;
