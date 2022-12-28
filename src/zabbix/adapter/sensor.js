const sensorAdapter = (sensorItem) => {
	const { itemid, hostid, interfaceid, name } = sensorItem;
	return {
		id: itemid,
		name,
		hostId: hostid,
		interfaceId: interfaceid,
	};
};

module.exports = sensorAdapter;
