//IMPORTS
const fs = require("fs");
const CampgroundSchema = require("../Models/CampgroundSchema");
const UserSchema = require("../Models/UserSchema");
const CommentSchema = require("../Models/CommentSchema");

exports.Campgrounds_List = async (req, res) => {
	try {
		const Campgrounds = await CampgroundSchema.find();
		res.status(200);
		res.send({ msg: "Campgrounds", Campgrounds });
	} catch (err) {
		res.status(500).send({ errors: [{ msg: "Could Not List!" }] });
	}
};

exports.Campgrounds_List_One = async (req, res) => {
	try {
		const { id } = req.params;
		const Campground = await CampgroundSchema.findById(id);
		res.status(200);
		res.send({ msg: "Campground :", Campground });
	} catch (err) {
		res.status(500).send({ errors: [{ msg: "Could Not List!" }] });
	}
};

exports.Campgrounds_List_Users = async (req, res) => {
	try {
		const { id } = req.params;
		const Campgrounds = await CampgroundSchema.find({ "CreatedBy.Id": id });
		res.status(200);
		res.send({ msg: "User Campgrounds :", Campgrounds });
	} catch (err) {
		res.status(500).send({ errors: [{ msg: "Could Not List!" }] });
	}
};

exports.Campgrounds_List_User = async (req, res) => {
	const Campgrounds = await CampgroundSchema.find({
		"CreatedBy.Id": req.user._id,
	});
	try {
		if (Campgrounds[0].CreatedBy.Id.equals(req.user._id)) {
			res.status(200);
			res.send({ msg: "User Campgrounds :", Campgrounds });
		}
	} catch (err) {
		res.status(500).send({ errors: [{ msg: "Could Not List!" }] });
	}
};

exports.Campgrounds_Add = async (req, res) => {
	const { Name, Location } = req.body;
	const Imgs = req.files;
	const NewLocation = JSON.parse(Location);
	const Found = await CampgroundSchema.findOne({
		Name: Name,
		Location: NewLocation,
	});
	try {
		if (Found) {
			//Remove Imgs If Fail
			Imgs.forEach((img) => {
				fs.unlinkSync(
					`client/public/Images/Campgrounds/${req.user._id}/${img.filename}`
				);
			});
			return res
				.status(400)
				.send({ errors: [{ msg: "Campground Already Exists!" }] });
		}
		if (!NewLocation) {
			//Remove Imgs If Fail
			Imgs.forEach((img) => {
				fs.unlinkSync(
					`client/public/Images/Campgrounds/${req.user._id}/${img.filename}`
				);
			});
			return res.status(400).send({ errors: [{ msg: "Location Is Empty!" }] });
		}
		if (!Imgs) {
			return res
				.status(400)
				.send({ errors: [{ msg: "Please Select Images!" }] });
		}
		if (
			Imgs.mimetype === "image/png" ||
			Imgs.mimetype === "image/jpg" ||
			Imgs.mimetype === "image/jpeg" ||
			Imgs.mimetype === "image/gif"
		) {
			//Remove Imgs If Fail
			Imgs.forEach((img) => {
				fs.unlinkSync(
					`client/public/Images/Campgrounds/${req.user._id}/${img.filename}`
				);
			});
			res
				.status(400)
				.send({ errors: [{ msg: "Only png, jbg or jpeg are allowed!" }] });
		}
		const NewImgs = [];

		for (var i = 0; i < Imgs.length; i++) {
			NewImgs.push(Imgs[i].filename);
		}
		const NewCampground = new CampgroundSchema({
			...req.body,
			Location: NewLocation,
			Imgs: NewImgs,
			CreatedBy: {
				Name: req.user.Name,
				Img: req.user.Img || "",
				Id: req.user._id,
			},
		});

		const User = await UserSchema.findOne({ _id: req.user._id });

		User.Campgrounds = [...User.Campgrounds, NewCampground._id];
		await User.save();
		await NewCampground.save();

		res.status(200).send({
			success: [{ msg: "Campground Added Succesfully !" }, NewCampground],
			NewCampground,
		});
	} catch (err) {
		//Remove Imgs If Fail
		Imgs.forEach((img) => {
			fs.unlinkSync(
				`client/public/Images/Campgrounds/${req.user._id}/${img.filename}`
			);
		});
		res.status(500).send({
			errors: [{ msg: "Could Not Add!" }],
			err,
		});
	}
};

exports.Campgrounds_Update = async (req, res) => {
	const { id, Name, Price, number, Description, Location } = req.body;
	const Imgs = req.files;
	const NewLocation = JSON.parse(Location);
	const Campground = await CampgroundSchema.findById(id);
	try {
		if (Campground) {
			if (!NewLocation) {
				return res
					.status(400)
					.send({ errors: [{ msg: "Location Is Empty!" }] });
			}
			if (!Imgs) {
				return res
					.status(400)
					.send({ errors: [{ msg: "Please Select Images!" }] });
			}
			if (
				Imgs.mimetype === "image/png" ||
				Imgs.mimetype === "image/jpg" ||
				Imgs.mimetype === "image/jpeg" ||
				Imgs.mimetype === "image/gif"
			) {
				res
					.status(400)
					.send({ errors: [{ msg: "Only png, jbg or jpeg are allowed!" }] });
			}
			if (Campground.CreatedBy.Id.equals(req.user._id)) {
				if (Imgs.length > 0) {
					var NewImgs = [];
					for (var i = 0; i < Imgs.length; i++) {
						NewImgs.push(Imgs[i].filename);
					}

					//Remove Campground Imgs
					Campground.Imgs.forEach((img) => {
						fs.unlinkSync(
							`client/public/Images/Campgrounds/${Campground.CreatedBy.Id}/${img}`
						);
					});
					Campground.Imgs = [];
				}
				Campground.Name = Name || Campground.Name;
				Campground.Price = Price || Campground.Price;
				Campground.number = number || Campground.number;
				Campground.Description = Description || Campground.Description;
				Campground.Location = NewLocation || Campground.Location;
				Campground.Imgs = NewImgs || Campground.Imgs;

				Campground.save();
				res
					.status(200)
					.send({ success: [{ msg: "Campground Updated" }], Campground });
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

exports.Campgrounds_Delete = async (req, res) => {
	const { id } = req.body.Data;
	const Campground = await CampgroundSchema.findById(id);
	const Comments = await CommentSchema.find({ Campground: id });
	try {
		if (Campground) {
			if (
				Campground.CreatedBy.Id.equals(req.user._id) ||
				req.user.Role === "Admin"
			) {
				await UserSchema.findByIdAndUpdate(Campground.CreatedBy.Id, {
					$pull: { Campgrounds: id },
				});
				//Remove Campground Imgs
				if (Campground.Imgs.length > 0) {
					Campground.Imgs.forEach((img) => {
						fs.unlinkSync(
							`client/public/Images/Campgrounds/${Campground.CreatedBy.Id}/${img}`
						);
					});
				}
				//Remove Campgrounds Folder If Empty
				if (
					fs.readdirSync(
						`client/public/Images/Campgrounds/${Campground.CreatedBy.Id}`
					).length === 0
				) {
					fs.rmdirSync(
						`client/public/Images/Campgrounds/${Campground.CreatedBy.Id}`
					);
				}
				if (Comments.length > 0) {
					const Ids = [];
					for (var i = 0; i < Comments.length; i++) {
						Ids.push(Comments[i]._id);
					}
					const User = await UserSchema.findById(Comments[0].Author.Id);
					if (User) {
						await UserSchema.findByIdAndUpdate(Comments[0].Author.Id, {
							$pull: { Comments: { $in: Ids } },
						});
					}
				}
				const deleted = await CampgroundSchema.deleteOne({ _id: id });
				await CommentSchema.deleteMany({ Campground: id });
				res.status(200).send({ success: [{ msg: "Deleted !" }], deleted });
			} else {
				res.status(400).send({ errors: [{ msg: "Could Not Delete!" }] });
			}
		} else {
			res.status(400).send({ errors: [{ msg: "Could Not Delete!" }] });
		}
	} catch (err) {
		res.status(500).send({
			errors: [{ msg: "Could Not Delete!" }],
			err,
		});
	}
};
