//IMPORTS
const CampgroundSchema = require("../Models/CampgroundSchema");
const UserSchema = require("../Models/UserSchema");
const CommentSchema = require("../Models/CommentSchema");

exports.Comments_List = async (req, res) => {
	const { id } = req.params;
	try {
		const Comments = await CommentSchema.find({ Campground: id });
		res.status(200).send({ msg: "Comments", Comments });
	} catch (err) {
		res.status(500).send({
			errors: [{ msg: "Could Not List!" }],
			err,
		});
	}
};

exports.Comments_Add = async (req, res) => {
	const { Body, Rating, Author, CampgroundId } = req.body;
	const Found = await CommentSchema.findOne({
		Body: Body,
		"Author.Name": Author.Name,
	});
	try {
		if (Found) {
			return res
				.status(400)
				.send({ errors: [{ msg: "Comment Already Exists!" }] });
		}
		const Campground = await CampgroundSchema.findById(CampgroundId);
		const User = await UserSchema.findById(Author.Id);

		const newComment = new CommentSchema({
			Body,
			Rating,
			Author,
			Campground: Campground._id,
		});
		Campground.Comments = [...Campground.Comments, newComment._id];
		User.Comments = [...User.Comments, newComment._id];

		await newComment.save();
		await Campground.save();
		await User.save();
		res.status(200).send({
			success: [{ msg: "Comment Added Succesfully !" }],
			newComment,
		});
	} catch (err) {
		res.status(500).send({
			errors: [{ msg: "Could Not Add!" }],
			err,
		});
	}
};

exports.Comments_Update = async (req, res) => {
	const { id, Body, Rating } = req.body;
	const Comment = await CommentSchema.findById(id);
	try {
		if (Comment) {
			if (Comment.Author.Id.equals(req.user._id)) {
				Comment.Body = Body;
				Comment.Rating = Rating;

				const UpdatedComment = await Comment.save();
				res
					.status(200)
					.send({ success: [{ msg: "Comment Updated" }], UpdatedComment });
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

exports.Comments_Delete = async (req, res) => {
	const { id } = req.body.Data;
	const Comment = await CommentSchema.findById(id);
	const Campground = await CampgroundSchema.findById(Comment.Campground);
	const User = await UserSchema.findById(Comment.Author.Id);
	try {
		if (Comment) {
			if (Comment.Author.Id.equals(req.user._id)) {
				if (Campground) {
					//REMOVE COMMENT FROM CAMGROUND
					await CampgroundSchema.findByIdAndUpdate(Comment.Campground, {
						$pull: { Comments: id },
					});
				}
				if (User) {
					await UserSchema.findByIdAndUpdate(Comment.Author.Id, {
						$pull: { Comments: id },
					});
				}
				const deleted = await CommentSchema.findByIdAndDelete(id);
				res.status(200).send({ success: [{ msg: "Deleted !" }], deleted });
			} else {
				res.status(400).send({ errors: [{ msg: "Not Allowed!" }] });
			}
		} else {
			res.status(400).send({ errors: [{ msg: "Could Not Delete!" }] });
		}
	} catch (err) {
		res
			.status(500)
			.send({ errors: [{ msg: "Server Error Could Not Delete!" }], err });
	}
};
