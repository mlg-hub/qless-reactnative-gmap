import RNGooglePlaces from 'react-native-google-places';
// import axios from 'axios';
import * as types from './types/mapActionsTypes';


// store the current user either seeker or giver

export function isUser(user) {
	return {
		type: types.CURRENT_USER,
		payload: user
	};
}
// store the user position to the global state
export function storeUserPosition(userPosition) {
	console.log('action to store position called');
	return {
		type: types.STORE_USER_POSITION,
		payload: userPosition
	};
} 
// get an array of places predictions
export const getGooglePlaces = (place) => async (dispatch) => {
	
	try {
		const placesResults = await RNGooglePlaces.getAutocompletePredictions(place, { country: "KE"});
		dispatch({ type: types.GET_GOOGLE_PLACES, payload: placesResults });
	} catch (e) {
		console.log(e.message);
	}
};

export const getPlaceLocation = (placeID) => async (dispatch) => {
	try {
		const placeLocation = await RNGooglePlaces.lookUpPlaceByID(placeID);
			dispatch({ type: types.EMPTY_SEARCH });
			dispatch({ type: types.GET_PLACE_LOCATION, payload: placeLocation });
	} catch (e) {
		console.log(e.message);
	}
};

export const requestPlaceInfo = () => async (dispatch, store) => {
	// save the place infos and trigger an emit event on the server
	console.log('button triggered');

	const selectedPlace = store().seeker.selectedPlace;	

	const seekingData = {
		data: {
			userName: types.USER_ID,
			address: selectedPlace.address,
			name: selectedPlace.name,
			latitude: selectedPlace.latitude,
			longitude: selectedPlace.longitude
		}
	};

	// await axios.post('https://arcane-mesa-47319.herokuapp.com/api/seekings', {
		const API_CALL = 'https://arcane-mesa-47319.herokuapp.com/api/seekings';
		let reqID = 0;
	
	await fetch(`${API_CALL}`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(seekingData)
				}).then((resp) => resp.json())
			  		.then((data) => {
							dispatch({ 
							type: types.SAVE_ID_OF_THE_REQUEST, 
							payload: data.saved._id
						  });
						  reqID = data.saved._id;
					  });
			return reqID;			
};
export const storeSelectedPlaceName = (selectedPlaceName) => {
	return {
		type: types.STORE_SELECTED_PLACE_NAME,
		payload: selectedPlaceName
	};
};

export const handleSpecificRequest = (requestID) => {
	return {
		type: 'STORE_THE_REQUEST_ID',
		payload: requestID
	};
};
