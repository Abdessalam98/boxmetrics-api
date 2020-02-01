module.exports = {
	getDatabaseURL(dbConfig, suffix) {
		const { client, connection } = dbConfig;
		const { host, user, password, port, database } = connection;
		return `${
			suffix ? client + suffix : client
		}://${user}:${password}@${host}${port ? ":" + port : ""}/${database}`;
	}
};
