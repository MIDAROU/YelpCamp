//IMPORTS
const fs = require("fs");
const { validationResult, check } = require("express-validator");

//EXPRESS-VALIDATOR

exports.RegisterValidator = [
	check("Name", "Enter A Valid Name!").notEmpty().isLength({ min: 3, max: 15 }),
	check("Email", "Enter A Valid Email!")
		.isEmail()
		.isLength({ min: 10, max: 320 }),
	check("Password", "Enter A Valid Password!").notEmpty().isLength({ min: 6 }),
];

exports.LoginValidator = [
	check("Email", "Enter A Valid Email!")
		.isEmail()
		.isLength({ min: 10, max: 320 }),
	check("Password", "Enter A Valid Password!").notEmpty().isLength({ min: 6 }),
];

exports.ProfileValidator = [
	check("Name", "Enter A Valid Name!").notEmpty().isLength({ min: 3, max: 15 }),
	check("Email", "Enter A Valid Email!")
		.isEmail()
		.isLength({ min: 10, max: 320 }),
];

exports.PasswordValidator = [
	check("NewPassword", "Enter A Valid Password!")
		.notEmpty()
		.isLength({ min: 6 }),
	check("OldPassword", "Enter A Valid Password!")
		.notEmpty()
		.isLength({ min: 6 }),
];

exports.CommentsValidator = [
	check("Body", "Enter A Valid Comment!")
		.notEmpty()
		.isLength({ min: 5, max: 1000 }),
	check("Rating", "Enter A Valid Rating!").notEmpty().isInt({ min: 1, max: 5 }),
];

exports.CampgroundsValidator = [
	check("Name", "Enter A Valid Name!").notEmpty().isLength({ min: 5, max: 50 }),
	check("Price", "Enter A Valid Price!")
		.notEmpty()
		.isLength({ min: 1, max: 3 }),
	check("number", "Enter A Valid Number!")
		.notEmpty()
		.isLength({ min: 5, max: 15 }),
	check("Description", "Enter A Valid Description!")
		.notEmpty()
		.isLength({ min: 10, max: 1000 }),
	check("Location", "Enter A Valid Location!").notEmpty(),
];

exports.validation = (req, res, next) => {
	const errors = validationResult(req);
	const Imgs = req.files;
	if (!errors.isEmpty()) {
		if (Imgs && Imgs.length > 0) {
			//Remove Imgs If Fail
			Imgs.forEach((img) => {
				fs.unlinkSync(
					`client/public/Images/Campgrounds/${req.user._id}/${img.filename}`
				);
			});
		}
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};
