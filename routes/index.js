const router = require("express").Router();
const { apiPrefix } = require("../config/app");

router.use(apiPrefix, require("./api"));
module.exports = router;
