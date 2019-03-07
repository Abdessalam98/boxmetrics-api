const router = require("express").Router(),
	UserController = require("../../controllers/UserController"),
	verifyToken = require("../../middleware/verifyToken");

// Middleware
router.use(verifyToken).route("/").get(UserController.index);

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
