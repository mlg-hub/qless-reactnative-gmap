import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client/dist/socket.io';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

// connect the app with socket io

const socket = io('https://arcane-mesa-47319.herokuapp.com', { 
	jsonp: false });

const socketIOMiddleware = createSocketIoMiddleware(socket, 'server/');

const log = createLogger({ diff: false, collapsed: true });

// if (__DEV__) {
// 	// const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
// 	middleware = [...middleware, log];
// } else {
// 	middleware = [...middleware];
// }
const middleware = [thunk, log, socketIOMiddleware];
export default function (initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(...middleware)
	);
}