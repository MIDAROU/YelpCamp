//IMPORS
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

//DEV TOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//CREATE STORE
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk)) //Thunk middleware integration
);

//EXPORTS
export default store;
