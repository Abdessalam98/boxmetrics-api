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
				users: users.map(x => x._id)
			});
		});
	},
	destroy: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) {
				res.status(500).json({
					error: err
				});
				return;
			}

			user.remove(err => {
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
				}

				res.status(204).json({});
			});
		});
	},
	update: (req, res) => {
		const body = req.body;
		User.findByIdAndUpdate(
			req.params.id,
			{ $set: body },
			{ new: true },
			(err, user) => {
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
				}
				res.status(202).json(user);
			}
		);
	},
	show: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) {
				res.status(500).json({
					error: err
				});
				return;
			}

			res.status(200).json(user);
		});
	}
};
