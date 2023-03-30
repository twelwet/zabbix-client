const { CliConfig } = require('./cli-config');

const cliQuestions = [
	{
		type: 'list',
		name: 'linkDayMethod',
		message: 'Способ обсчета канал-дней:',
		choices: Object.keys(CliConfig.LINKDAY_METHODS),
	},
	{
		type: 'list',
		name: 'groupName',
		message: 'Выберите группу хостов:   ',
		choices: Object.keys(CliConfig.GROUPS_TO_DATES),
	},
	{
		type: 'date',
		name: 'dateItem',
		message: 'Выберите начальную дату:  ',
		default: new Date(Date.now()),
		format: {
			month: '2-digit',
			hour: undefined,
			minute: undefined,
			second: undefined,
			weekday: 'short',
		},
		locale: 'ru-RU',
		validate: (value, { groupName }) => {
			const yesterday = new Date(Date.now()).valueOf() - 86400000;
			const borderDate = CliConfig.GROUPS_TO_DATES[`${groupName}`];
			if (value.valueOf() >= yesterday) {
				return 'Выберите более раннюю дату';
			}
			if (value.valueOf() < borderDate.valueOf()) {
				return 'Выберите более позднюю дату';
			}
			return true;
		},
	},
	{
		type: 'input',
		name: 'daysCount',
		message: 'Кол-во дней для обсчета:  ',
		validate: (value) => {
			if (Number.isInteger(Number(value))) {
				const match = value > 0 && value <= 31 ? true : false;
				return match ? true : 'Валидное кол-во: от 1 до 31';
			} else {
				return 'Это должно быть целое число';
			}
		},
	},
];

module.exports = cliQuestions;
