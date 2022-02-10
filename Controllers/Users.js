//IMPORTS
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchema = require("../Models/UserSchema");
const CampgroundSchema = require("../Models/CampgroundSchema");
const CommentSchema = require("../Models/CommentSchema");

//POST USER SIGNUP METHOD

exports.User_Sign_Up = async (req, res) => {
	const { Name, Email, Password } = req.body;
	try {
		const found = await UserSchema.findOne({ Email });
		if (found) {
			return res
				.status(400)
				.send({ errors: [{ msg: "User Already Exists " }] });
		}
		const newUser = new UserSchema({ Name, Email, Password });

		newUser.Role = "User";
		//DEFAULT IMG ""
		newUser.Img = "";

		//BCRYPT
		const salt = 10;
		const hashedPassword = bcrypt.hashSync(Password, salt);
		newUser.Password = hashedPassword;

		//JSONWEBTOKEN
		const payload = { id: newUser._id };
		const Token = jwt.sign(payload, process.env.SecretOrKey);

		await newUser.save();
		res
			.status(200)
			.send({ success: [{ msg: "Register Succesful:" }], newUser, Token });
	} catch (err) {
		res.status(500).send({ errors: [{ msg: "Could Not Register" }] });
	}
};

exports.User_Sign_In = async (req, res) => {
	const { Email, Password } = req.body;
	try {
		const found = await UserSchema.findOne({ Email });
		if (!found) {
			return res.status(400).send({ errors: [{ msg: "Wrong Email !" }] });
		}
		const match = await bcrypt.compare(Password, found.Password);
		if (!match) {
			return res.status(400).send({ errors: [{ msg: "Wrong Password !" }] });
		}

		//JSONWEBTOKEN
		const payload = { id: found._id };
		const Token = jwt.sign(payload, process.env.SecretOrKey);

		res
			.status(200)
			.send({ success: [{ msg: "Login Succesful" }], found, Token });
	} catch (error) {
		res
			.status(500)
			.send({ errors: [{ msg: "SERVER ERROR , Could Not Login!" }] });
	}
};

exports.Admin = async (req, res) => {
	const { Key } = req.body;
	try {
		if (Key === process.env.KEY) {
			const User = await UserSchema.findById(req.user._id);
			if (User.Role === "Admin") {
				return res
					.status(400)
					.send({ errors: [{ msg: "You Are Already An Admin!" }] });
			} else {
				User.Role = "Admin";
				User.save();
				res.send({ success: [{ msg: "You Are Now An Admin" }], User });
			}
		} else {
			res.status(400).send({ errors: [{ msg: "Wrong Key!" }] });
		}
	} catch (error) {
		res
			.status(500)
			.send({ errors: [{ msg: "Server Error Could Not Update!" }], error });
	}
};

exports.Admin_Get_Users = async (req, res) => {
	const Admin = req.user;
	try {
		if (Admin && Admin.Role === "Admin") {
			const Users = await UserSchema.find();
			res.send({ success: [{ msg: "Users" }], Users });
		} else {
			res.status(400).send({ errors: [{ msg: "You Are Not An Admin" }] });
		}
	} catch (error) {
		res
			.status(500)
			.send({ errors: [{ msg: "Server Error Could Not List!" }], error });
	}
};

exports.User_Upload = async (req, res) => {
	const { id } = req.body;
	const User = await UserSchema.findById(id);
	const Img = req.file;
	try {
		if (User._id.equals(req.user._id)) {
			if (Img) {
				if (User) {
					if (
						Img.mimetype === "image/png" ||
						Img.mimetype === "image/jpg" ||
						Img.mimetype === "image/jpeg" ||
						Img.mimetype === "image/gif"
					) {
						if (Img.size <= 5000000) {
							if (User.Img !== "") {
								fs.unlinkSync(`client/public/Images/Users/${User.Img}`); //DELETE OLD IMAGE
							}
							User.Img = Img.filename || "";

							const UpdatedUser = await User.save();
							res
								.status(200)
								.send({ success: [{ msg: "Image Updated !" }], UpdatedUser });
						} else {
							fs.unlinkSync(`client/public/Images/Users/${Img.filename}`); //DELETE IMAGE IF FAIL
							res
								.status(400)
								.send({ errors: [{ msg: "Image Size Should Be Under 5MB!" }] });
						}
					} else {
						fs.unlinkSync(`client/public/Images/Users/${Img.filename}`); //DELETE IMAGE IF FAIL
						res.status(400).send({
							errors: [{ msg: "Only png, jbg or jpeg are allowed!" }],
						});
					}
				} else {
					res.status(400).send({ errors: [{ msg: "Could Not Upload!" }] });
				}
			} else {
				res.status(400).send({ errors: [{ msg: "Please Select An Image !" }] });
			}
		} else {
			res.status(400).send({ errors: [{ msg: "Not Allowed!" }] });
		}
	} catch (error) {
		res
			.status(500)
			.send({ errors: [{ msg: "Server Error Could Not Upload!" }], error });
	}
};

exports.User_Update_Details = async (req, res) => {
	const { id, Name, Email } = req.body;
	const User = await UserSchema.findById(id);
	try {
		if (User) {
			if (User._id.equals(req.user._id)) {
				User.Name = Name || User.Name;
				User.Email = Email || User.Email;

				//JSONWEBTOKEN
				const payload = { id: User._id };
				const Token = jwt.sign(payload, process.env.SecretOrKey);

				const UpdatedUser = await User.save();
				res
					.status(200)
					.send({ success: [{ msg: "User Updated" }], UpdatedUser, Token });
			} else {
				res.status(400).send({ errors: [{ msg: "Not Allowed!" }] });
			}
		} else {
			res.status(400).send({ errors: [{ msg: "Could Not Update!" }] });
		}
	} catch (error) {
		res
			.status(500)
			.send({ errors: [{ msg: "Server Error Could Not Update!" }] });
	}
};

exports.User_Update_Password = async (req, res) => {
	const { id, OldPassword, NewPassword } = req.body;
	const User = await UserSchema.findById(id);
	try {
		if (User) {
			if (User._id.equals(req.user._id)) {
				const match = await bcrypt.compare(OldPassword, User.Password);
				if (!match) {
					return res
						.status(400)
						.send({ errors: [{ msg: "Wrong Password !" }] });
				} else {
					//BCRYPT
					const salt = 10;
					const hashedPassword = bcrypt.hashSync(NewPassword, salt);
					User.Password = hashedPassword || User.Password;

					const UpdatedUser = await User.save();
					res
						.status(200)
						.send({ success: [{ msg: "Password Updated" }], UpdatedUser });
				}
			} else {
				res.status(400).send({ errors: [{ msg: "Not Allowed!" }] });
			}
		} else {
			res.status(400).send({ errors: [{ msg: "Could Not Update!" }], error });
		}
	} catch (err) {
		res
			.status(500)
			.send({ errors: [{ msg: "Server Error Could Not Update!" }], err });
	}
};

exports.User_Delete = async (req, res) => {
	const { id, Password } = req.body.Data;
	const User = await UserSchema.findById(id);
	const Campgrounds = await CampgroundSchema.find({ "CreatedBy.Id": id });
	const Comments = await CommentSchema.find({ "Author.Id": id });
	try {
		if (req.user.Role === "Admin" || Password !== "") {
			if (User) {
				if (User._id.equals(req.user._id) || req.user.Role === "Admin") {
					if (Campgrounds && Campgrounds.Imgs) {
						//Remove Campground Imgs
						Campgrounds.forEach((Camp) => {
							Camp.Imgs.forEach((img) => {
								fs.unlinkSync(
									`client/public/Images/Campgrounds/${User._id}/${img}`
								);
							});
						});
						// Remove Campgrounds Folder If Empty
						if (
							fs.readdirSync(`client/public/Images/Campgrounds/${User._id}`)
								.length === 0
						) {
							fs.rmdirSync(`client/public/Images/Campgrounds/${User._id}`);
						}
						await CampgroundSchema.deleteMany({ CreatedBy: id });
					}
					if (Comments) {
						await CommentSchema.deleteMany({ "Author.Id": id });
					}
					if (!Password && req.user.Role === "User") {
						const match = await bcrypt.compare(Password, User.Password);
					}
					if (req.user.Role === "Admin" || match) {
						if (User.Img !== "") {
							fs.unlinkSync(`client/public/Images/Users/${User.Img}`); //DELETE OLD IMAGE
						}
						const deleted = await UserSchema.findByIdAndDelete(id);
						res.status(200).send({ success: [{ msg: "Deleted !" }], deleted });
					} else {
						return res
							.status(400)
							.send({ errors: [{ msg: "Wrong Password !" }] });
					}
				} else {
					res.status(400).send({ errors: [{ msg: "Not Allowed!" }] });
				}
			} else {
				res.status(400).send({ errors: [{ msg: "Could Not Delete!" }] });
			}
		} else {
			return res.status(400).send({ errors: [{ msg: "Password Is Empty!" }] });
		}
	} catch (err) {
		res
			.status(500)
			.send({ errors: [{ msg: "Server Error Could Not Delete!" }], err });
	}
};
