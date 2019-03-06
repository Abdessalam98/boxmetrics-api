const User = require("../models/User");

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
	}
};
