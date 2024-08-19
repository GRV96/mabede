const mysql = require("mysql2");

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

function addWeatherRecord(weatherData) {
	return new Promise((resolve, reject) => {
		const valueTuples = makeValueTuplesToInsert(weatherData);
		const insertionQuery =
			`INSERT INTO WeatherRecords (moment, temperature, preciProb, windSpeed) VALUES\n${valueTuples};`;
		poolPromise.execute(insertionQuery)
		.then(() => {
			return resolve();
		}).catch(err => {
			return reject(err);
		});
	});
}

function deleteWeatherRecord(weatherRecordId) {
	return new Promise((resolve, reject) => {
		const deletionQuery = `DELETE FROM WeatherRecords WHERE id = ${weatherRecordId}`;
		poolPromise.execute(deletionQuery)
		.then(() => {
			return resolve();
		}).catch(err => {
			return reject(err);
		});
	});
}

function getWeatherRecords(startMoment, endMoment) {
	return new Promise((resolve, reject) => {
		const selectionQuery =
			`SELECT * FROM WeatherRecords${makeWhereClauseTimeInterval("moment", startMoment, endMoment)};`;
		poolPromise.execute(selectionQuery)
		.then(result => {
			return resolve(result[0]);
		}).catch(err => {
			return reject(err);
		});
	});
}

function makeValueTuplesToInsert(weatherData) {
	if (Array.isArray(weatherData)) {
		let tuples = weatherData.map(
			weatherRecord => weatherRecordToValueTuple(weatherRecord));
		// Having the value tuples on several lines will help debugging.
		return tuples.join(",\n");
	}
	else {
		return weatherRecordToValueTuple(weatherData);
	}
}

function makeWhereClauseTimeInterval(columnName, startTime, endTime) {
	const isStartTimeDefined = startTime != undefined && startTime != null;
	const isEndTimeDefined = endTime != undefined && endTime != null;

	if (!isStartTimeDefined && !isEndTimeDefined)
	{
		return "";
	}

	let whereClause = " WHERE ";

	if (isStartTimeDefined) {
		whereClause += `${columnName} >= '${startTime}'`;
	}

	if (isEndTimeDefined) {
		if (isStartTimeDefined) {
			whereClause += " AND ";
		}

		whereClause += `${columnName} <= '${endTime}'`;
	}

	return whereClause;
}

function weatherRecordToValueTuple(weatherRecord) {
	return `('${weatherRecord.moment}', ${weatherRecord.temperature}, ${weatherRecord.preciProb}, ${weatherRecord.windSpeed})`;
}

module.exports = {addWeatherRecord, deleteWeatherRecord, getWeatherRecords};
