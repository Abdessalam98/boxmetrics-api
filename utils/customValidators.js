const User = require("../models/User");
const Server = require("../models/Server");

module.exports = {
	isUniqueUsername: (value) => {
		return new Promise((resolve, reject) => {
			User.findOne({ username: value })
				.then((user) => {
					if (user !== null) {
						return reject(user);
					}
					return resolve(true);
				})
				.catch((err) => {
					resolve(err);
				});
		});
	},
	isUniqueEmail: (value) => {
		return new Promise((resolve, reject) => {
			User.findOne({ email: value })
				.then((user) => {
					if (user !== null) {
						return reject(user);
					}
					return resolve(true);
				})
				.catch((err) => {
					resolve(err);
				});
		});
	},
	isUniqueServerName: (value) => {
		return new Promise((resolve, reject) => {
			Server.findOne({ name: value })
				.then((server) => {
					if (server !== null) {
						return reject(server);
					}
					return resolve(true);
				})
				.catch((err) => {
					resolve(err);
				});
		});
	},
};
