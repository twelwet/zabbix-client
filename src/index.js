const getCliAnswers = require('./cli-service/cli');
const getPeriodDetails = require('./zabbix/period-details');
const { saveBilling } = require('./util');

const main = async () => {
	const { groupName, dateItem, daysCount } = await getCliAnswers();
	const periodDetails = await getPeriodDetails({ groupName, dateItem, daysCount });
	saveBilling(periodDetails, groupName);
};

main();
