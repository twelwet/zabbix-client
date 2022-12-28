require('dotenv').config();
const Zabbix = require('zabbix-promise');

const zabbix = new Zabbix({
	url: process.env.ZABBIX_URL,
	user: process.env.ZABBIX_USER,
	password: process.env.ZABBIX_PASSWORD,
});

module.exports = zabbix;
