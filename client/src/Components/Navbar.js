import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getcampgrounds, getCurrent, logout } from "../Redux/actions /actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faCaretDown,
	faCaretUp,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Navbar() {
	const dispatch = useDispatch();
	const location = useLocation();
	const User = useSelector((state) => state.UserReducer.User);
	const LoggedIn = useSelector((state) => state.UserReducer.LoggedIn);

	const [MenuToggle, setMenuToggle] = useState(false);
	const [NavMenuToggle, setNavMenuToggle] = useState(false);
	const [colorChange, setColorchange] = useState(false);

	const changeNavbarColor = () => {
		if (window.scrollY >= 5) {
			setColorchange(true);
		} else {
			setColorchange(false);
		}
	};

	window.addEventListener("scroll", changeNavbarColor);

	return (
		<motion.header
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: -20 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.5 }}
		>
			<nav
				className={
					colorChange || NavMenuToggle ? "Navbar ColorChange" : "Navbar"
				}
			>
				<h1 id="Logo">
					<Link to="/">YelpCamp</Link>
				</h1>
				<div id="NavMenu">
					<ul className={NavMenuToggle ? "Items Open" : "Items"}>
						<li>
							<Link
								to="/"
								className={location.pathname === "/" ? "Underline" : null}
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/Campgrounds"
								className={
									location.pathname === "/Campgrounds" ? "Underline" : null
								}
							>
								Campgrounds
							</Link>
						</li>
						{LoggedIn ? (
							<li>
								<Link
									to="/Add"
									className={location.pathname === "/Add" ? "Underline" : null}
								>
									Add Campground
								</Link>
							</li>
						) : null}
					</ul>
				</div>
				<div id="ProfileMenu">
					{!LoggedIn ? (
						<>
							<Link to="/Register" style={{ marginRight: "5px" }}>
								<button id="Register">Register</button>
							</Link>
							<Link to="/Login">
								<button id="Login">Login</button>
							</Link>
						</>
					) : (
						<>
							<div className={MenuToggle ? "Menu MenuOpen" : "Menu"}>
								<div className="TopMenu">
									<p>{User.Name || "------"}</p>
									<button onClick={() => setMenuToggle(!MenuToggle)}>
										{!MenuToggle ? (
											<FontAwesomeIcon icon={faCaretDown} />
										) : (
											<FontAwesomeIcon icon={faCaretUp} />
										)}
									</button>
								</div>
								<div className="BottomMenu">
									<Link
										onClick={() => {
											MenuToggle && setMenuToggle(false);
										}}
										to="/Profile"
										className={
											location.pathname === "/Profile"
												? "UnderlineMenu HoverUnderline"
												: null
										}
									>
										Profile
									</Link>
									<Link
										onClick={() => {
											MenuToggle && setMenuToggle(false);
										}}
										to="/Edit"
										className={
											location.pathname === "/Edit"
												? "UnderlineMenu HoverUnderline"
												: null
										}
									>
										Edit
									</Link>
									{User && User.Role === "Admin" ? (
										<Link
											onClick={() => {
												MenuToggle && setMenuToggle(false);
											}}
											to="/Admin"
											className={
												location.pathname === "/Admin"
													? "UnderlineMenu HoverUnderline"
													: null
											}
										>
											Admin
										</Link>
									) : null}
									<Link to="/" onClick={() => dispatch(logout())}>
										Logout
									</Link>
								</div>
							</div>
							<div
								id="UserImg"
								style={{
									background: `url(${
										!User.Img
											? `${process.env.PUBLIC_URL}/Images/user.png`
											: `${process.env.PUBLIC_URL}/Images/Users/${User.Img}`
									})`,
								}}
							></div>
						</>
					)}
					<div id="Btn">
						<button
							onClick={() => {
								MenuToggle && setMenuToggle(false);
								setNavMenuToggle(!NavMenuToggle);
							}}
						>
							<FontAwesomeIcon icon={NavMenuToggle ? faTimes : faBars} />
						</button>
					</div>
				</div>
			</nav>
		</motion.header>
	);
}

export default Navbar;
