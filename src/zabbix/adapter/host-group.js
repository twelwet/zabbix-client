const hostGroupAdapter = (hostGroupItem) => {
	const { groupid, name } = hostGroupItem;
	return {
		id: groupid,
		name,
	};
};

module.exports = hostGroupAdapter;
