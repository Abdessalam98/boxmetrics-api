const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwt");
const salt = bcrypt.genSaltSync(10);
const User = require("../models/User");

module.exports = {
	login: (req, res) => {
		const { email, password } = req.body;

		req.check("email", "Email is required").notEmpty();
		req.check("email", "Email is not valid").isEmail();
		req.check("password", "Password is required").notEmpty();
		// eslint-disable-next-line no-unused-vars
		const validation = req.getValidationResult().then(err => {
			const errors = err.array();
			if (!err.isEmpty()) {
				res.status(500).json({
					errors
				});
			} else {
				User.findOne({ email: email }, (error, user) => {
					if (error) {
						res.status(500).json({
							error
						});
						return;
					}

					if (user === null) {
						res.status(404).json({
							message: "User does not exist"
						});
						return;
					}

					let isValidPassword = bcrypt.compareSync(
						password,
						user.password
					);

					if (!isValidPassword)
						return res
							.status(401)
							.send({ auth: false, token: null });

					let token = jwt.sign({ id: user.id }, jwtSecret, {
						expiresIn: 604800
					});

					res.status(200).send({
						auth: true,
						token: token,
						user: user
					});
				});
			}
		});
	},
	register: (req, res) => {
		const body = req.body;

		req.check("username", "Username is required").notEmpty();
		req.check("username", "Username exists already").isUniqueUsername();
		req.check("email", "Email is required").notEmpty();
		req.check("email", "Email is not valid").isEmail();
		req.check("email", "Email exists already").isUniqueEmail();
		req.check("password", "Password is required").notEmpty();

		// eslint-disable-next-line no-unused-vars
		const validation = req.getValidationResult().then(err => {
			const errors = err.array();
			if (!err.isEmpty()) {
				res.status(500).json({
					errors
				});
			} else {
				body.password = bcrypt.hashSync(body.password, salt);
				const user = new User(body);
				user.save(err => {
					if (err) {
						res.status(500).json({
							errors: err
						});
						return;
					}
					let token = jwt.sign({ id: user.id }, jwtSecret, {
						expiresIn: 86400
					});
					res.status(200).send({ auth: true, token: token });
				});
			}
		});
	}
};
