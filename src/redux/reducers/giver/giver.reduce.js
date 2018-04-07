import * as types from '../../actions/types/mapActionsTypes';
import initialeState from '../initialState';
import * as reqTypes from '../../actions/types/requestActionTypes';

export default function (state = initialeState.giver, action) {
	switch (action.type) {
		// this from emit event from the database;
		case types.SEEKING_REQUEST:
			return {
				...state,
				currentRequest: action.payload
			};
		case reqTypes.FETCH_ALL_REQUEST: 
			return {
				...state,
				requests: action.payload
			};
		default :
			return state;
	}
}
