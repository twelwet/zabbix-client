const moment = require('moment');
const getDailyDetails = require('./daily-details');
const zabbix = require('./service');
const { getAllGroups, getHostsByGroupId } = require('./util');
const { CliConfig } = require('../cli-service/cli-config');

const getDays = (dateItem, daysCount) => {
	const days = [];
	const initialMoment = moment(dateItem).startOf('day');
	for (const item of [...Array(Number(daysCount)).keys()]) {
		if (item > 0) {
			initialMoment.add(60 * 60 * 24, 'seconds');
		}
		days.push({
			unix: initialMoment.unix(),
			humanDate: initialMoment.format('DD.MM.YYYY'),
		});
	}
	return days;
};

const getDailyProps = (allHosts, date, linkDayMethod, limit = 24, isBar = true, mode = 'prod') => ({
	allHosts,
	date,
	limit,
	isBar,
	mode, // 'dev' | 'prod'
	linkDayMethod: CliConfig.LINKDAY_METHODS[linkDayMethod],
});

const getPeriodDetails = async ({ groupName, dateItem, daysCount, linkDayMethod }) => {
	const service = zabbix;
	const days = getDays(dateItem, daysCount);

	await service.login();
	const allGroups = await getAllGroups(service);
	const targetGroup = allGroups.find((it) => it.name.includes(groupName));
	const allHosts = await getHostsByGroupId(service, targetGroup.id);
	const result = [];

	for (const day of days) {
		const props = getDailyProps(allHosts, day, linkDayMethod);
		console.log('---');

		const { data, date } = await getDailyDetails(props);
		result.push({ data, date });
	}

	service.logout();
	return result;
};

module.exports = getPeriodDetails;
