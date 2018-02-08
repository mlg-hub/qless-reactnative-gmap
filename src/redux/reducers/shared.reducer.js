import * as types from '../actions/actionsType';
import initialState from './initialState';
import update from 'immutability-helper';

export default function (state = initialState.shared, action) {
	switch (action.type){
		case types.STORE_USER_POSITION:
		return {
			...state,
			userPosition: {
				latitude: action.payload.latitude,
				longitude: action.payload.longitude
			}
		}
		default :
			return state;
	}
}