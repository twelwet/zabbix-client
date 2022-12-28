const fs = require(`fs`);
const { promisify } = require(`util`);
const { join } = require(`path`);
const chalk = require('chalk');

const getFilePath = (filename) => join(__dirname, '..', '..', 'data', filename);

const saveToFile = async (path, data) => {
	const writeFile = promisify(fs.writeFile);
	try {
		await writeFile(path, data);
		console.log('---');
		console.log(`${chalk.bold('SUCCESS')}. Файл ${chalk.green(`${path}`)} создан.`);
		return;
	} catch (e) {
		console.error(e.message);
		return e;
	}
};

const readDir = async (path) => {
	const readDir = promisify(fs.readdir);
	try {
		return await readDir(path);
	} catch (e) {
		console.error(e.message);
		return e;
	}
};

module.exports = { saveToFile, readDir, getFilePath };
