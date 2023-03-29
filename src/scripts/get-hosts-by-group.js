const zabbix = require('../zabbix/service');
const xlsx = require('../xlsx-service/xlsx');
const { getFilePath, saveToFile } = require('../fs-service/fs-service');
const { getHostsByGroupId, getAllGroups } = require('../zabbix/util');

const main = async (groupName) => {
	const service = zabbix;

	await service.login();
	const allGroups = await getAllGroups(service);
	const targetGroup = allGroups.find((it) => it.name.includes(groupName));
	const allHosts = await getHostsByGroupId(service, targetGroup.id);
	service.logout();

	const workbook = xlsx.newBook();
	const allHostsSheet = xlsx.jsonToSheet(allHosts);
	xlsx.appendSheet(workbook, allHostsSheet, targetGroup.name);
	const xlsxBuffer = xlsx.getData(workbook);
	const filePath = getFilePath(`${targetGroup.name}.xlsx`);
	saveToFile(filePath, xlsxBuffer);
};

main('ИВН Камеры');
