//IMPORTS
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cities = require("./cities");
const CampgroundSchema = require("../Models/CampgroundSchema");
const { descriptors, places } = require("./seedHelpers");
//DOTENV
dotenv.config();
//CONNECTING TO DATABASE
const ConnectDB = async () => {
	try {
		await mongoose.connect(process.env.URI);
		console.log(`DATABASE CONNECTED`);
	} catch (err) {
		console.log(err);
	}
};
ConnectDB();
//Seed Function
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	try {
		await CampgroundSchema.deleteMany({});
		// for (let i = 0; i < 50; i++) {
		// 	const random = Math.floor(Math.random() * 1000);
		// 	const camp = new CampgroundSchema({
		// 		Name: `${sample(descriptors)} ${sample(places)}`,
		// 		Price: Math.floor(Math.random() * 100),
		// 		Description: `${sample(descriptors)} ${sample(places)}`,
		// 		Location: `${cities[random].city} ${sample(places)}`,
		// 		Imgs: ["Images"],
		// 	});
		// 	await camp.save();
		// }
	} catch (error) {
		console.log(`error`, error);
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
