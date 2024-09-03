const mysql = require("mysql2");

const MabedeError = require("./mabede-error");

const EMPTY_STR = "";
const SPACE = " ";
const UC_T = "T";

const INVALID_IDS_MESSAGE = "IDs: an empty request body or an array of integers is required.";
const TYPE_STRING = "string";

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_TCP_PORT,
	database: process.env.MYSQL_DATABASE,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD
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
			return reject(new MabedeError(500, err));
		});
	});
}

function adjustDateTimeFormat(dateTimeStr) {
	return dateTimeStr.replace(UC_T, SPACE);
}

function deleteWeatherRecord(weatherRecordIds) {
	return new Promise((resolve, reject) => {
		const whereClause = makeWhereClauseMultipleIds("id", weatherRecordIds);
		if (typeof whereClause !== TYPE_STRING) {
			// It is a MabedeError.
			return reject(whereClause);
		}

		const deletionQuery = `DELETE FROM WeatherRecords${whereClause};`;
		poolPromise.execute(deletionQuery)
		.then(() => {
			return resolve();
		}).catch(err => {
			return reject(new MabedeError(500, err));
		});
	});
}

function getWeatherRecords(fromMoment, toMoment) {
	return new Promise((resolve, reject) => {
		if (new Date(toMoment) <= new Date(fromMoment)) {
			reject(new MabedeError(400, "Argument toMoment must be later than fromMoment."));
		}

		const selectionQuery =
			`SELECT * FROM WeatherRecords${makeWhereClauseTimeInterval("moment", fromMoment, toMoment)};`;
		poolPromise.execute(selectionQuery)
		.then(result => {
			return resolve(result[0]);
		}).catch(err => {
			return reject(new MabedeError(500, err));
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

function makeWhereClauseMultipleIds(columnName, ids) {
	if (ids == null || ids == undefined || /* Empty object */ Object.keys(ids).length == 0) {
		return EMPTY_STR;
	}

	if (!Array.isArray(ids)) {
		return new MabedeError(400, INVALID_IDS_MESSAGE);
	}

	if (ids.length == 0) {
		return EMPTY_STR;
	}

	ids.forEach(id => {
		if (!Number.isInteger(id)) {
			return new MabedeError(400, INVALID_IDS_MESSAGE);
		}
	});

	return ` WHERE ${columnName} IN (${ids.join(", ")})`;
}

function makeWhereClauseTimeInterval(columnName, fromMoment, toMoment) {
	const isfromMomentDefined = fromMoment != undefined && fromMoment != null;
	const istoMomentDefined = toMoment != undefined && toMoment != null;

	if (!isfromMomentDefined && !istoMomentDefined)
	{
		return EMPTY_STR;
	}

	let whereClause = " WHERE ";

	if (isfromMomentDefined) {
		fromMoment = adjustDateTimeFormat(fromMoment);
		whereClause += `${columnName} >= '${fromMoment}'`;
	}

	if (istoMomentDefined) {
		if (isfromMomentDefined) {
			whereClause += " AND ";
		}

		toMoment = adjustDateTimeFormat(toMoment);
		whereClause += `${columnName} <= '${toMoment}'`;
	}

	return whereClause;
}

function weatherRecordToValueTuple(weatherRecord) {
	return `('${adjustDateTimeFormat(weatherRecord.moment)}', ${weatherRecord.temperature}, ${weatherRecord.preciProb}, ${weatherRecord.windSpeed})`;
}

module.exports = {addWeatherRecord, deleteWeatherRecord, getWeatherRecords};
