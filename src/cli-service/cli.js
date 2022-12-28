const inquirer = require('inquirer');
const DatePrompt = require('inquirer-date-prompt');
const chalk = require('chalk');
const cliQuestions = require('./cli-questions');

inquirer.registerPrompt('date', DatePrompt);

console.log(chalk.bold('----------------------------------------'));
console.log(chalk.bold('Утилита билинга канало-дней [ZABBIX-API]'));
console.log(chalk.bold('----------------------------------------'));

const getCliAnswers = async () => {
	return await inquirer.prompt(cliQuestions);
};

module.exports = getCliAnswers;
