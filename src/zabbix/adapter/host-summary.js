const hostSummaryAdapter = (mode, date, hostItem, sensorItem, interfaceItem, hours, linkDay) => {
	if (mode === 'dev') {
		return {
			date,
			hostId: hostItem.id,
			hostName: hostItem.name,
			// hostDescription: hostItem.description,
			ip: interfaceItem.ip,
			sensorId: sensorItem.id,
			sensorName: sensorItem.name,
			up: hours.up,
			down: hours.down,
			linkDay,
		};
	} else {
		return {
			['Дата']: date,
			['Хост']: hostItem.name,
			['ip']: interfaceItem.ip,
			['Сенсор']: sensorItem.name,
			['Онлайн-ч']: hours.up,
			['Офлайн-ч']: hours.down,
			['Канал-д']: linkDay,
		};
	}
};

module.exports = hostSummaryAdapter;
