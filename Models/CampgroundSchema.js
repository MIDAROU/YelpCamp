//IMPORTS
const mongoose = require("mongoose");

//SCHEMA
const Campground = new mongoose.Schema(
	{
		Name: {
			type: String,
			required: true,
			trim: true,
		},
		Price: {
			type: String,
			required: true,
			trim: true,
		},
		number: {
			type: String,
			required: true,
			trim: true,
		},
		Description: {
			type: String,
			required: true,
			trim: true,
		},
		Location: {
			Name: {
				type: String,
				required: true,
				trim: true,
			},
			Longitude: {
				type: Number,
				required: true,
			},
			Latitude: {
				type: Number,
				required: true,
			},
		},
		Imgs: [{ type: String }],
		Comments: [mongoose.Schema.ObjectId],
		CreatedBy: {
			Name: { type: String, required: true },
			Img: { type: String },
			Id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		},
	},
	{
		timestamps: true,
	}
);

//MODEL //EXPORTS
module.exports = mongoose.model("CampGrounds", Campground);
