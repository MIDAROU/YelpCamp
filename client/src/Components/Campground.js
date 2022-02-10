import {
	faArrowLeft,
	faArrowRight,
	faStar,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMapGl, { Marker } from "react-map-gl";
import { motion } from "framer-motion";
import ReactStars from "react-rating-stars-component";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addComment,
	clearErrors,
	clearSuccess,
	deletecomment,
	getcampground,
	getCurrent,
	updatecomment,
} from "../Redux/actions /actions";
import { Link, useLocation } from "react-router-dom";

function Campground() {
	const dispatch = useDispatch();
	const location = useLocation();
	const Campground = useSelector((state) => state.CampReducer.Campground);
	const Comments = useSelector((state) => state.CommentReducer.Comments);
	const Errors = useSelector((state) => state.UserReducer.Errors);
	const Success = useSelector((state) => state.UserReducer.Success);
	const User = useSelector((state) => state.UserReducer.User);

	useEffect(() => {
		dispatch(getCurrent());
		dispatch(getcampground(location.pathname.slice(12)));
	}, [dispatch, location.pathname]);

	const [ToggleAlert, setToggleAlert] = useState(false);
	const [ToggleSuccess, setToggleSuccess] = useState(false);

	const [CommentBody, setCommentBody] = useState("");
	const [CommentRating, setCommentRating] = useState(0);
	const [ToggleComment, setToggleComment] = useState(false);
	const [ToggleEdit, setToggleEdit] = useState(false);
	const [CurrentEdit, setCurrentEdit] = useState(null);
	const [EditBody, setEditBody] = useState("");
	const [EditRating, setEditRating] = useState(0);
	const [Current, setCurrent] = useState(0);
	const [ViewPorts, setViewPorts] = useState({
		width: "100%",
		height: "50rem",
		zoom: 7,
	});

	useEffect(() => {
		setViewPorts({ ...ViewPorts, width: "100%", height: "50rem" });
	}, [ViewPorts.width]);

	return (
		<motion.main
			id="CampgroundCard"
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 20 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
		>
			<div id="Campground">
				<div id="Info">
					<div id="ImgsCard">
						<div id="ImgCarrousel" aria-label="Your Images">
							{Campground && Campground.Imgs ? (
								<>
									<button
										className="CarrouselButton Next"
										onClick={() => {
											setCurrent(
												Current === Campground.Imgs.length - 1 ? 0 : Current + 1
											);
										}}
									>
										<FontAwesomeIcon icon={faArrowRight} />
									</button>
									<button
										className="CarrouselButton Prev"
										onClick={() => {
											setCurrent(
												Current === 0 ? Campground.Imgs.length - 1 : Current - 1
											);
										}}
									>
										<FontAwesomeIcon icon={faArrowLeft} />
									</button>
								</>
							) : null}
							<ul>
								{Campground && Campground.Imgs ? (
									Campground.Imgs.map((Img, index) => {
										return (
											<li
												className={index === Current ? "Slide Active" : "Slide"}
												key={index}
												data-active
											>
												<img
													src={`${process.env.PUBLIC_URL}/Images/Campgrounds/${Campground.CreatedBy.Id}/${Img}`}
													alt="Img"
												/>
											</li>
										);
									})
								) : (
									<li className="Slide Active">
										<img
											src={`${process.env.PUBLIC_URL}/Images/ImagesPlaceholder.jpg`}
											alt="Imgs PlaceHolder"
										/>
									</li>
								)}
							</ul>
						</div>
					</div>
					<div id="MapCard">
						{Campground && Campground.Location ? (
							<ReactMapGl
								id="Map"
								style={{
									borderRadius: "15px",
									overflow: "hidden",
									width: "100%",
								}}
								{...ViewPorts}
								latitude={ViewPorts.latitude || Campground.Location.Latitude}
								longitude={ViewPorts.longitude || Campground.Location.Longitude}
								mapboxApiAccessToken={process.env.REACT_APP_YELPCAMP_TOKEN}
								onViewportChange={(viewport) => {
									setViewPorts(viewport);
								}}
							>
								<Marker
									longitude={Campground.Location.Longitude}
									latitude={Campground.Location.Latitude}
									offsetTop={(-ViewPorts.zoom * 5) / 2}
								>
									<img
										src={`${process.env.PUBLIC_URL}/Images/MapMarker.png`}
										alt="MapMarker"
										width={ViewPorts.zoom * 5}
										height={ViewPorts.zoom * 5}
									/>
								</Marker>
							</ReactMapGl>
						) : null}
					</div>
				</div>
				<div id="Separator"></div>
				<div id="BottomMenu">
					{Campground && (
						<>
							<div id="Details">
								<div style={{ width: "100%", maxWidth: "100%" }}>
									<div id="TopTitle">
										<h3>Details :</h3>
										{User && Campground.CreatedBy.Id === User._id ? (
											<Link
												style={{ color: "#000" }}
												to={`/EditCamp/${Campground._id}`}
											>
												<button>Edit</button>
											</Link>
										) : null}
									</div>
									<div id="Items">
										<p>
											<b>Name :</b>
											{Campground.Name}
										</p>
										<p>
											<b>Price :</b>
											{Campground.Price}$/Night
										</p>
										<p>
											<b>Number :</b>
											{Campground.number}
										</p>
										<p id="Desc">
											<b>Description :</b>
											{Campground.Description}
										</p>
									</div>
								</div>
								<h3 id="Credit">
									<b>Posted By :</b>
									<img
										src={`${
											!Campground.CreatedBy.Img
												? `${process.env.PUBLIC_URL}/Images/user.png`
												: `${process.env.PUBLIC_URL}/Images/Users/${Campground.CreatedBy.Img}`
										}`}
										alt="UserImg"
										id="UserImg"
									/>
									<Link
										to={`/User/${Campground.CreatedBy.Name}/${Campground.CreatedBy.Id}`}
										style={{ color: "#000" }}
									>
										{Campground.CreatedBy.Name}
									</Link>
								</h3>
							</div>
							<div id="Comments">
								<div id="Title">
									<h3>Comments :</h3>
									{User && (
										<button
											onClick={(e) => {
												e.preventDefault();
												setToggleComment(true);
											}}
										>
											Add
										</button>
									)}
								</div>
								<div id="Items">
									<div
										className={
											ToggleSuccess && Success
												? "Success SuccessOpen"
												: "Success"
										}
									>
										{ToggleSuccess && Success ? <p>{Success[0].msg}</p> : null}
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
										className={
											ToggleAlert && Errors ? "Alerts AlertsOpen" : "Alerts"
										}
									>
										{ToggleAlert && Errors ? <p>{Errors[0].msg}</p> : null}
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
									{ToggleComment && (
										<motion.div
											animate={{ opacity: 1, y: 0 }}
											initial={{ opacity: 0, y: 20 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{ duration: 0.5 }}
											className="CommentCard"
										>
											<div className="Top">
												{/* <p>{User ? User.Name : "guest"}</p> */}
												<ReactStars
													size={30}
													count={5}
													onChange={(newRating) => setCommentRating(newRating)}
													activeColor="#ffc943"
													emptyIcon={<FontAwesomeIcon icon={farStar} />}
													filledIcon={<FontAwesomeIcon icon={faStar} />}
												/>
											</div>
											<div className="Bottom AddBottom">
												<textarea
													rows="6"
													cols="33"
													type="text"
													maxLength={1000}
													onChange={(e) => setCommentBody(e.target.value)}
													value={CommentBody}
												/>
											</div>
											<div className="Btns">
												<button
													onClick={async (e) => {
														e.preventDefault();
														dispatch(
															addComment(
																{
																	Body: CommentBody,
																	Rating: CommentRating,
																	Author: {
																		Name: User.Name,
																		Img: User.Img,
																		Id: User._id,
																	},
																	CampgroundId: Campground._id,
																},
																setToggleComment,
																setCommentBody,
																setCommentRating,
																setToggleAlert,
																setToggleSuccess
															)
														);
														setToggleAlert(true);
														setToggleSuccess(true);
													}}
												>
													Post
												</button>
												<button
													onClick={(e) => {
														e.preventDefault();
														setToggleComment(false);
														setCommentBody("");
														setCommentRating(0);
													}}
												>
													Cancel
												</button>
											</div>
										</motion.div>
									)}
									{Comments && Campground
										? Comments.slice(0)
												.reverse()
												.map((comment) => {
													return (
														<div key={comment._id} className="CommentCard">
															<div className="Top">
																<p>
																	<b>{comment.Author.Name}</b>
																</p>
																{ToggleEdit && CurrentEdit === comment ? (
																	<>
																		<ReactStars
																			size={30}
																			count={5}
																			onChange={(newRating) =>
																				setEditRating(newRating)
																			}
																			value={comment.Rating}
																			activeColor="#ffc943"
																			emptyIcon={
																				<FontAwesomeIcon icon={farStar} />
																			}
																			filledIcon={
																				<FontAwesomeIcon icon={faStar} />
																			}
																		/>
																	</>
																) : (
																	<ReactStars
																		edit={false}
																		size={30}
																		count={5}
																		value={comment.Rating}
																		activeColor="#ffc943"
																		emptyIcon={
																			<FontAwesomeIcon icon={farStar} />
																		}
																		filledIcon={
																			<FontAwesomeIcon icon={faStar} />
																		}
																	/>
																)}
															</div>
															<div
																className={
																	ToggleEdit && CurrentEdit === comment
																		? "Bottom AddBottom"
																		: "Bottom"
																}
															>
																{ToggleEdit && CurrentEdit === comment ? (
																	<textarea
																		rows="6"
																		cols="33"
																		type="text"
																		maxLength={1000}
																		onChange={(e) =>
																			setEditBody(e.target.value)
																		}
																		defaultValue={comment.Body}
																	/>
																) : (
																	<p>-{comment.Body}</p>
																)}
															</div>
															{User && User._id === comment.Author.Id ? (
																<div className="Btns">
																	{ToggleEdit && CurrentEdit === comment ? (
																		<>
																			<button
																				onClick={(e) => {
																					e.preventDefault();
																					dispatch(
																						updatecomment(
																							{
																								id: comment._id,
																								Body: EditBody || comment.Body,
																								Rating:
																									EditRating || comment.Rating,
																								CampId: Campground._id,
																							},
																							setToggleEdit,
																							setToggleAlert,
																							setToggleSuccess
																						)
																					);
																					setToggleSuccess(true);
																					setToggleAlert(true);
																				}}
																				style={{
																					background: "none",
																					textDecoration: "underline",
																					border: "none",
																				}}
																			>
																				Save
																			</button>
																			<button
																				style={{
																					background: "none",
																					textDecoration: "underline",
																					border: "none",
																				}}
																				onClick={(e) => {
																					e.preventDefault();
																					setCurrentEdit(null);
																					setToggleEdit(false);
																				}}
																			>
																				Cancel
																			</button>
																		</>
																	) : (
																		<>
																			<button
																				onClick={(e) => {
																					e.preventDefault();
																					setCurrentEdit(comment);
																					setToggleEdit(true);
																				}}
																				style={{
																					background: "none",
																					textDecoration: "underline",
																					border: "none",
																				}}
																			>
																				Edit
																			</button>
																			<button
																				onClick={(e) => {
																					e.preventDefault();
																					dispatch(
																						deletecomment({
																							id: comment._id,
																							CampId: Campground._id,
																						})
																					);
																				}}
																				style={{
																					background: "none",
																					textDecoration: "underline",
																					border: "none",
																				}}
																			>
																				Delete
																			</button>
																		</>
																	)}
																</div>
															) : null}
														</div>
													);
												})
										: null}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</motion.main>
	);
}

export default Campground;
