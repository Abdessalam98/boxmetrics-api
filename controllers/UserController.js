const User = require("../models/User");
module.exports = {
	index: (req, res) => {
		User.find({}).exec((err, users) => {
			if (err) {
				res.status(500).json({
					error: err
				});
				return;
			}
			res.status(200).json({
				count: users.length,
				// Test ID
				users: users.map((x) => x._id)
			});
		});
	}
};
