const router = require("express").Router();
const ServerController = require("../../controllers/ServerController");

router
	.route("/")
	.get(ServerController.getAllServers)
	.post(ServerController.createServer);

router
	.route("/:id")
  .get(ServerController.getServerByID)
  .post(ServerController.updateServerByID)
	.delete(ServerController.deleteServerByID);

module.exports = router;
