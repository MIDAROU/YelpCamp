//IMPORTS
import axios from "axios";
import {
	ADMIN_GET_USERS,
	BECOME_ADMIN,
	CLEAR_ERRORS,
	CLEAR_SUCCESS,
	FAIL,
	GET_CAMPGROUND,
	GET_CAMPGROUNDS,
	GET_COMMENTS,
	GET_CURRENT,
	GET_USERS_CAMPGROUNDS,
	GET_USER_CAMPGROUNDS,
	LOGIN,
	LOGOUT,
	REGISTER,
	SUCCESS,
	TOGGLE_LOADING_FALSE,
	UPDATE,
	UPDATE_PASSWORD,
	UPLOAD_USER_IMG,
} from "../actionTypes/actionTypes";

//CAMPGROUND
export const getcampgrounds = () => async (dispatch) => {
	try {
		//GET CAMPGROUNDS
		const res = await axios.get("/campgrounds/list");
		//DISPATCH THE ACTION
		dispatch({ type: GET_CAMPGROUNDS, payload: res.data });
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const getcampground = (id) => async (dispatch) => {
	try {
		//GET CAMPGROUNDS
		const res = await axios.get(`/campgrounds/list/${id}`);
		//GET COMMENTS
		const resTwo = await axios.get(`/comments/list/${id}`);
		//DISPATCH THE ACTION
		dispatch({ type: GET_COMMENTS, payload: resTwo.data });
		//DISPATCH THE ACTION
		dispatch({ type: GET_CAMPGROUND, payload: res.data });
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const getUserCampgrounds = (id) => async (dispatch) => {
	const Token = localStorage.getItem("Token");

	const config = {
		headers: {
			Authorized: Token,
		},
	};
	try {
		//GET CAMPGROUNDS
		const res = await axios.get(`/campgrounds/userlist/${id}`, config);
		//DISPATCH THE ACTION
		dispatch({ type: GET_USER_CAMPGROUNDS, payload: res.data });
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const getUsersCampgrounds = (id) => async (dispatch) => {
	try {
		//GET CAMPGROUNDS
		const res = await axios.get(`/campgrounds/userslist/${id}`);
		//DISPATCH THE ACTION
		dispatch({ type: GET_USERS_CAMPGROUNDS, payload: res.data });
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const addCampgrounds = (data, navigate) => async (dispatch) => {
	const Token = localStorage.getItem("Token");

	const config = {
		headers: {
			Authorized: Token,
		},
	};
	try {
		//POST CAMPGROUND
		const res = await axios.post("/campgrounds/add", data, config);

		//DISPATCH
		dispatch({ type: SUCCESS, payload: res.data });
		setTimeout(() => {
			dispatch({ type: CLEAR_SUCCESS });
		}, 5000);
		dispatch(getCurrent());
		dispatch(getcampgrounds());
		navigate(`/Campground/${res.data.NewCampground._id}`);
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const updateCampground = (data, navigate) => async (dispatch) => {
	const Token = localStorage.getItem("Token");

	const config = {
		headers: {
			Authorized: Token,
		},
	};
	try {
		//POST CAMPGROUND
		const res = await axios.put("/campground/update", data, config);

		//DISPATCH
		dispatch({ type: SUCCESS, payload: res.data });
		setTimeout(() => {
			dispatch({ type: CLEAR_SUCCESS });
		}, 5000);
		dispatch(getCurrent());
		dispatch(getcampgrounds());
		navigate(`/Campground/${res.data.Campground._id}`);
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const deleteCampground = (Data) => async (dispatch) => {
	const Token = localStorage.getItem("Token");

	const config = {
		headers: {
			Authorized: Token,
		},
		data: {
			Data,
		},
	};
	try {
		//DELETE USER
		const res = await axios.delete("/campgrounds/delete", config);
		if (res.data.success) {
			dispatch({ type: SUCCESS, payload: res.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_SUCCESS });
			}, 5000);
		}
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

//COMMENTS

export const getcomments = (id) => async (dispatch) => {
	try {
		//GET COMMENTS
		const res = await axios.get(`/comments/list/${id}`);
		//DISPATCH THE ACTION
		dispatch({ type: GET_COMMENTS, payload: res.data });
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const addComment =
	(
		data,
		setToggleComment,
		setCommentBody,
		setCommentRating,
		setToggleAlert,
		setToggleSuccess
	) =>
	async (dispatch) => {
		const Token = localStorage.getItem("Token");

		const config = {
			headers: {
				Authorized: Token,
			},
		};
		try {
			//POST CAMPGROUND
			const res = await axios.post("/comments/add", data, config);

			//DISPATCH
			dispatch({ type: SUCCESS, payload: res.data });
			setToggleSuccess(true);
			setTimeout(() => {
				setToggleSuccess(false);
				setTimeout(() => {
					dispatch({ type: CLEAR_SUCCESS });
				}, 500);
			}, 5000);
			dispatch(getcomments(data.CampgroundId));
			setToggleComment(false);
			setCommentBody("");
			setCommentRating(0);
			dispatch(getCurrent());
		} catch (error) {
			if (error.response) {
				dispatch({ type: FAIL, payload: error.response.data });
				setToggleAlert(true);
				setTimeout(() => {
					setToggleAlert(false);
					setTimeout(() => {
						dispatch({ type: CLEAR_ERRORS });
					}, 500);
				}, 5000);
			} else
				dispatch({
					type: FAIL,
					payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
				});
		}
	};

export const updatecomment =
	(Comment, setToggleEdit, setToggleAlert, setToggleSuccess) =>
	async (dispatch) => {
		const Token = localStorage.getItem("Token");

		const config = {
			headers: {
				Authorized: Token,
			},
		};
		try {
			//PUT USER
			const res = await axios.put("/comments/update", Comment, config);
			dispatch({ type: SUCCESS, payload: res.data });
			await dispatch(getcomments(Comment.CampId));
			setToggleEdit(false);
			setToggleSuccess(true);
			setTimeout(() => {
				setToggleSuccess(false);
				setTimeout(() => {
					dispatch({ type: CLEAR_SUCCESS });
				}, 500);
			}, 5000);
		} catch (error) {
			if (error.response) {
				dispatch({ type: FAIL, payload: error.response.data });
				setToggleAlert(true);
				setTimeout(() => {
					setToggleAlert(false);
					setTimeout(() => {
						dispatch({ type: CLEAR_ERRORS });
					}, 500);
				}, 5000);
			} else
				dispatch({
					type: FAIL,
					payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
				});
		}
	};

export const deletecomment = (Data) => async (dispatch) => {
	const Token = localStorage.getItem("Token");

	const config = {
		headers: {
			Authorized: Token,
		},
		data: {
			Data,
		},
	};
	try {
		//DELETE USER
		const res = await axios.delete("/comments/delete", config);
		if (res.data.success) {
			dispatch({ type: SUCCESS, payload: res.data });
			dispatch(getcomments(Data.CampId));
			setTimeout(() => {
				dispatch({ type: CLEAR_SUCCESS });
			}, 5000);
		}
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

//USERS
export const register =
	(newUser, navigate, setToggleAlert) => async (dispatch) => {
		try {
			//POST NEW USER
			const res = await axios.post("/users/signUp", newUser);
			//DISPATCH THE ACTION
			dispatch({ type: REGISTER, payload: res.data });
			dispatch({ type: SUCCESS, payload: res.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_SUCCESS });
			}, 5000);
			dispatch(getCurrent());
			navigate("/");
		} catch (error) {
			if (error.response) {
				dispatch({ type: FAIL, payload: error.response.data });
				setToggleAlert(true);
				setTimeout(() => {
					setToggleAlert(false);
					setTimeout(() => {
						dispatch({ type: CLEAR_ERRORS });
					}, 500);
				}, 5000);
			} else
				dispatch({
					type: FAIL,
					payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
				});
		}
	};

export const login = (User, navigate, setToggleAlert) => async (dispatch) => {
	try {
		//POST USER
		const res = await axios.post("/users/signIn", User);
		//DISPATCH THE ACTION
		dispatch({ type: LOGIN, payload: res.data });
		dispatch({ type: SUCCESS, payload: res.data });
		setTimeout(() => {
			dispatch({ type: CLEAR_SUCCESS });
		}, 5000);
		dispatch(getCurrent());
		navigate("/");
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setToggleAlert(true);
			setTimeout(() => {
				setToggleAlert(false);
				setTimeout(() => {
					dispatch({ type: CLEAR_ERRORS });
				}, 500);
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const logout = () => async (dispatch) => {
	dispatch({ type: LOGOUT });
};

export const getCurrent = () => async (dispatch) => {
	const Token = localStorage.getItem("Token");

	const config = {
		headers: {
			Authorized: Token,
		},
	};
	try {
		//POST USER
		const res = await axios.get("/users/current", config);
		//DISPATCH THE ACTION
		dispatch({ type: GET_CURRENT, payload: res.data });
		dispatch({ type: TOGGLE_LOADING_FALSE });
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			dispatch({ type: TOGGLE_LOADING_FALSE });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const admingetusers = () => async (dispatch) => {
	const Token = localStorage.getItem("Token");

	const config = {
		headers: {
			Authorized: Token,
		},
	};
	try {
		//POST USER
		const res = await axios.get("/users/admin/getusers", config);
		//DISPATCH THE ACTION
		dispatch({ type: ADMIN_GET_USERS, payload: res.data });
		dispatch({ type: TOGGLE_LOADING_FALSE });
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			dispatch({ type: TOGGLE_LOADING_FALSE });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const admin = (Key) => async (dispatch) => {
	const Token = localStorage.getItem("Token");

	const config = {
		headers: {
			Authorized: Token,
		},
	};
	try {
		//PUT USER
		const res = await axios.post("/users/admin", Key, config);
		dispatch({ type: BECOME_ADMIN, payload: res.data });
		dispatch({ type: SUCCESS, payload: res.data });
		setTimeout(() => {
			dispatch({ type: CLEAR_SUCCESS });
		}, 5000);
		dispatch(getCurrent());
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};
export const update =
	(User, setToggleAlert, setToggleSuccess) => async (dispatch) => {
		const Token = localStorage.getItem("Token");

		const config = {
			headers: {
				Authorized: Token,
			},
		};
		try {
			//PUT USER
			const res = await axios.put("/users/update", User, config);
			dispatch({ type: UPDATE, payload: res.data });
			dispatch({ type: SUCCESS, payload: res.data });
			setToggleSuccess(true);
			setTimeout(() => {
				setToggleSuccess(false);
				setTimeout(() => {
					dispatch({ type: CLEAR_SUCCESS });
				}, 500);
			}, 5000);
			dispatch(getCurrent());
		} catch (error) {
			if (error.response) {
				dispatch({ type: FAIL, payload: error.response.data });
				setToggleAlert(true);
				setTimeout(() => {
					setToggleAlert(false);
					setTimeout(() => {
						dispatch({ type: CLEAR_ERRORS });
					}, 500);
				}, 5000);
			} else
				dispatch({
					type: FAIL,
					payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
				});
		}
	};

export const updatePassword =
	(User, setToggleAlert, setToggleSuccess) => async (dispatch) => {
		const Token = localStorage.getItem("Token");

		const config = {
			headers: {
				Authorized: Token,
			},
		};
		try {
			// PUT USER PASSWORD
			const res = await axios.put("/users/updatePassword", User, config);
			dispatch({ type: UPDATE_PASSWORD, payload: res.data });
			dispatch({ type: SUCCESS, payload: res.data });
			setToggleSuccess(true);
			setTimeout(() => {
				setToggleSuccess(false);
				setTimeout(() => {
					dispatch({ type: CLEAR_SUCCESS });
				}, 500);
			}, 5000);
			dispatch(getCurrent());
		} catch (error) {
			if (error.response) {
				dispatch({ type: FAIL, payload: error.response.data });
				setToggleAlert(true);
				setTimeout(() => {
					setToggleAlert(false);
					setTimeout(() => {
						dispatch({ type: CLEAR_ERRORS });
					}, 500);
				}, 5000);
			} else
				dispatch({
					type: FAIL,
					payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
				});
		}
	};

export const deleteUser = (Data, navigate) => async (dispatch) => {
	const Token = localStorage.getItem("Token");

	const config = {
		headers: {
			Authorized: Token,
		},
		data: {
			Data,
		},
	};
	try {
		//DELETE USER
		const res = await axios.delete("/users/delete", config);
		if (res.data.success) {
			dispatch({ type: SUCCESS, payload: res.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_SUCCESS });
			}, 5000);
			dispatch(logout());
			navigate("/");
		}
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const AdmindeleteUser = (Data) => async (dispatch) => {
	const Token = localStorage.getItem("Token");

	const config = {
		headers: {
			Authorized: Token,
		},
		data: {
			Data,
		},
	};
	try {
		//DELETE USER
		const res = await axios.delete("/users/delete", config);
		if (res.data.success) {
			dispatch({ type: SUCCESS, payload: res.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_SUCCESS });
			}, 5000);
		}
	} catch (error) {
		if (error.response) {
			dispatch({ type: FAIL, payload: error.response.data });
			setTimeout(() => {
				dispatch({ type: CLEAR_ERRORS });
			}, 5000);
		} else
			dispatch({
				type: FAIL,
				payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
			});
	}
};

export const uploadUserImg =
	(Data, setToggleAlert, setToggleSuccess) => async (dispatch) => {
		const Token = localStorage.getItem("Token");

		const config = {
			headers: {
				Authorized: Token,
			},
		};
		try {
			//PUT USER PASSWORD
			const res = await axios.post("/users/upload", Data, config);

			dispatch({ type: UPLOAD_USER_IMG, payload: res.data });
			dispatch({ type: SUCCESS, payload: res.data });
			setToggleSuccess(true);
			setTimeout(() => {
				setToggleSuccess(false);
				setTimeout(() => {
					dispatch({ type: CLEAR_SUCCESS });
				}, 500);
			}, 5000);
			dispatch(getCurrent());
		} catch (error) {
			if (error.response) {
				dispatch({ type: FAIL, payload: error.response.data });
				setToggleAlert(true);
				setTimeout(() => {
					setToggleAlert(false);
					setTimeout(() => {
						dispatch({ type: CLEAR_ERRORS });
					}, 500);
				}, 5000);
			} else
				dispatch({
					type: FAIL,
					payload: { errors: [{ msg: "SERVER ERROR , TRY AGAIN SOON!!" }] },
				});
		}
	};

export const clearSuccess = () => async (dispatch) => {
	dispatch({ type: CLEAR_SUCCESS });
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
