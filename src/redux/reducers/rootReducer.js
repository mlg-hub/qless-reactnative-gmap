import { combineReducers } from 'redux';
import seeker from './seeker/seeker.reducer';
import shared from './shared.reducer';

const rootReducer = combineReducers({
	seeker, shared
});

export default rootReducer;
