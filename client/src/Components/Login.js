import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, login } from "../Redux/actions /actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Login() {
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [ToggleAlert, setToggleAlert] = useState(false);
	const Errors = useSelector((state) => state.UserReducer.Errors);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<>
			<motion.main
				id="LoginPage"
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 20 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
			>
				<div id="LoginCard">
					<div
						className={ToggleAlert && Errors ? "Alerts AlertsOpen" : "Alerts"}
					>
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
					<h2>LOGIN</h2>
					<form>
						<label htmlFor="email">Email</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={Email}
							type="email"
							name="email"
							id="LoginEmail"
							placeholder="Your Email..."
							required
						/>
						<label htmlFor="password">Password</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							value={Password}
							type="password"
							name="password"
							id="LoginPassword"
							placeholder="Your Password..."
							required
						/>
					</form>
					<p>
						Dont Have an Account?
						<Link
							style={{ color: "#000", textDecoration: "underline" }}
							to="/Register"
						>
							Register
						</Link>
					</p>
					<button
						onClick={(e) => {
							e.preventDefault();
							dispatch(login({ Email, Password }, navigate, setToggleAlert));
						}}
					>
						Login
					</button>
				</div>
			</motion.main>
		</>
	);
}

export default Login;
