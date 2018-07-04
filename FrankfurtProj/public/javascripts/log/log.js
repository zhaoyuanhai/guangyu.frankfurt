var log4js = require('log4js');

log4js.configure({

	appenders: [
		{
			type: 'console',
			category: "console"

		}, //����̨���
		{
			type: "file",
			filename: 'logs/log.log',
			pattern: "_yyyy-MM-dd",
			maxLogSize: 20480,
			backups: 3,
			category: 'dateFileLog'

		}//�����ļ���ʽ
	],
	replaceConsole: true,   //�滻console.log
	levels: {
		dateFileLog: 'debug',
		console: 'debug'
	}
});


var dateFileLog = log4js.getLogger('dateFileLog');
var consoleLog = log4js.getLogger('console');
exports.logger = consoleLog;


exports.use = function (app) {
	app.use(log4js.connectLogger(consoleLog, { level: 'INFO', format: ':method :url' }));
}