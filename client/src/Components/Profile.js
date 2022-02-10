import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	deleteCampground,
	getUserCampgrounds,
} from "../Redux/actions /actions";

function Profile() {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.UserReducer.User);
	const Token = localStorage.getItem("Token");

	useEffect(() => {
		if (User && Token) {
			dispatch(getUserCampgrounds(User._id));
		}
	}, [Token, User, dispatch]);
	const UserCampgrounds = useSelector(
		(state) => state.CampReducer.UserCampgrounds
	);

	const [ToggleDelModal, setToggleDelModal] = useState(false);
	const [Campground, setCampground] = useState(null);
	return (
		<>
			<motion.main
				id="ProfileCard"
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 20 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
			>
				<div id="DeleteModal" className={ToggleDelModal ? "Open" : null}>
					<div id="ModalBody">
						<h1 id="ModalHeader">Delete</h1>
						<div id="ModalMain">
							Are You Sure You Want To Delete This Campground?
						</div>
						<div id="ModalFooter">
							<h2>This Action Is irreversible!!</h2>
							<button
								onClick={async (e) => {
									e.preventDefault();
									await dispatch(deleteCampground({ id: Campground }));
									dispatch(getUserCampgrounds(User._id));
									setToggleDelModal(false);
								}}
							>
								Delete
							</button>
							<button onClick={() => setToggleDelModal(false)}>Cancel</button>
						</div>
					</div>
				</div>
				<div id="Profile">
					<p id="Title">My Campgrounds :</p>
					<div id="Separator"></div>
					<div id="CampgroundsCard">
						{UserCampgrounds && UserCampgrounds.length > 0 ? (
							UserCampgrounds.map((camp) => {
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
													<button className="Editbtn">Edit</button>
													<button
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
						)}
					</div>
				</div>
			</motion.main>
		</>
	);
}

export default Profile;
