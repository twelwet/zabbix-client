const hostAdapter = (hostItem) => {
	const { hostid, name, description } = hostItem;
	return {
		id: hostid,
		name,
		description,
	};
};

module.exports = hostAdapter;
