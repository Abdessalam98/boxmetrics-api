const jwt = require("jsonwebtoken");
const { jwt: jwtConfig } = require("../config/auth");
const { secret: jwtSecret, tokenHeader } = jwtConfig.options;
const { withAuth } = require("../config/routes");
const { startsWith } = require("../utils/helpers");
const router = require("express").Router();

const auth = (req, res, next) => {
	if (
		req.originalUrl &&
		!withAuth.some(route => startsWith(req.originalUrl, route))
	) {
		next();
		return;
	}

	const token = req.headers[tokenHeader];
	if (!token) {
		return res.status(401).json({
			statusCode: 401,
			error: "Unauthorized",
			message: "Missing authentication."
		});
	}

	jwt.verify(token, jwtSecret, (error, decoded) => {
		if (error) {
			return res.status(401).json({
				statusCode: 401,
				error: "Unauthorized",
				message: "Failed to authenticate token."
			});
		}
		req.isAdmin = decoded.scope === "admin";
		next();
	});
};

module.exports = auth;
