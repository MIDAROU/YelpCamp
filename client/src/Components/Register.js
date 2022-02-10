import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, register } from "../Redux/actions /actions";

function Register() {
	const [Name, setName] = useState("");
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [ToggleAlert, setToggleAlert] = useState(false);
	const Errors = useSelector((state) => state.UserReducer.Errors);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<>
			<motion.main
				id="RegisterPage"
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 20 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
			>
				<div id="RegisterCard">
					<div className={ToggleAlert ? "Alerts AlertsOpen" : "Alerts"}>
						{Errors ? <p>{Errors[0].msg}</p> : null}
						<FontAwesomeIcon
							onClick={() => {
								setToggleAlert(!ToggleAlert);
								setTimeout(() => {
									dispatch(clearErrors());
								}, 500);
							}}
							icon={faTimes}
						/>
					</div>
					<h2>REGISTER</h2>
					<form>
						<label htmlFor="name">Name</label>
						<input
							onChange={(e) => setName(e.target.value)}
							value={Name}
							type="text"
							name="name"
							id="RegisterName"
							placeholder="Your Name..."
							required
						/>
						<label htmlFor="email">Email</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={Email}
							type="email"
							name="email"
							id="RegisterEmail"
							placeholder="Your Email..."
							required
						/>
						<label htmlFor="password">Password</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							value={Password}
							type="password"
							name="password"
							id="RegisterPassword"
							placeholder="Your Password..."
							required
						/>
					</form>
					<p style={{ padding: "12px 0" }}>
						Have an Account?
						<Link
							style={{
								color: "#000",
								textDecoration: "underline",
							}}
							to="/Login"
						>
							Login
						</Link>
					</p>
					<button
						onClick={(e) => {
							e.preventDefault();
							dispatch(
								register({ Name, Email, Password }, navigate, setToggleAlert)
							);
						}}
					>
						Register
					</button>
				</div>
			</motion.main>
		</>
	);
}

export default Register;
