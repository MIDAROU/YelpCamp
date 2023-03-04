//IMPORTS
const express = require("express");
const ConnectDB = require("./Config/Database");
const app = express();

const UsersRoutes = require("./Routes/Users");
const CommentsRoutes = require("./Routes/Comments");
const CampgroundsRoutes = require("./Routes/Campgrounds");
const path = require("path");

//PORT
const PORT = process.env.PORT || 5050;

//CONNECT TO DATABASE
ConnectDB();

//Routes middleware
app.use(express.json());

//Routes
app.use("/api/users", UsersRoutes);
app.use("/api/comments", CommentsRoutes);
app.use("/api/campgrounds", CampgroundsRoutes);

//SERVING THE FRONTEND
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
	res.sendFile(
		path.join(__dirname, "./client/build/index.html"),
		function (err) {
			res.status(500).send(err);
		}
	);
});

//SERVER LISTEN
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}/`);
});
