//IMPORTS
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./Redux/store/store";
import App from "./App";
import ScrollToTop from "./Components/ScrollToTop";

//REACT RENDER METHOD
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ScrollToTop />
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
