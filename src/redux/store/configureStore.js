import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';


let log = createLogger({ diff: false, collapsed: true});

// if (__DEV__) {
// 	// const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
// 	middleware = [...middleware, log];
// } else {
// 	middleware = [...middleware];
// }
let middleware = [thunk, log];
export default function (initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(...middleware)
	);
}