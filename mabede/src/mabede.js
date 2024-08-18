const bodyParser = require("body-parser");
const express = require("express");

const db = require("./database");
const WeatherRecord = require("./weather-record");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.status(200).send("A database accessible through a Node.js API");
});

app.get("/read-weather", (req, res) => {
	const query = req.query;
	const startMoment = query.startMoment.replace("T", " ");
	const endMoment = query.endMoment.replace("T", " ");
	const weatherRecords = db.getWeatherRecords(startMoment, endMoment);
	console.log(weatherRecords);
	res.status(200).send(weatherRecords);
});

app.post("/record-weather", (req, res) => {
	const reqBody = req.body;
	success = db.registerWeather(reqBody.moment, reqBody.temperature, reqBody. preciProb, reqBody.windSpeed);
	console.log(`Weather recorded in the database: ${success}`);
	const weatherRecord = new WeatherRecord(reqBody.moment, reqBody.temperature, reqBody. preciProb, reqBody.windSpeed);
	console.log(`${weatherRecord}`);
	res.sendStatus(200);
});

app.listen(3000);
