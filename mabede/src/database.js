const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "database",
	database: "mabede-database",
	user: "utilisateur",
	password: "mot-de-passe"
});

const promise = pool.promise();

module.exports = promise;
