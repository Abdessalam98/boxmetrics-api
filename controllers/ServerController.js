const Joi = require("joi");
const Server = require("../models/Server");
const { hashPassword } = require("../utils/auth");
const { verifyUniqueServer } = require("../utils/validator");

module.exports = {
	getAllServers(req, res) {
		const { user } = req.query;
		Server.findAll({ user }).exec((error, servers) => {
			if (error) {
				return res.status(500).json({
					statusCode: 500,
					error: "Internal error",
					message: error.message
				});
			}
			return res.status(200).json({
				statusCode: 200,
				data: {
					servers
				},
				message: ""
			});
		});
	},
	getServerByID(req, res) {
		Server.findById(req.params.id, (error, server) => {
			if (error) {
				return res.status(500).json({
					statusCode: 500,
					error: "Internal error",
					message: error.message
				});
			}

			if (!server) {
				return res.status(404).json({
					statusCode: 404,
					error: "Not Found",
					message: "Server not found."
				});
			}

			return res.status(200).json({
				statusCode: 200,
				data: {
					server
				},
				message: ""
			});
		});
	},
	async createServer(req, res) {
		const {
			name,
			host,
			port,
			os,
			username,
			password: cipherPassword,
			privateKey: cipherPrivateKey
		} = req.body;
		const password = decryptAES(cipherPassword);
		const privateKey = decryptAES(cipherPrivateKey);

		const schema = Joi.object().keys({
			name: Joi.string().required(),
			host: Joi.string().required(),
			port: Joi.string().required(),
			os: Joi.string().required(),
			username: Joi.string().required(),
			password: Joi.string().required(),
			privateKey: Joi.string()
		});
		const result = Joi.validate(
			{ name, host, port, os, username, password, privateKey },
			schema
		);
		const { value, error } = result;
		const valid = error == null;

		if (!valid) {
			return res.status(400).json({
				statusCode: 400,
				error: "Bad request",
				message: "Invalid request payload input."
			});
		}

		const isUniqueServer = await verifyUniqueServer({ name }, res, next);

		if (isUniqueServer !== true) {
			return res.status(400).json({
				statusCode: 400,
				error: "Bad request",
				message: "Server already exists."
			});
		}

		const hash = hashPassword(password);
		const server = new Server({
			name,
			host,
			port,
			os,
			username,
			password: hash,
			privateKey
		});

		server.save(error => {
			if (error) {
				return res.status(500).json({
					statusCode: 500,
					error: "Internal error",
					message: error.message
				});
			}

			return res.status(201).json({
				statusCode: 201,
				data: {
					server
				},
				message: ""
			});
		});
	},
	updateServerByID(req, res) {
		const body = req.body;
		Server.findByIdAndUpdate(
			req.params.id,
			{ $set: body },
			{ new: true },
			(error, server) => {
				if (error) {
					return res.status(500).json({
						statusCode: 500,
						error: "Internal error",
						message: error.message
					});
				}
				if (!server) {
					return res.status(404).json({
						statusCode: 404,
						error: "Not Found",
						message: "Server not found."
					});
				}

				return res.status(202).json({
					statusCode: 202,
					data: {
						server
					},
					message: ""
				});
			}
		);
	},
	deleteServerByID(req, res) {
		Server.findById(req.params.id, (error, server) => {
			if (error) {
				return res.status(500).json({
					statusCode: 500,
					error: "Internal error",
					message: error.message
				});
			}

			if (!server) {
				return res.status(404).json({
					statusCode: 404,
					error: "Not Found",
					message: "Server not found."
				});
			}

			server.remove(error => {
				if (error) {
					return res.status(500).json({
						statusCode: 500,
						error: "Internal error",
						message: error.message
					});
				}
				return res.status(204).json({});
			});
		});
	}
};
