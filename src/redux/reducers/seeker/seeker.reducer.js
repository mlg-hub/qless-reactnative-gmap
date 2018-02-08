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
			}
		case types.EMPTY_SEARCH:
			return {
				...state,
				places: []
			}
		case types.STORE_SELECTED_PLACE_NAME:
			return {
				...state,
				selectedPlaceName: action.payload
			}
		default:
			return state;
	}
}
