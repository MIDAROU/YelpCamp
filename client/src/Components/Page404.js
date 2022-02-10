import React from "react";

function Page404() {
	return (
		<>
			<main id="NotFound">
				<div id="NotFoundCard">
					<img src={`${process.env.PUBLIC_URL}/Images/404.gif`} alt="gif404" />
					<p id="Error">404</p>
					<p>Page Not Found </p>
				</div>
			</main>
		</>
	);
}

export default Page404;
