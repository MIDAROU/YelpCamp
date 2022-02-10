import React, { Children, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrent } from "../Redux/actions /actions";

export default function PrivateRoutes({ children }) {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.UserReducer.User);
	const LoggedIn = useSelector((state) => state.UserReducer.LoggedIn);
	const Loading = useSelector((state) => state.UserReducer.Loading);
	useEffect(() => {
		dispatch(getCurrent());
	}, []);

	return Loading ? null : User && LoggedIn ? children : <Navigate to="/" />;
}

export function PrivateRoutesAdmin({ children }) {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.UserReducer.User);
	const Loading = useSelector((state) => state.UserReducer.Loading);
	useEffect(() => {
		dispatch(getCurrent());
	}, []);

	return Loading ? null : User && User.Role === "Admin" ? (
		children
	) : (
		<Navigate to="/" />
	);
}

export function PrivateRoutesLoggedOut({ children }) {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.UserReducer.User);
	const LoggedIn = useSelector((state) => state.UserReducer.LoggedIn);
	const Loading = useSelector((state) => state.UserReducer.Loading);
	useEffect(() => {
		dispatch(getCurrent());
	}, []);

	return Loading ? null : !User && !LoggedIn ? children : <Navigate to="/" />;
}
