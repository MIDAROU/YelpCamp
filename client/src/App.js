import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import AddCampground from "./Components/AddCampground";
import Admin from "./Components/Admin";
import Campground from "./Components/Campground";
import Campgrounds from "./Components/Campgrounds";
import Edit from "./Components/Edit";
import EditCamp from "./Components/EditCamp";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Page404 from "./Components/Page404";
import PrivateRoutes, {
	PrivateRoutesAdmin,
	PrivateRoutesLoggedOut,
} from "./Components/PrivateRoutes";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import UserCampgrounds from "./Components/UserCampgrounds";
import "./Css/App.css";

function App() {
	const location = useLocation();
	return (
		<>
			<div
				className={
					location.pathname.slice(1) === ""
						? "Home"
						: location.pathname === "/Campgrounds"
						? "Campgrounds"
						: location.pathname.startsWith("/Campground")
						? "Campground"
						: location.pathname.startsWith("/EditCamp")
						? "EditCamp"
						: location.pathname.startsWith("/User")
						? "User"
						: location.pathname.slice(1)
				}
			>
				<Navbar />
				<AnimatePresence exitBeforeEnter>
					<Routes key={location.pathname}>
						<Route path="/" element={<Home />} />
						<Route path="/Campgrounds" element={<Campgrounds />} />
						<Route path="/Add" element={<AddCampground />} />
						<Route path="/Campground/:id" element={<Campground />} />
						<Route path="/User/:name/:id" element={<UserCampgrounds />} />
						<Route
							path="/EditCamp/:id"
							element={
								<PrivateRoutes>
									<EditCamp />
								</PrivateRoutes>
							}
						/>
						<Route
							path="/Profile"
							element={
								<PrivateRoutes>
									<Profile />
								</PrivateRoutes>
							}
						/>
						<Route
							path="/Admin"
							element={
								<PrivateRoutesAdmin>
									<Admin />
								</PrivateRoutesAdmin>
							}
						/>
						<Route
							path="/Edit"
							element={
								<PrivateRoutes>
									<Edit />
								</PrivateRoutes>
							}
						/>
						<Route
							path="/Login"
							element={
								<PrivateRoutesLoggedOut>
									<Login />
								</PrivateRoutesLoggedOut>
							}
						/>
						<Route
							path="/Register"
							element={
								<PrivateRoutesLoggedOut>
									<Register />
								</PrivateRoutesLoggedOut>
							}
						/>
						<Route path="*" element={<Page404 />} />
					</Routes>
				</AnimatePresence>
				<Footer />
			</div>
		</>
	);
}

export default App;
