//IMPORTS
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//DOTENV
dotenv.config();
//CONNECTING TO DATABASE
const ConnectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log(`DATABASE CONNECTED`);
	} catch (err) {
		console.log(err);
	}
};

//EXPORTS
module.exports = ConnectDB;
