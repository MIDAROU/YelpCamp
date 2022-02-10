//IMPORTS
const mongoose = require("mongoose");

//SCHEMA
const User = new mongoose.Schema(
	{
		Name: {
			type: String,
			required: true,
			trim: true,
		},

		Email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		Password: {
			type: String,
			required: true,
		},
		Img: String,
		Campgrounds: [mongoose.Schema.ObjectId],
		Comments: [mongoose.Schema.ObjectId],
		Role: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

//MODEL //EXPORTS
module.exports = mongoose.model("Users", User);
