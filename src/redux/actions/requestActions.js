import axios from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';
import * as reqTypes from './types/requestActionTypes';
import { storeUserPosition } from './mapAction';


const API_CALL = 'https://arcane-mesa-47319.herokuapp.com/api/';

export const fetchAllRequest = () => async (dispatch) => {
	try {
			const requests = await axios.get(`${API_CALL}seekings`);
			dispatch({ 
				type: reqTypes.FETCH_ALL_REQUEST, 
				payload: requests 
			});
	} catch (e) {
		console.log(e.message);
	}
};

export const fetchAllMyRequests = (userName) => async (dispatch) => {
	try {
			// fetch all my request by username
			const myRequests = await axios.get(`${API_CALL}seekings/${userName}`);
			dispatch({
				type: reqTypes.FETCH_ALL_MY_REQUESTS,
				payload: myRequests
			});
	} catch (e) {
		console.log(e.message);
	}
};

export const getRequestInfo = (id) => async (dispatch) => {
	try {
			const info = await axios.get(`${API_CALL}/submitted/${id}`);
			dispatch({ type: reqTypes.GET_REQUEST_INFO, payload: info });
	} catch (e) {
		console.log(e.message);
	}
};

export const getCurrentLocation = () => {
	console.log('location called');
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					storeUserPosition({ latitude, longitude });
				},
				(error) => console.log(error.message),
				{ enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
			);
	// return loc;
};

export const checkCanSubmit = () => async (dispatch, store) => {
	console.log('check calleddd !', store().shared);
	
	if (store().shared.userPosition.latitude) {
		const lat = store().shared.userPosition.latitude;
		const lng = store().shared.userPosition.longitude;
		const d_lat = store().seeker.currentRequestConfirmed.latitude;
		const d_lng = store().seeker.currentRequestConfirmed.longitude;
		const MATRIX_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
				const MATRIX_QUERIES = {
					origins: `${lat},${lng}`,
					destinations: `${d_lat},${d_lng}`,
					mode: "driving",
					key: "AIzaSyCEHPMUAIX8F39fGd276fxE4evj1oxXw9E"
				};
				const query = qs.stringify({ ...MATRIX_QUERIES });
				const url = `${MATRIX_URL}${query}`;
				try {
					const resp = await axios.get(url);
					const distance = resp.data.rows[0].elements[0].distance.value;
					dispatch({
						type: 'GET_DISTANCE_MATRIX',
						payload: resp
					});
					return distance / 1000;	
				} catch (e) {
					console.log(e.message);
				}
	}
};

export const logout = () => async (dispatch) => {
	try {
			await AsyncStorage.removeItem('userName');
			dispatch({ type: 'LOGOUT' });
	} catch (e) {
		console.log(e.message);
	}
};
