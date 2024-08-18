const mysql = require("mysql2");
const WeatherRecord = require("./weather-record");

const pool = mysql.createPool({
	host: "database",
	port: "3306",
	database: "MabedeDatabase",
	user: "utilisateur",
	password: "mot-de-passe"
});

const poolPromise = pool.promise();

poolPromise.execute(
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
	return new Promise((resolve, reject) => {
		const selectQuery =
			`SELECT * FROM WeatherRecords wr WHERE wr.moment >= '${startMoment}' AND wr.moment <= '${endMoment}';`;
		poolPromise.execute(selectQuery)
		.then(result => {
			return resolve(result[0]);
		}).catch(error => {
			return reject(error);
		});
	});
}

function makeValuesToInsert(weatherData) {
	if (Array.isArray(weatherData)) {
		let tuples = weatherData.map(
			weatherRecord => weatherRecordToValueTuple(weatherRecord));
		return tuples.join(",\n");
	}
	else {
		return weatherRecordToValueTuple(weatherData);
	}
}

function registerWeather(weatherData) {
	return new Promise((resolve, reject) => {
		const values = makeValuesToInsert(weatherData);
		// Having the value tuples on several lines will help debugging.
		const insertionQuery =
			`INSERT INTO WeatherRecords (moment, temperature, preciProb, windSpeed) VALUES\n${values};`;
		poolPromise.execute(insertionQuery)
		.then(result => {
			return resolve(null);
		}).catch(err => {
			return reject(err);
		});
	});
}

function weatherRecordToValueTuple(weatherRecord) {
	return `('${weatherRecord.moment}', ${weatherRecord.temperature}, ${weatherRecord.preciProb}, ${weatherRecord.windSpeed})`;
}

module.exports = {getWeatherRecords, registerWeather};
