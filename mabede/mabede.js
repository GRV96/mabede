const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.status(200).send("A database accessed through a Node.js API");
});

app.post("/record-weather", (req, res) => {
	const reqBody = req.body;
	console.log(`Moment: ${reqBody.moment}`);
	console.log(`Temperature: ${reqBody.temperature}`);
	console.log(`Precipitation probability: ${reqBody.preciProb}`);
	console.log(`Wind speed: ${reqBody.windSpeed}`);
	res.sendStatus(200);
});

app.listen(3000);
