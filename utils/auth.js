const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secret, expiresIn } = require("../config/auth").jwt.options;

module.exports = {
	createToken(user) {
		const { _id: id, username, email } = user;
		const scope = user.admin ? "admin" : "";

		return jwt.sign({ id, username, email, scope }, secret, {
			algorithm: "HS256",
			expiresIn
		});
	},
	hashPassword(password) {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	},
	verifyPassword(password, hash) {
		return bcrypt.compareSync(password, hash);
	}
};
