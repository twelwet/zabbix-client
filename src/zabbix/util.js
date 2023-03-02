const moment = require('moment');
const hostAdapter = require('./adapter/host');
const hostGroupAdapter = require('./adapter/host-group');
const sensorAdapter = require('./adapter/sensor');
const hostInterfaceAdapter = require('./adapter/host-interface');
const hostSummaryAdapter = require('./adapter/host-summary');
const trendAdapter = require('./adapter/trend');

const getUTSFromDate = ([day, month, year]) => {
	const date = moment(new Date(year, month - 1, day));
	return {
		unix: date.unix(),
		humanDate: date.format('DD.MM.YYYY'),
	};
};

const getHostsByGroupId = async (service, groupId) => {
	try {
		const rawData = await service.request('host.get', { groupids: groupId });

		const result = [];
		for (const rawDataItem of rawData) {
			result.push(hostAdapter(rawDataItem));
		}
		return result;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const getAllGroups = async (service) => {
	try {
		const rawData = await service.request('hostgroup.get', {});

		const result = [];
		for (const rawDataItem of rawData) {
			result.push(hostGroupAdapter(rawDataItem));
		}
		return result;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const getSensor = async (service, hostId, sensorName) => {
	try {
		const allHostSensors = await service.request('item.get', { hostids: hostId });
		const sensor = allHostSensors.find((it) => it['key_'].includes(sensorName));

		return sensorAdapter(sensor);
	} catch (error) {
		console.error(error);
		return {};
	}
};

const getInterface = async (service, hostId) => {
	try {
		const interfaces = await service.request('hostinterface.get', { hostids: hostId });
		const interface = interfaces[0];
		return hostInterfaceAdapter(interface);
	} catch (error) {
		console.error(error);
		return {};
	}
};

const getHostSummary = (mode, hostItem, sensorItem, interfaceItem, groupItem, hours, linkDay) => {
	return hostSummaryAdapter(mode, hostItem, sensorItem, interfaceItem, groupItem, hours, linkDay);
};

const getTrend = async (service, hostId, sensorId, unixTimeStamp, limit) => {
	try {
		const rawData = await service.request('trend.get', {
			output: ['itemid', 'clock', 'num', 'value_avg'],
			hostids: hostId,
			itemids: sensorId,
			time_till: unixTimeStamp,
			limit,
		});

		const result = [];
		for (const rawDataItem of rawData) {
			result.push(trendAdapter(rawDataItem));
		}
		return result;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const getHours = (dailyData) => {
	const dailyHours = dailyData.map((item) => item.value);
	const upHours =
		dailyHours.length === 0
			? 0
			: dailyHours.reduce((accumulator, currentValue) => accumulator + currentValue);
	return {
		up: upHours,
		down: 24 - upHours,
	};
};

module.exports = {
	getUTSFromDate,
	getHostsByGroupId,
	getAllGroups,
	getSensor,
	getInterface,
	getHostSummary,
	getTrend,
	getHours,
};
