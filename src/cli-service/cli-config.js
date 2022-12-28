require('dotenv').config();

const CliConfig = {
	// border dates for zabbix host groups
	GROUPS_TO_DATES: {
		[`${process.env.ZABBIX_HOST_GROUP_1}`]: new Date('2022-12-01T00:00:00'),
		[`${process.env.ZABBIX_HOST_GROUP_2}`]: new Date('2022-09-01T00:00:00'),
	},
};

module.exports = { CliConfig };
