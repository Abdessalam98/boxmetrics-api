const router = require("express").Router();
const verifyToken = require("../../middleware/verifyToken");
const ServerController = require("../../controllers/ServerController");

router
	.use(verifyToken)
	.route("/")
	.get(ServerController.index)
	.post(ServerController.store);

router
	.use(verifyToken)
	.route("/:id")
	.get(ServerController.show)
	.delete(ServerController.destroy);

module.exports = router;
