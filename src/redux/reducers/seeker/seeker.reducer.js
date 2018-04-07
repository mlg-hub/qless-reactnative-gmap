import * as types from '../../actions/types/mapActionsTypes';
import { FETCH_ALL_MY_REQUESTS , GET_REQUEST_INFO} from '../../actions/types/requestActionTypes';
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
		case types.STORE_SELECTED_PLACE_NAME :
			return {
				...state,
				selectedPlaceName: action.payload
			};
		case types.SAVE_ID_OF_THE_REQUEST:
			return {
				...state,
				requestID: action.payload
			};
		case FETCH_ALL_MY_REQUESTS : 
			return {
				...state,
				myRequests: action.payload
			};
		case GET_REQUEST_INFO : 
			return {
				...state,
				singleRequestInfo: action.payload
			};
		case types.GET_FROM_THE_CROWD :
			return {
				...state,
				placeFeedBack: action.payload
			};
		case 'GET_DISTANCE_MATRIX': 
			return {
				...state,
				distanceMatrix: action.payload
			};
		case `${types.USER_ID}CONFIRM_REQUEST`:
					return {
						...state,
						currentRequestConfirmed: action.payload
					};
		case `${types.USER_ID}ON_INFOS_RECEIVED`:
			return {
				...state,
				receivedInfos: action.payload
			};
		default:
			return state;
	}
}
