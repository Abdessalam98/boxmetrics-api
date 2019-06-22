const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const Server = require("../models/Server");

module.exports = {
	index: (req, res) => {
		const { u } = req.query;
		if(u) {
			Server.find({})
				.where("user")
				.equals(u)
				.exec((err, servers) => {
					if (err) {
						res.status(500).json({
							error: err
						});
						return;
					}
					res.status(200).json({
						count: servers.length,
						servers
					});
				});
		}else{
			Server.find({}).exec((err, servers) => {
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
				}
				res.status(200).json({
					count: servers.length,
					servers
				});
			});
		}
	},
	store: (req, res) => {
		const body = req.body;

		req.check("name", "Name is required").notEmpty();
		req.check("name", "Name exists already").isUniqueServerName();
		req.check("host", "Host is required").notEmpty();
		req.check("port", "Port is required").notEmpty();
		req.check("os", "OS is required").notEmpty();
		req.check("username", "Username is required").notEmpty();
		req.check("password", "Password is required").notEmpty();

		// eslint-disable-next-line no-unused-vars
		const validation = req.getValidationResult().then(err => {
			const errors = err.array();
			if (!err.isEmpty()) {
				res.status(500).json({
					errors
				});
				return;
			} else {
				body.password = bcrypt.hashSync(body.password, salt);
				const server = new Server(body);
				server.save(err => {
					if (err) {
						res.status(500).json({
							errors: err
						});
						return;
					}
				});
			}
		});
	}
};
