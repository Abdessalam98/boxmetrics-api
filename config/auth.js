const defaultsTo = require("defaults-to");
const env = require("./env");

const auth = {
	jwt: {
		uid: "id",
		options: {
			secret: defaultsTo(env.JWT_SECRET, ""),
			expiresIn: defaultsTo(env.JWT_EXPIRATION, 86400),
			tokenHeader: defaultsTo(env.JWT_TOKEN_HEADER, "Authorization")
		}
	}
};

module.exports = auth;
