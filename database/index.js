const mongoose = require("mongoose");
const getDatabaseURL = require("./helpers").getDatabaseURL;
const dbConfig = require("../config/database").mongodb;
const env = require("../config/env");

module.exports = {
	connect() {
		const url = getDatabaseURL(dbConfig);
		mongoose.connect(url, dbConfig.options, error => {
			if (error) {
				throw error;
			}
			// eslint-disable-next-line no-console
			console.log("🚀 Successfully connected to database !");
		});
	}
};
