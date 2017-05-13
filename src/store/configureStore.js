/**
 * Author:Saurabh Mhatre
 * @file: file to initialize central redux store
 */ 
import { compose,createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import {autoRehydrate} from 'redux-persist';
import {createLogger} from 'redux-logger';
let middleware = [thunk];

if (__DEV__) {
	const logger = createLogger({ collapsed: true });
	middleware = [...middleware, logger];
} else {
	const logger = createLogger({ collapsed: true });
	middleware = [...middleware, logger];
}

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		 compose(
			applyMiddleware(...middleware),
			autoRehydrate()
		)
	);
}
