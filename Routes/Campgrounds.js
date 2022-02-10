//IMPORTS
const express = require("express");
const Router = express.Router();
const { isAuth } = require("../middleware/AuthMiddleware");
const { uploadCamps } = require("../middleware/Multer");

const CampgroundsController = require("../Controllers/Campgrounds");
const {
	CampgroundsValidator,
	validation,
} = require("../middleware/Validation");

//GET CAMPGROUNDS METHOD
Router.get("/list", CampgroundsController.Campgrounds_List);

//GET ONE CAMPGROUND METHOD
Router.get("/list/:id", CampgroundsController.Campgrounds_List_One);

//GET USERS CAMPGROUND METHOD
Router.get("/userslist/:id", CampgroundsController.Campgrounds_List_Users);

//GET USER CAMPGROUND METHOD
Router.get(
	"/userlist/:id",
	isAuth,
	CampgroundsController.Campgrounds_List_User
);

//POST CAMPGROUNDS METHOD
Router.post(
	"/add",
	isAuth,
	uploadCamps.array("Imgs"),
	CampgroundsValidator,
	validation,
	CampgroundsController.Campgrounds_Add
);

//UPDATE CAMPGROUND METHOD
Router.put(
	"/update",
	isAuth,
	CampgroundsValidator,
	validation,
	uploadCamps.array("Imgs"),
	CampgroundsController.Campgrounds_Update
);

//DELETE CAMPGROUND METHOD
Router.delete("/delete", isAuth, CampgroundsController.Campgrounds_Delete);

module.exports = Router;
