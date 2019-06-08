const mongoose = require("mongoose");

module.exports = mongoose.model("Server", {
	name: {
		type: String,
		unique: true,
		required: true
	},
	host: {
		type: String,
		required: true
	},
  os: {
		type: String,
		required: true
	},
	port: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	privateKey: {
		type: String,
	},
	status: {
		type: String,
		enum: ["active", "inactive", "disabled", "locked", "expired"],
		default: "inactive"
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	lastConnection: { type: Date, default: Date.now },
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now }
});
