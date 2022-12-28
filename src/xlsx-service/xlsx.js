const XLSX = require('xlsx');

const xlsx = {
	newBook: () => XLSX.utils.book_new(),
	jsonToSheet: (jsonData) => XLSX.utils.json_to_sheet(jsonData),
	appendSheet: (book, sheet, sheetName) => XLSX.utils.book_append_sheet(book, sheet, sheetName),
	getData: (book) => XLSX.write(book, { bookType: 'xlsx', type: 'buffer' }),
};

module.exports = xlsx;
