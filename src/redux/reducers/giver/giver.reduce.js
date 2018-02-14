import * as types from '../../actions/actionsType';
import initialeState from '../initialState';

export default function (state = initialeState.giver, action) {
	switch (action.type) {
		// this from emit event from the database;
		case types.SEEKING_REQUEST:
			return {
				...state,
				currentRequest: action.payload,
			};
		default :
			return state;
	}
}
