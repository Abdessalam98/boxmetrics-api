const router = require("express").Router();
const verifyToken = require("../../middleware/verifyToken");

router.use("*", verifyToken);
router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/servers", require("./servers"));

module.exports = router;
