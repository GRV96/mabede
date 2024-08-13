const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.status(200).send("A database accessed through a Node.js API");
});

app.post("/record-weather", (req, res) => {
	console.log(`POST request body: ${req.body}`);
	res.sendStatus(200);
});

app.listen(3000);
