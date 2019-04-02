const mongoose = require("mongoose");

module.exports = mongoose.model("User", {
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ["active", "inactive", "disabled", "locked", "expired"],
		default: "inactive"
	},
	servers:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Server",
		}
	],
	lastConnection: { type: Date, default: Date.now },
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now }
});
