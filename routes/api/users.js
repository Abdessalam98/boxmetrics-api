const router = require("express").Router(),
	UserController = require("../../controllers/UserController"),
	jwt = require("jsonwebtoken"),
	jwtSecret = require("../../config/jwt");

// Middleware
router
	.use((req, res, next) => {
		const token = req.headers["x-access-token"];
		if (!token) return res.status(403).send({ auth: false, message: "No token provided" });

		jwt.verify(token, jwtSecret, function(err, decoded) {
			if (err) return res.status(401).send({ auth: false, message: "Failed to authenticate token" });
			req.userId = decoded.id;
			next();
		});
	})
	.route("/")
	.get(UserController.index);

// router.get("/", verifyToken, function(req, res) {
// 	res.status(200).json(null);
// });
// .post(UserController.store);
// router
// 	.route("/:id([0-9a-fA-F]{24})")
// 	.get(UserController.show)
// 	.put(UserController.update)
// 	.delete(UserController.destroy);
// router.route("/search").get(UserController.search);

module.exports = router;
