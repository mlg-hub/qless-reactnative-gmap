import * as types from '../actions/types/mapActionsTypes';
import initialState from './initialState';

export default function (state = initialState.shared, action) {
	switch (action.type) {
		case types.STORE_USER_POSITION:
		return {
			...state,
			userPosition: {
				latitude: action.payload.latitude,
				longitude: action.payload.longitude
			}
		};
		case types.CURRENT_USER:
			return {
				...state,
				currentUser: action.payload
			};
		default :
			return state;
	}
}

