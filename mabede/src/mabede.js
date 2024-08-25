const bodyParser = require("body-parser");
const express = require("express");

const db = require("./database");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.status(200).send("A database accessible through a Node.js API");
});

app.post("/add-weather", (req, res) => {
	const reqBody = req.body;
	db.addWeatherRecord(reqBody)
	.then(() => {
		res.sendStatus(200);
	}).catch(err => {
		res.status(error.statusCode).send(err.content);
	});
});

app.get("/get-weather", (req, res) => {
	const query = req.query;
	const startMoment = query.startMoment == undefined ? undefined : query.startMoment;
	const endMoment = query.endMoment == undefined ? undefined : query.endMoment;

	db.getWeatherRecords(startMoment, endMoment)
	.then(weatherRecords => {
		res.status(200).send(weatherRecords);
	}).catch(err => {
		res.status(err.statusCode).send(err.content);
	});
});

app.delete("/delete-weather", (req, res) => {
	const reqBody = req.body;
	db.deleteWeatherRecord(reqBody)
	.then(() => {
		res.sendStatus(200);
	}).catch(err => {
		res.status(err.statusCode).send(err.content);
	});
});

app.listen(3000);
