import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ReactMapGl, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import useSuperCluster from "use-supercluster";
import { Link } from "react-router-dom";
import { getcampgrounds } from "../Redux/actions /actions";

function Campgrounds() {
	const dispatch = useDispatch();
	const Campgrounds = useSelector((state) => state.CampReducer.Campgrounds);
	const MapRef = useRef();

	useEffect(() => {
		dispatch(getcampgrounds());
	}, []);

	const [Selected, setSelected] = useState(null);
	const [ViewPorts, setViewPorts] = useState({
		latitude: 34.1107038598115,
		longitude: 9.56116835557131,
		width: "100%",
		height: "100%",
		zoom: 4,
	});
	useEffect(() => {
		setViewPorts({ ...ViewPorts, width: "100%", height: "100%" });
	}, [ViewPorts.width]);

	const points = Campgrounds.map((el) => ({
		type: "Feature",
		properties: {
			cluster: false,
			Id: el._id,
			Name: el.Name,
			Price: el.Price,
			Imgs: el.Imgs,
			CreatedBy: el.CreatedBy,
		},
		geometry: {
			type: "Point",
			coordinates: [el.Location.Longitude, el.Location.Latitude],
		},
	}));

	const bounds = MapRef.current
		? MapRef.current.getMap().getBounds().toArray().flat()
		: null;

	const { clusters, supercluster } = useSuperCluster({
		points,
		zoom: ViewPorts.zoom,
		bounds,
		options: { radius: 40, maxZoom: 20 },
	});

	return (
		<>
			<motion.main
				id="CampgroundsPage"
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 20 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
			>
				<div id="Campgrounds">
					<div id="CampgroundsSearch">
						<div id="Map">
							<ReactMapGl
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
								ref={MapRef}
							>
								{Campgrounds &&
									clusters.map((cluster) => {
										const [Longitude, Latitude] = cluster.geometry.coordinates;
										const { cluster: isCluster, point_count: pointCount } =
											cluster.properties;
										if (isCluster) {
											return (
												<Marker
													key={cluster.id}
													latitude={Latitude}
													longitude={Longitude}
												>
													<div
														className="Cluster-Marker"
														style={{
															width: `${
																10 + (pointCount / points.length) * 20
															}px`,
															height: `${
																10 + (pointCount / points.length) * 20
															}px`,
														}}
														onClick={() => {
															const exZoom = Math.min(
																supercluster.getClusterExpansionZoom(
																	cluster.id
																),
																20
															);
															setViewPorts({
																...ViewPorts,
																latitude: Latitude,
																longitude: Longitude,
																zoom: exZoom,
																transitionInterpolator: new FlyToInterpolator({
																	speed: 15,
																}),
																transitionDuration: "auto",
															});
														}}
													>
														{pointCount}
													</div>
												</Marker>
											);
										}
										return (
											<Marker
												key={cluster.properties.Id}
												longitude={Longitude}
												latitude={Latitude}
												offsetTop={(-ViewPorts.zoom * 5) / 2}
											>
												<button
													className="Marker-btn"
													onClick={(e) => {
														e.preventDefault();
														setSelected(cluster);
													}}
												>
													<img
														src="Images/MapMarker.png"
														alt="MapMarker"
														width={ViewPorts.zoom * 5}
														height={ViewPorts.zoom * 5}
													/>
												</button>
											</Marker>
										);
									})}
								{Selected ? (
									<Popup
										latitude={Selected.geometry.coordinates[1]}
										longitude={Selected.geometry.coordinates[0]}
										onClose={() => {
											setSelected(null);
										}}
									>
										<div>
											<img
												src={`${process.env.PUBLIC_URL}/Images/Campgrounds/${Selected.properties.CreatedBy.Id}/${Selected.properties.Imgs[0]}`}
												width="150rem"
												alt="Img"
											/>
											<p style={{ color: "#000", fontSize: "1.5rem" }}>
												{Selected.properties.Name}
											</p>
											<p
												style={{
													color: "#000",
													fontSize: "1.5rem",
													display: "flex",
													justifyContent: "space-between",
												}}
											>
												<span>{Selected.properties.Price}$</span>
												<Link
													to={`/Campground/${Selected.properties.Id}`}
													style={{
														color: "#1978c8",
														background: "none",
														outline: "none",
														border: "none",
														cursor: "pointer",
													}}
												>
													Details...
												</Link>
											</p>
										</div>
									</Popup>
								) : null}
							</ReactMapGl>
						</div>
						<div id="Search">
							<h2>Search</h2>
							<input
								type="text"
								name="text"
								id="SearchCampgrounds"
								placeholder="Campground..."
							/>
						</div>
					</div>
					<div id="CampgroundsList">
						<h2>Campgrounds</h2>
						<div id="CampgroundsCard">
							{Campgrounds.map((camp) => {
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
													<p className="Loc">
														<FontAwesomeIcon icon={faMapMarkedAlt} />
														<span>{camp.Location.Name}</span>
													</p>
												</div>
												<div className="Right">
													<p>{camp.Price}$/Night</p>
												</div>
											</div>
										</Link>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</motion.main>
		</>
	);
}

export default Campgrounds;
