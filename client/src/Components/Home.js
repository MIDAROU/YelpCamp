import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
	return (
		<>
			<motion.main
				id="HomeCard"
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 20 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
			>
				<h1>YelpCamp</h1>
				<p>Welcome To YelpCamp</p>
				<p>Jump In And Explore Our Campgrounds</p>
				<Link to="/Campgrounds">
					<button className="button">View Our Campgrounds</button>
				</Link>
			</motion.main>
		</>
	);
}

export default Home;
