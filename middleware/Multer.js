//IMPORTS
const fs = require("fs");
const path = require("path");
const multer = require("multer");

//MULTER MIDDLEWARE USER

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "client/public/Images/Users");
	},
	filename: function (req, file, callback) {
		callback(
			null,
			file.fieldname + "--" + Date.now() + path.extname(file.originalname)
		);
	},
});

exports.upload = multer({ storage: storage });

//MULTER MIDDLEWATR CAMPGROUND

const storageCamps = multer.diskStorage({
	destination: function (req, file, callback) {
		const { id } = req.user;
		const path = `client/public/Images/Campgrounds/${id}`;
		fs.mkdirSync(path, { recursive: true });
		callback(null, path);
	},
	filename: function (req, file, callback) {
		callback(
			null,
			file.fieldname + "--" + Date.now() + path.extname(file.originalname)
		);
	},
});

exports.uploadCamps = multer({ storage: storageCamps });
