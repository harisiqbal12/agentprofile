import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import userReduer from './user';
import agentReducer from './agents';

const rootReducers = combineReducers({
	userState: userReduer,
	agentState: agentReducer,
});

const middlewares = [reduxThunk];

export const store = createStore(rootReducers, applyMiddleware(...middlewares));
