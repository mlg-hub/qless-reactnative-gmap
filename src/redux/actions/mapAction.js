import * as types from './actionsType';
import RNGooglePlaces from 'react-native-google-places';

// store the user position to the global state
export function storeUserPosition(userPosition) {
	console.log('action to store position called');
	return {
		type: types.STORE_USER_POSITION,
		payload: userPosition
	}
} 
// get an array of places predictions
export const getGooglePlaces = (place) => async (dispatch) => {
	try{
		const places_results = await RNGooglePlaces.getAutocompletePredictions(place, { country: "KE"});
		dispatch({type: types.GET_GOOGLE_PLACES, payload: places_results});
	}	
	catch(e){
		console.log(e.message);
	}
}

export const getPlaceLocation = (placeID) => async (dispatch) => {
		
	try{
		const place_location = await RNGooglePlaces.lookUpPlaceByID(placeID);
			dispatch({ type: types.EMPTY_SEARCH });
			dispatch({ type: types.GET_PLACE_LOCATION , payload: place_location});
			
	}
	catch(e){
		console.log(e.message);
	}
}

export const storeSelectedPlaceName = (selectedPlaceName) => {
	return {
		type: types.STORE_SELECTED_PLACE_NAME,
		payload: selectedPlaceName
	}
}