const XLSX = require('xlsx');

const xlsx = {
	newBook: () => XLSX.utils.book_new(),
	jsonToSheet: (jsonData) => XLSX.utils.json_to_sheet(jsonData),
	sheetToJson: (sheet) => XLSX.utils.sheet_to_json(sheet),
	appendSheet: (book, sheet, sheetName) => XLSX.utils.book_append_sheet(book, sheet, sheetName),
	getData: (book) => XLSX.write(book, { bookType: 'xlsx', type: 'buffer' }),
	read: (path, opts) => XLSX.readFile(path, opts),
};

module.exports = xlsx;
