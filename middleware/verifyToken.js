const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwt");

const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];
	if (!token)
		return res
			.status(403)
			.send({ auth: false, message: "No token provided" });

	jwt.verify(token, jwtSecret, function(err, decoded) {
		if (err)
			return res.status(401).send({
				auth: false,
				message: "Failed to authenticate token"
			});
		req.userId = decoded.id;
		next();
	});
};

module.exports = verifyToken;
