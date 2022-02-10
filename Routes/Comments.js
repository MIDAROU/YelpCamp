//IMPORTS
const express = require("express");
const Router = express.Router();
const { isAuth } = require("../middleware/AuthMiddleware");
const CommentsController = require("../Controllers/Comments");
const { CommentsValidator, validation } = require("../middleware/Validation");

//COMMENNT GET METHOD
Router.get("/list/:id", CommentsController.Comments_List);

//COMMENT ADD METHOD
Router.post(
	"/add",
	isAuth,
	CommentsValidator,
	validation,
	CommentsController.Comments_Add
);

//PUT COMMMENT METHOD
Router.put(
	"/update",
	isAuth,
	CommentsValidator,
	validation,
	CommentsController.Comments_Update
);

//DELETE COMMENT METHOD
Router.delete("/delete", isAuth, CommentsController.Comments_Delete);

module.exports = Router;
