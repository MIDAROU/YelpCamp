//IMPORTS
const jwt = require("jsonwebtoken");
const UserSchema = require("../Models/UserSchema");

//JSONWEBTOKEN

exports.isAuth = async (req, res, next) => {
	const token = req.header("Authorized");
	try {
		if (!token) {
			return res.status(400).send({ errors: [{ msg: "Not Authorized" }] });
		}

		const decoded = jwt.verify(token, process.env.SecretOrKey);
		const CurrentUser = await UserSchema.findById(decoded.id);

		req.user = CurrentUser;
		next();
	} catch (error) {
		res.status(500).send({ errors: [{ msg: "Server Error" }] });
	}
};
