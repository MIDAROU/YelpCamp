//IMPORTS
const mongoose = require("mongoose");

//SCHEMA
const Comment = new mongoose.Schema(
	{
		Body: {
			type: String,
			required: true,
			trim: true,
		},
		Rating: {
			type: Number,
			required: true,
		},
		Author: {
			Name: {
				type: String,
				required: true,
			},
			Img: {
				type: String,
			},
			Id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		},
		Campground: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

//MODEL //EXPORTS
module.exports = mongoose.model("Comments", Comment);
