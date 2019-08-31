const router = require("express").Router();
const verifyToken = require("../../middleware/verifyToken");
const UserController = require("../../controllers/UserController");

router
	.use(verifyToken)
	.route("/")
	.get(UserController.index);

router
	.use(verifyToken)
	.route("/:id")
	.get(UserController.show)
	.put(UserController.update)
	.delete(UserController.destroy);

module.exports = router;
