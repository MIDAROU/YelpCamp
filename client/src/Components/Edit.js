import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	admin,
	clearErrors,
	clearSuccess,
	deleteUser,
	update,
	updatePassword,
	uploadUserImg,
} from "../Redux/actions /actions";

function Edit() {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.UserReducer.User);
	const Errors = useSelector((state) => state.UserReducer.Errors);
	const Success = useSelector((state) => state.UserReducer.Success);
	const navigate = useNavigate();

	useEffect(() => {
		if (User) {
			setName(User.Name);
			setEmail(User.Email);
		}
	}, [User]);

	const [Name, setName] = useState("");
	const [Email, setEmail] = useState("");
	const [Img, setImg] = useState(null);
	const [OldPassword, setOldPassword] = useState("");
	const [NewPassword, setNewPassword] = useState("");
	const [ModalPassword, setModalPassword] = useState("");
	const [ModalKey, setModalKey] = useState("");
	const [ToggleAlert, setToggleAlert] = useState(false);
	const [ToggleSuccess, setToggleSuccess] = useState(false);
	const [ToggleDelModal, setToggleDelModal] = useState(false);
	const [ToggleAdminModal, setToggleAdminModal] = useState(false);

	return (
		<>
			<motion.main
				id="EditCard"
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 20 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
			>
				<div id="DeleteModal" className={ToggleDelModal ? "Open" : null}>
					<div id="ModalBody">
						<h1 id="ModalHeader">
							To Delete Your Account Type In Your Password Below
						</h1>
						<div id="ModalMain">
							<label htmlFor="Password">Password :</label>
							<input
								onChange={(e) => {
									e.preventDefault();
									setModalPassword(e.target.value);
								}}
								value={ModalPassword}
								type="password"
								name="Password"
								id=""
								placeholder="Your Password..."
							/>
						</div>
						<div id="ModalFooter">
							<h2>This Will Delete All Of Your Campgrounds!!</h2>
							<button
								onClick={() => {
									dispatch(
										deleteUser(
											{ id: User._id, Password: ModalPassword },
											navigate,
											setToggleAlert,
											setToggleSuccess
										)
									);
								}}
							>
								Delete
							</button>
							<button onClick={() => setToggleDelModal(false)}>Cancel</button>
						</div>
					</div>
				</div>
				<div id="AdminModal" className={ToggleAdminModal ? "Open" : null}>
					<div id="ModalBody">
						<h1 id="ModalHeader">This Page Is Only For Admins!</h1>
						<div id="ModalMain">
							<label htmlFor="Password">Key :</label>
							<input
								onChange={(e) => {
									e.preventDefault();
									setModalKey(e.target.value);
								}}
								value={ModalKey}
								type="password"
								name="Password"
								id=""
								placeholder="Your Password..."
							/>
						</div>
						<div id="ModalFooter">
							<button
								onClick={() => {
									dispatch(admin({ Key: ModalKey }));
									setToggleAlert(true);
									setToggleSuccess(true);
								}}
							>
								Save
							</button>
							<button onClick={() => setToggleAdminModal(false)}>Cancel</button>
						</div>
					</div>
				</div>
				<div id="Edit">
					<div
						className={
							ToggleSuccess && Success ? "Success SuccessOpen" : "Success"
						}
					>
						{Success ? <p>{Success[0].msg}</p> : null}
						<FontAwesomeIcon
							onClick={() => {
								setToggleSuccess(!ToggleSuccess);
								setTimeout(() => {
									dispatch(clearSuccess());
								}, 500);
							}}
							icon={faTimes}
						/>
					</div>
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
					<div id="Details">
						<div id="ImgCard">
							<div
								id="Img"
								style={{
									background: `url(${
										Img
											? URL.createObjectURL(Img)
											: User.Img
											? `Images/Users/${User.Img}`
											: "Images/user.png"
									})`,
								}}
							></div>
							<div id="AddImg">
								<p>Change Image :</p>
								<input
									accept="image/*"
									type="file"
									alt="Img"
									onChange={(e) => setImg(e.target.files[0])}
								/>
								<button
									id="Uploadbtn"
									onClick={(e) => {
										e.preventDefault();
										let data = new FormData();
										data.append("id", User._id);
										data.append("Img", Img);
										dispatch(uploadUserImg(data));
										setToggleAlert(true);
										setToggleSuccess(true);
									}}
								>
									Change
								</button>
							</div>
						</div>
						<form id="Form">
							<div>
								<label htmlFor="Name">Name : </label>
								<input
									type="text"
									name="Name"
									id="Name"
									onChange={(e) => setName(e.target.value)}
									defaultValue={User.Name}
									placeholder="Your Name..."
								/>
							</div>
							<div>
								<label htmlFor="Email">Email : </label>
								<input
									type="email"
									name="Email"
									id="Email"
									onChange={(e) => setEmail(e.target.value)}
									defaultValue={User.Email}
									placeholder="Your Email..."
								/>
							</div>
						</form>
						<button
							onClick={(e) => {
								e.preventDefault();
								dispatch(
									update(
										{
											id: User._id,
											Name: Name,
											Email: Email,
										},
										setToggleAlert,
										setToggleSuccess
									)
								);
							}}
						>
							Save
						</button>
						<button id="Delete" onClick={() => setToggleDelModal(true)}>
							Delete Account
						</button>
						<button onClick={() => setToggleAdminModal(true)} id="AdminBtn">
							Admin
						</button>
					</div>
					<div id="Separator"></div>
					<div id="Password">
						<p>Change Password :</p>
						<form id="Form">
							<div>
								<label htmlFor="OldPassword">Old Password :</label>
								<input
									type="password"
									name="OldPassword"
									id="OldPassword"
									onChange={(e) => setOldPassword(e.target.value)}
									value={OldPassword}
									placeholder="Your Old Password..."
								/>
							</div>
							<div>
								<label htmlFor="NewPassword">New Password :</label>
								<input
									type="password"
									name="NewPassword"
									id="NewPassword"
									onChange={(e) => setNewPassword(e.target.value)}
									value={NewPassword}
									placeholder="Your New Password..."
								/>
							</div>
						</form>
						<button
							onClick={(e) => {
								e.preventDefault();
								dispatch(
									updatePassword(
										{ id: User._id, OldPassword, NewPassword },
										setToggleAlert,
										setToggleSuccess
									)
								);
							}}
						>
							Save
						</button>
					</div>
				</div>
			</motion.main>
		</>
	);
}

export default Edit;
