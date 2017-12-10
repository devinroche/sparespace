import axios from "axios"
import actionTypes from "./actionTypes"

export function fetchUser(values) {
	return dispatch => {
		return axios
			.post("http://localhost:3001/login", values)
			.then(function(response) {
				const user = response.data[0]
				window.localStorage.setItem("loggedIn", true)
				dispatch(fetchUserSuccess(user))
			})
			.catch(function(error) {
				dispatch(fetchUserFailure(error))
			})
	}
}

function fetchUserSuccess(user) {
	return {
		type: actionTypes.FETCH_USER_SUCCESS,
		payload: user
	}
}

function fetchUserFailure(err) {
	return {
		type: actionTypes.FETCH_USER_FAILURE,
		payload: new Error(err)
	}
}
