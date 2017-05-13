/**
 * @file base reducer to combine states from all other page
 * level reducers
 */ 
import { combineReducers } from 'redux';
import projectTopics from "./pageReducers/cardTopicsReducer";
const rootReducer = combineReducers({
	projectTopics,
});

export default rootReducer;
