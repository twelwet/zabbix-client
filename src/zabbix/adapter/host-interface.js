const hostInterfaceAdapter = (interfaceItem) => {
	const { interfaceid, hostid, ip } = interfaceItem;
	return {
		id: interfaceid,
		hostId: hostid,
		ip,
	};
};

module.exports = hostInterfaceAdapter;
