const mysql = require("mysql2");
const WeatherRecord = require("./weather-record");

const pool = mysql.createPool({
	host: "database",
	port: "3306",
	database: "mabede-database",
	user: "utilisateur",
	password: "mot-de-passe"
});

const poolPromise = pool.promise();

poolPromise.execute(
	//"USE mabede-database;\n" +
	"CREATE TABLE IF NOT EXISTS WeatherRecords (" +
	"id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
	"moment DATETIME NOT NULL," +
	"temperature DOUBLE NOT NULL," +
	"preciProb DOUBLE NOT NULL," +
	"windSpeed DOUBLE NOT NULL);");

function dataToWeatherRecord(data) {
	return new WeatherRecord(data.moment, data.temperature, data.preciProb, data.windSpeed);
}

function getWeatherRecords(startMoment, endMoment) {
	let data = poolPromise.execute(
		`SELECT * FROM WeatherRecords wr WHERE wr.moment >= ${startMoment} AND wr.moment <= ${endMoment};`);

	let result;
	if (Array.isArray(data)) {
		result = data.map(d => dataToWeatherRecord(d));
	}
	else {
		result = dataToWeatherRecord(data);
	}

	return result;
}

function registerWeather(moment, temperature, preciProb, windSpeed) {
	let success = true;
	const values = `('${moment}', ${temperature}, ${preciProb}, ${windSpeed})`;
	poolPromise.execute(`INSERT INTO WeatherRecords (moment, temperature, preciProb, windSpeed) VALUES ${values};`)
	.catch((err) => {
		success = false;
		console.log(err);
	});
	return success;
}

module.exports = {getWeatherRecords, registerWeather};
