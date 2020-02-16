const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const { jwt: jwtConfig } = require("../config/auth");
const { secret: jwtSecret, expiresIn } = jwtConfig.options;
const { cryptojs: cryptojsConfig } = require("../config/auth");
const { secret: cryptoSecret } = cryptojsConfig.options;

module.exports = {
	createToken(user) {
		const { _id: id, username, email } = user;
		const scope = user.admin ? "admin" : "";

		return jwt.sign({ id, username, email, scope }, jwtSecret, {
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
	},
	decryptAES(cipherPassword) {
		return CryptoJS.AES.decrypt(cipherPassword, cryptoSecret).toString(
			CryptoJS.enc.Utf8
		);
	}
};
