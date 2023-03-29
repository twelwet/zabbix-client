const hostAdapter = (hostItem) => {
	const { hostid, name, description, status } = hostItem;
	return {
		id: hostid,
		name,
		description,
		state: Number(status) === 0 ? 'active' : 'deactivated',
	};
};

module.exports = hostAdapter;
