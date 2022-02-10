import {
	faArrowLeft,
	faArrowRight,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMapGl, { FlyToInterpolator, Marker } from "react-map-gl";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addCampgrounds,
	clearErrors,
	clearSuccess,
} from "../Redux/actions /actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCampground() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const Errors = useSelector((state) => state.UserReducer.Errors);
	const Success = useSelector((state) => state.UserReducer.Success);
	const User = useSelector((state) => state.UserReducer.User);

	const [Name, setName] = useState("");
	const [Price, setPrice] = useState(0);
	const [number, setNumber] = useState("");
	const [Description, setDescription] = useState("");
	const [Location, setLocation] = useState(null);
	const [TempLocation, setTempLocation] = useState(null);
	const [Imgs, setImgs] = useState(null);
	const [Current, setCurrent] = useState(0);
	const [ToggleAlert, setToggleAlert] = useState(false);
	const [ToggleSuccess, setToggleSuccess] = useState(false);
	const [Search, setSearch] = useState(null);
	const [InputValue, setInputValue] = useState("");
	const [ViewPorts, setViewPorts] = useState({
		latitude: 34.1107038598115,
		longitude: 9.56116835557131,
		width: "100%",
		height: "50rem",
		zoom: 4,
	});

	useEffect(() => {
		setViewPorts({ ...ViewPorts, width: "100%", height: "50rem" });
	}, [ViewPorts.width]);

	const debounce = (func) => {
		let Timeout;
		return function (...args) {
			const context = this;
			if (Timeout) clearTimeout(Timeout);
			Timeout = setTimeout(() => {
				Timeout = null;
				func.apply(context, args);
			}, 800);
		};
	};

	const HandleSearch = async (e) => {
		if (e.target.value === "") {
			setSearch(null);
		} else {
			const res = await axios.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${process.env.REACT_APP_YELPCAMP_TOKEN}`
			);
			setSearch(res);
		}
	};

	const HandleAddMarker = async (e) => {
		const res = await axios.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat[0]},${e.lngLat[1]}.json?access_token=${process.env.REACT_APP_YELPCAMP_TOKEN}`
		);
		setSearch(res);
		setTempLocation({
			Longitude: e.lngLat[0],
			Latitude: e.lngLat[1],
		});
	};

	const handleSearchDebounce = useCallback(debounce(HandleSearch), []);

	return (
		<motion.main
			id="AddCard"
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 20 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
		>
			<div id="Add">
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
				<div className={ToggleAlert && Errors ? "Alerts AlertsOpen" : "Alerts"}>
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
				<div id="Info">
					<div id="ImgsCard">
						<div id="ImgCarrousel" aria-label="Your Images">
							{Imgs ? (
								<>
									<button
										className="CarrouselButton Next"
										onClick={() => {
											setCurrent(Current === Imgs.length - 1 ? 0 : Current + 1);
										}}
									>
										<FontAwesomeIcon icon={faArrowRight} />
									</button>
									<button
										className="CarrouselButton Prev"
										onClick={() => {
											setCurrent(Current === 0 ? Imgs.length - 1 : Current - 1);
										}}
									>
										<FontAwesomeIcon icon={faArrowLeft} />
									</button>
								</>
							) : null}
							<ul>
								{Imgs ? (
									Imgs.map((Img, index) => {
										return (
											<li
												className={index === Current ? "Slide Active" : "Slide"}
												key={index}
												data-active
											>
												<img src={URL.createObjectURL(Img)} alt="Img" />
											</li>
										);
									})
								) : (
									<li className="Slide Active">
										<img
											src="Images/ImagesPlaceholder.jpg"
											alt="Imgs PlaceHolder"
										/>
									</li>
								)}
							</ul>
						</div>
						<div id="AddImgs">
							<p>Add Images :</p>
							<input
								type="file"
								alt="Img"
								multiple
								onChange={(e) => {
									setImgs([...e.target.files]);
								}}
							/>
						</div>
					</div>
					<div id="MapCard">
						<div id="Map">
							<ReactMapGl
								id="Map"
								style={{
									borderRadius: "15px",
									overflow: "hidden",
									width: "100%",
								}}
								{...ViewPorts}
								mapboxApiAccessToken={process.env.REACT_APP_YELPCAMP_TOKEN}
								onViewportChange={(viewport) => {
									setViewPorts(viewport);
								}}
								onClick={(e) => {
									e.preventDefault();
									HandleAddMarker(e);
								}}
							>
								{TempLocation ? (
									<Marker
										longitude={TempLocation.Longitude}
										latitude={TempLocation.Latitude}
										offsetTop={(-ViewPorts.zoom * 5) / 2}
									>
										<img
											src="Images/MapMarker.png"
											alt="MapMarker"
											width={ViewPorts.zoom * 5}
											height={ViewPorts.zoom * 5}
										/>
									</Marker>
								) : Location ? (
									<Marker
										longitude={Location.Longitude}
										latitude={Location.Latitude}
										offsetTop={(-ViewPorts.zoom * 5) / 2}
									>
										<img
											src="Images/MapMarker.png"
											alt="MapMarker"
											width={ViewPorts.zoom * 5}
											height={ViewPorts.zoom * 5}
										/>
									</Marker>
								) : null}
							</ReactMapGl>
						</div>
						<div id="Location">
							<label htmlFor="Location">Location : </label>
							<div id="Search">
								<input
									type="text"
									name="Location"
									id=""
									style={
										InputValue && Search
											? {
													borderRadius: "15px 15px 0 0",
													transition: "all 0.5s ease-in-out",
											  }
											: {}
									}
									onChange={(e) => {
										handleSearchDebounce(e);
										setInputValue(e.target.value);
									}}
									value={InputValue}
								/>
								<div id="AutoComplete">
									{Search
										? Search.data.features.slice(0, 3).map((el, index) => {
												return (
													<div
														key={index}
														className=".AutoCompleteItems"
														onClick={() => {
															setTempLocation(null);
															setLocation({
																Name: el.place_name,
																Longitude: el.geometry.coordinates[0],
																Latitude: el.geometry.coordinates[1],
															});
															setViewPorts({
																latitude: el.geometry.coordinates[1],
																longitude: el.geometry.coordinates[0],
																width: "100%",
																height: "50rem",
																zoom: 10,
																transitionInterpolator: new FlyToInterpolator({
																	speed: 100,
																}),
																transitionDuration: "auto",
															});
															setInputValue(el.place_name);
															setSearch(null);
														}}
													>
														{el.place_name.length >= 20
															? el.place_name.substring(0, 20) + "..."
															: el.place_name}
													</div>
												);
										  })
										: null}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="Separator"></div>
				<div id="Details">
					<div style={{ width: "100%", maxWidth: "100%" }}>
						<p>
							<b>Details :</b>
						</p>
						<form id="Form">
							<div>
								<label htmlFor="Name">
									<b>Name :</b>
								</label>
								<input
									type="text"
									name="Name"
									id="Name"
									maxLength={50}
									onChange={(e) => setName(e.target.value)}
									value={Name}
									placeholder="Camground's Name..."
								/>
							</div>
							<div>
								<label htmlFor="Price">
									<b>Price :</b>
								</label>
								<input
									type="Number"
									name="Price"
									id="Price"
									max={999}
									min={0}
									onChange={(e) => setPrice(e.target.value)}
									value={Price}
									placeholder="Camground's Price..."
								/>
							</div>
							<div>
								<label htmlFor="Number">
									<b>Number :</b>
								</label>
								<input
									type="Number"
									name="Number"
									id="Number"
									min={0}
									onChange={(e) => setNumber(e.target.value)}
									value={number}
									placeholder="Your Number..."
								/>
							</div>
							<div id="Textarea">
								<label htmlFor="Description">
									<b>Description :</b>
								</label>
								<textarea
									type="Description"
									name="Description"
									id="Description"
									rows="6"
									maxLength={1000}
									cols="33"
									onChange={(e) => setDescription(e.target.value)}
									value={Description}
									placeholder="Camground's Description..."
								/>
							</div>
						</form>
					</div>
					<button
						onClick={(e) => {
							e.preventDefault();
							const NewLocation = JSON.stringify(Location);
							let data = new FormData();
							data.append("Name", Name);
							data.append("Price", Price);
							data.append("number", number);
							data.append("Description", Description);
							data.append("Location", NewLocation);
							data.append("Id", User._id);
							Imgs &&
								Imgs.forEach((img) => {
									data.append("Imgs", img);
								});
							dispatch(addCampgrounds(data, navigate));
							setToggleAlert(true);
							setToggleSuccess(true);
						}}
					>
						Add
					</button>
				</div>
			</div>
		</motion.main>
	);
}

export default AddCampground;
