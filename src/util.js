const xlsx = require('./xlsx-service/xlsx');
const { getFilePath, saveToFile } = require('./fs-service/fs-service');

const getLinkDays = (detalization, hostGroup) => {
	const result = [];
	for (const { data, date } of detalization) {
		const linkDays = data.map((it) => +it['Канал-д']).reduce((acc, value) => acc + value);
		result.push({ ['Дата']: date, ['Группа хостов']: hostGroup, ['Канал-д']: linkDays });
	}
	return result;
};

const saveBilling = (detalization, fileName) => {
	const workbook = xlsx.newBook();
	const linkDays = getLinkDays(detalization, fileName);
	const linkDaysSheet = xlsx.jsonToSheet(linkDays);
	xlsx.appendSheet(workbook, linkDaysSheet, 'Канал-дни');

	for (const { data, date } of detalization) {
		const worksheet = xlsx.jsonToSheet(data);
		xlsx.appendSheet(workbook, worksheet, date);
	}

	console.log('---');
	console.table(linkDays);
	const xlsxBuffer = xlsx.getData(workbook);
	const filePath = getFilePath(`${fileName}.xlsx`);
	saveToFile(filePath, xlsxBuffer);
};

module.exports = { saveBilling };
