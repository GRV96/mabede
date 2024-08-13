const bodyParser = require("body-parser");
const express = require("express");

const WeatherRecord = require("./weather-record");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.status(200).send("A database accessible through a Node.js API");
});

app.post("/record-weather", (req, res) => {
	const reqBody = req.body;
	const weatherRecord = new WeatherRecord(reqBody.moment, reqBody.temperature, reqBody. preciProb, reqBody.windSpeed);
	console.log(`${weatherRecord}`);
	res.sendStatus(200);
});

app.listen(3000);
