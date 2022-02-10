import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	AdmindeleteUser,
	admingetusers,
	deleteCampground,
	getcampgrounds,
	getUserCampgrounds,
} from "../Redux/actions /actions";

function Admin() {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.UserReducer.User);
	const Users = useSelector((state) => state.UserReducer.Users);
	const Campgrounds = useSelector((state) => state.CampReducer.Campgrounds);

	useEffect(() => {
		if (User.Role === "Admin") {
			dispatch(getcampgrounds());
			dispatch(admingetusers());
		}
	}, []);

	const [ToggleUsers, setToggleUsers] = useState(false);
	const [ToggleCampgrounds, setToggleCampgrounds] = useState(true);
	const [ToggleDelModal, setToggleDelModal] = useState(false);
	const [ToggleDelUserModal, setToggleDelUserModal] = useState(false);
	const [UserToDel, setUserToDel] = useState(null);
	const [Campground, setCampground] = useState(null);
	return (
		<>
			<motion.main
				id="AdminCard"
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 20 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
			>
				<div
					id="DeleteModal"
					className={ToggleDelModal || ToggleDelUserModal ? "Open" : null}
				>
					<div id="ModalBody">
						<h1 id="ModalHeader">Delete</h1>
						<div id="ModalMain">
							Are You Sure You Want To Delete This{" "}
							{ToggleDelUserModal ? "User" : "Campgreound"}?
						</div>
						<div id="ModalFooter">
							<h2>This Action Is irreversible!!</h2>
							<button
								onClick={(e) => {
									e.preventDefault();
									if (ToggleDelUserModal) {
										dispatch(AdmindeleteUser({ id: UserToDel }));
										dispatch(admingetusers());
									} else {
										dispatch(deleteCampground({ id: Campground }));
										dispatch(getUserCampgrounds(User._id));
									}
									setToggleDelModal(false);
								}}
							>
								Delete
							</button>
							<button
								onClick={() => {
									setToggleDelModal(false);
									setToggleDelUserModal(false);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
				<div id="Admin">
					<div id="Title">
						<p>Manage {ToggleUsers ? "Users" : "Campgrounds"} :</p>
						<div id="btns">
							<button
								style={{ marginRight: "10px" }}
								onClick={(e) => {
									e.preventDefault();
									setToggleCampgrounds(false);
									setToggleUsers(true);
								}}
							>
								Users
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									setToggleCampgrounds(true);
									setToggleUsers(false);
								}}
							>
								Campgrounds
							</button>
						</div>
					</div>
					<div id="Separator"></div>
					<div id="CampgroundsCard">
						{ToggleCampgrounds ? (
							Campgrounds && Campgrounds.length > 0 ? (
								Campgrounds.map((camp) => {
									return (
										<div key={camp._id} className="CampCard">
											<Link
												to={`/Campground/${camp._id}`}
												style={{ color: "#000" }}
											>
												<img
													src={`${process.env.PUBLIC_URL}/Images/Campgrounds/${camp.CreatedBy.Id}/${camp.Imgs[0]}`}
													alt="Img"
												/>
												<div className="Details">
													<div className="Left">
														<p>{camp.Name}</p>
														<p>
															<FontAwesomeIcon icon={faMapMarkedAlt} />
															{camp.Location.Name}
														</p>
													</div>
													<div className="Right">
														<p>{camp.Price}$</p>
														<button
															style={{ background: "#e23939" }}
															onClick={(e) => {
																e.preventDefault();
																setCampground(camp._id);
																setToggleDelModal(true);
															}}
														>
															Delete
														</button>
													</div>
												</div>
											</Link>
										</div>
									);
								})
							) : (
								<div
									style={{
										margin: "auto",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<p style={{ margin: "auto" }}>No Campgrounds?</p>
									<Link to="/Add" style={{ width: "100%" }}>
										<button style={{ width: "100%" }} className="Addbtn">
											Add
										</button>
									</Link>
								</div>
							)
						) : ToggleUsers && Users ? (
							Users.map((user) => {
								return (
									<div key={user._id} className="UserCard">
										<div className="Details">
											<div className="Left">
												<img
													src={
														!user.Img
															? `${process.env.PUBLIC_URL}/Images/user.png`
															: `${process.env.PUBLIC_URL}/Images/Users/${user.Img}`
													}
													alt="Img"
												/>
												<p>{user.Name}</p>
											</div>
											<div className="Right">
												<p
													style={{
														width: "100%",
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "ellipsis",
														textAlign: "end",
													}}
												>
													ID:{user._id}$
												</p>
											</div>
										</div>
										<p>Email: {user.Email}</p>
										<p>Campgrounds: {user.Campgrounds.length}</p>

										<button
											onClick={(e) => {
												e.preventDefault();
												setUserToDel(user._id);
												setToggleDelUserModal(true);
											}}
										>
											Delete
										</button>
									</div>
								);
							})
						) : (
							<div
								style={{
									margin: "auto",
									display: "flex",
									flexDirection: "column",
								}}
							>
								<p style={{ margin: "auto" }}>No Campgrounds?</p>
								<Link to="/Add" style={{ width: "100%" }}>
									<button style={{ width: "100%" }} className="Addbtn">
										Add
									</button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</motion.main>
		</>
	);
}

export default Admin;
