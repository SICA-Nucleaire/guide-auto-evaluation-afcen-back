const express = require('express');
const {DateTime} = require('luxon');
const cors = require('cors');

const initJsonHandlerMiddlware = (app) => app.use(express.json());

const initCorsMiddlware = (app) => app.use(cors());

const initLoggerMiddlware = (app) => {
	app.use((req, res, next) => {
		const begin = new DateTime(new Date());

		res.on('finish', () => {
			const requestDate = new Date().toLocaleString();
			const remoteIP = `IP: ${req.connection.remoteAddress}`;
			const httpInfo = `${req.method} ${req.baseUrl || req.path}`;

			const end = new DateTime(new Date());
			const requestDurationMs = end.diff(begin).toMillis();
			const requestDuration = `Duration: ${requestDurationMs}ms`;

			console.log(`[${requestDate}] - [${remoteIP}] - [${httpInfo}] - [${requestDuration}]`);
		})
		next();
	});
};

exports.initializeConfigMiddlewares = (app) => {
	initCorsMiddlware(app);
	initJsonHandlerMiddlware(app);
	initLoggerMiddlware(app);
}

exports.initializeErrorMiddlwares = (app) => {
	app.use((err, req, res, next) => {
		res.json(err.message).status(500)
	});
}
