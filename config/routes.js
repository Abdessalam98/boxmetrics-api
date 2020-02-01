const defaultsTo = require("defaults-to");
const env = require("./env");

module.exports = {
	withAuth: [/^\/api\/v1\/users/, /^\/api\/v1\/servers/]
};
