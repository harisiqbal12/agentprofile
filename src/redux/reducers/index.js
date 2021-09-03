import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import userReduer from './user';
import agentReducer from './agents';
import propertyReducer from './properties';

const rootReducers = combineReducers({
	userState: userReduer,
	agentState: agentReducer,
	propertyState: propertyReducer,
});

const middlewares = [reduxThunk];

export const store = createStore(rootReducers, applyMiddleware(...middlewares));
