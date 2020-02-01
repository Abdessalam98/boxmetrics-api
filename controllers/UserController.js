const User = require("../models/User");
module.exports = {
	getAllUsers(req, res) {
		User.find({}).exec((error, users) => {
			if (error) {
				return res.status(500).json({
					statusCode: 500,
					error: "Internal error",
					message: error.message
				});
			}
			return res.status(200).json({
				statusCode: 200,
				data: {
					users
				},
				message: ""
			});
		});
	},
	getUserByID(req, res) {
		User.findById(req.params.id, (error, user) => {
			if (error) {
				return res.status(500).json({
					statusCode: 500,
					error: "Internal error",
					message: error.message
				});
			}

			if (!user) {
				return res.status(404).json({
					statusCode: 404,
					error: "Not Found",
					message: "User not found."
				});
			}

			return res.status(200).json({
				statusCode: 200,
				data: {
					user
				},
				message: ""
			});
		});
	},
	updateUserByID(req, res) {
		// const {body, isAdmin} = req;
		// if (isAdmin) {
		// 	// specific actions only for admins
		// }
		const body = req.body;
		User.findByIdAndUpdate(
			req.params.id,
			{ $set: body },
			{ new: true },
			(error, user) => {
				if (error) {
					return res.status(500).json({
						statusCode: 500,
						error: "Internal error",
						message: error.message
					});
				}

				if (!user) {
					return res.status(404).json({
						statusCode: 404,
						error: "Not Found",
						message: "User not found."
					});
				}

				return res.status(202).json({
					statusCode: 202,
					data: {
						user
					},
					message: ""
				});
			}
		);
	},
	deleteUserByID(req, res) {
		// const {body, isAdmin} = req;
		// if (isAdmin) {
		// 	// specific actions only for admins
		// }
		User.findById(req.params.id, (error, user) => {
			if (error) {
				return res.status(500).json({
					statusCode: 500,
					error: "Internal error",
					message: error.message
				});
			}

			user.remove(error => {
				if (error) {
					return res.status(500).json({
						statusCode: 500,
						error: "Internal error",
						message: error.message
					});
				}

				return res.status(204).json({});
			});
		});
	}
};
