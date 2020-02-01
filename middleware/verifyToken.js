const jwt = require("jsonwebtoken");
const { secret, tokenHeader } = require("../config/auth").jwt.options;
const { withAuth } = require("../config/routes");
const router = require("express").Router();

const verifyToken = (req, res, next) => {
	if (
		req.originalUrl &&
		!withAuth.some(route => route.test(req.originalUrl))
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

	jwt.verify(token, secret, (error, decoded) => {
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

module.exports = verifyToken;
