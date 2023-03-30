require('dotenv').config();

const CliConfig = {
	// border dates for zabbix host groups
	GROUPS_TO_DATES: {
		[`${process.env.ZABBIX_HOST_GROUP_1}`]: new Date('2022-12-01T00:00:00'),
		[`${process.env.ZABBIX_HOST_GROUP_2}`]: new Date('2022-12-01T00:00:00'),
		[`${process.env.ZABBIX_HOST_GROUP_3}`]: new Date('2022-12-01T00:00:00'),
	},
	LINKDAY_METHODS: {
		['[ФВФ] Хост онлайн не менее 1 ч/сут']: '1_from_24',
		['[ИВН] Хост онлайн не менее 12 ч/сут']: '12_from_24',
	},
};

module.exports = { CliConfig };
