const bodyParser = require("body-parser");
const express = require("express");

const db = require("./database");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.status(200).send("A weather database accessible through a Node.js API");
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
	const fromMoment = query.fromMoment == undefined ? undefined : query.fromMoment;
	const toMoment = query.toMoment == undefined ? undefined : query.toMoment;

	db.getWeatherRecords(fromMoment, toMoment)
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
