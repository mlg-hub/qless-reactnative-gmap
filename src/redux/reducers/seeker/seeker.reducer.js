import * as types from '../../actions/actionsType';
import initialState from '../initialState';

export default function (state = initialState.seeker, action) {
	
	switch (action.type) {

		case types.GET_GOOGLE_PLACES:
			return {
				...state,
				places: action.payload
			};
		case types.GET_PLACE_LOCATION:
			return {
				...state,
				selectedPlace: action.payload
			};
		case types.EMPTY_SEARCH:
			return {
				...state,
				places: []
			};
		case types.STORE_SELECTED_PLACE_NAME:
			return {
				...state,
				selectedPlaceName: action.payload
			};
		case types.SAVE_ID_OF_THE_REQUEST:
			return {
				...state,
				requestID: action.payload
			};
		// first this event is emitted then from it will trigger an other 
		//action to update a specific request hopefully it works!
		
		case `${types.USER_ID}types.CONFIRM_REQUEST`:
					return {
						...state,
						currentRequestConfirmed: action.payload.currentRequestConfirmed
					};
		case `${types.USER_ID}types.ON_INFOS_RECEIVED`:
			return {
				...state,
				receivedInfos: action.payload
			};
		default:
			return state;
	}
}
