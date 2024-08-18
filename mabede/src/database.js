const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "database",
	port: "3306",
	database: "mabede-database",
	user: "utilisateur",
	password: "mot-de-passe"
});

const promise = pool.promise();

/*
try {
	//promise.execute("CREATE DATABASE IF NOT EXISTS mabede-database;");
	promise.execute(
		"CREATE TABLE IF NOT EXISTS WeatherRecords (" +
		"id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
		"moment DATETIME NOT NULL," +
		"temperature DOUBLE NOT NULL," +
		"preciProb DOUBLE NOT NULL," +
		"windSpeed DOUBLE NOT NULL);");}
catch (err) {
	console.log(err);
}//*/
console.log("Table created");

function getWeatherRecords(startMoment, endMoment) {
}

function registerWeather(moment, temperature, preciProb, windSpeed) {
	let success = true;
	const values = `('${moment}', ${temperature}, ${preciProb}, ${windSpeed})`;
	promise.execute(`INSERT INTO WeatherRecords (moment, temperature, preciProb, windSpeed) VALUES ${values}`)
	.catch((err) => {
		success = false;
		console.log(err);
	});
	return success;
}

module.exports = {getWeatherRecords, registerWeather};
