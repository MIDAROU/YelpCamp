//IMPORTS
const express = require("express");
const ConnectDB = require("./Config/Database");
const app = express();

const UsersRoutes = require("./Routes/Users");
const CommentsRoutes = require("./Routes/Comments");
const CampgroundsRoutes = require("./Routes/Campgrounds");

//PORT
const PORT = 5050;

//CONNECT TO DATABASE
ConnectDB();

//Routes middleware
app.use(express.json());

//Routes
app.use("/api/users", UsersRoutes);
app.use("/api/comments", CommentsRoutes);
app.use("/api/campgrounds", CampgroundsRoutes);

//SERVER LISTEN
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}/`);
});
