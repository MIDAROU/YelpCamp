//IMPORTS
const express = require("express");
const Router = express.Router();
const {
	RegisterValidator,
	validation,
	LoginValidator,
	ProfileValidator,
	PasswordValidator,
} = require("../middleware/Validation");
const { isAuth } = require("../middleware/AuthMiddleware");
const { upload } = require("../middleware/Multer");

const UsersController = require("../Controllers/Users");

//POST USER SIGNUP METHOD
Router.post(
	"/signUp",
	RegisterValidator,
	validation,
	UsersController.User_Sign_Up
);

//POST USER SIGNIN METHOD
Router.post(
	"/signIn",
	LoginValidator,
	validation,
	UsersController.User_Sign_In
);

//POST MULTER IMG UPLOAD
Router.post(
	"/upload",
	isAuth,
	upload.single("Img"),
	UsersController.User_Upload
);

//GET CURRENT USER METHOD
Router.get("/current", isAuth, (req, res) => {
	res.send(req.user);
});

//POST BECOME ADMIN METHOD
Router.post("/admin", isAuth, UsersController.Admin);

//ADMIN LIST USERS
Router.get("/admin/getusers", isAuth, UsersController.Admin_Get_Users);

//PUT USER METHODS
Router.put(
	"/update",
	isAuth,
	ProfileValidator,
	validation,
	UsersController.User_Update_Details
);
Router.put(
	"/updatePassword",
	isAuth,
	PasswordValidator,
	validation,
	UsersController.User_Update_Password
);

//DELETE USER METHOD
Router.delete("/delete", isAuth, UsersController.User_Delete);

module.exports = Router;
