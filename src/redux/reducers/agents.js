import {
	ADDED_AGENTS,
	CURRENT_AGENT,
	AGENT_BY_ID,
	AGENT_FAV_SAVE,
	AGENT_FAV_FETCH,
	AGENT_FAV_REMOVE,
	AGENT_FAV_FROM_DATABASE,
} from '../constants';

const INITIAL_STATE = {
	agents: [],
	currentAgent: null,
	agentByID: null,
	agentsFave: [],
	favAgents: [],
	favAgentsIDS: [],
};

const agentReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADDED_AGENTS:
			return {
				...state,
				agents: action.agents,
			};

		case CURRENT_AGENT:
			return {
				...state,
				currentAgent: action.currentAgent,
			};

		case AGENT_BY_ID:
			return {
				...state,
				agentByID: action.agent,
			};
		case AGENT_FAV_SAVE:
			return {
				...state,
			};
		case AGENT_FAV_FETCH:
			return {
				...state,
				favAgentsIDS: action.data,
			};

		case AGENT_FAV_REMOVE:
			return {
				...state,
			};
		case AGENT_FAV_FROM_DATABASE:
			return {
				...state,
				favAgents: action.data,
			};

		default:
			return state;
	}
};

export default agentReducer;
