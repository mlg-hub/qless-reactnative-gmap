import { combineReducers } from 'redux';
import seeker from './seeker/seeker.reducer';
import shared from './shared.reducer';
import giver from './giver/giver.reduce';

const rootReducer = combineReducers({
	seeker, shared, giver
});

export default rootReducer;
