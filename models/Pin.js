const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
	{
		createdBy: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
			min: 3,
		},
		desc: [
			{
				username: {
					type: String,
					required: true,
				},
				body: {
					type: String,
					required: true,
				},
				rating: {
					type: Number,
					required: true,
					min: 0,
					max: 5,
				},
				publishedAt: {
					type: String,
					required: true,
				},
			},
		],
		lat: {
			type: Number,
			required: true,
		},
		long: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
