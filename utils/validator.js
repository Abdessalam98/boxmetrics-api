const User = require("../models/User");
const Server = require("../models/Server");

module.exports = {
	async verifyUniqueUser(req, res, next) {
		try {
			const user = await User.findOne({
				$or: [{ email: req.email }, { username: req.username }]
			});
			if (user) {
				return user;
			} else {
				return true;
			}
		} catch (error) {
			return res
				.json({
					statusCode: 500,
					error: "Internal error",
					message: error.message
				})
				.status(500);
		}
	},
	async verifyUniqueServer(req, res, next) {
		try {
			const server = await Server.findOne({ name: req.name });
			if (server) {
				return server;
			} else {
				return true;
			}
		} catch (error) {
			return res
				.json({
					statusCode: 500,
					error: "Internal error",
					message: error.message
				})
				.status(500);
		}
	}
};
