require('dotenv').config();

const CliConfig = {
	// border dates for zabbix host groups
	GROUPS_TO_DATES: {
		[`${process.env.ZABBIX_HOST_GROUP_1}`]: new Date('2022-12-01T00:00:00'),
		[`${process.env.ZABBIX_HOST_GROUP_2}`]: new Date('2022-12-01T00:00:00'),
		[`${process.env.ZABBIX_HOST_GROUP_3}`]: new Date('2022-12-01T00:00:00'),
		[`${process.env.ZABBIX_HOST_GROUP_4}`]: new Date('2022-01-01T00:00:00'),
		[`${process.env.ZABBIX_HOST_GROUP_5}`]: new Date('2022-01-01T00:00:00'),
	},
};

module.exports = { CliConfig };
