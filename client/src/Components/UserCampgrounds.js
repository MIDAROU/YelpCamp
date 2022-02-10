import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUsersCampgrounds } from "../Redux/actions /actions";

function UserCampgrounds() {
	const dispatch = useDispatch();
	const { name, id } = useParams();
	useEffect(() => {
		dispatch(getUsersCampgrounds(id));
	}, [id, dispatch]);
	const UserCampgrounds = useSelector(
		(state) => state.CampReducer.UsersCampgrounds
	);

	return (
		<>
			<motion.main
				id="ProfileCard"
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 20 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
			>
				<div id="Profile">
					<p id="Title">{name}'s Campgrounds :</p>
					<div id="Separator"></div>
					<div id="UserCampgrounds">
						{UserCampgrounds && UserCampgrounds.length > 0
							? UserCampgrounds.map((camp) => {
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
													</div>
												</div>
											</Link>
										</div>
									);
							  })
							: null}
					</div>
				</div>
			</motion.main>
		</>
	);
}

export default UserCampgrounds;
