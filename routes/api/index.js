const router = require("express").Router();
const auth = require("../../middleware/auth");

router.use("*", auth);
router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/servers", require("./servers"));

module.exports = router;
