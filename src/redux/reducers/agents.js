import { ADDED_AGENTS, CURRENT_AGENT, AGENT_BY_ID } from '../constants';

const INITIAL_STATE = {
	agents: [],
	currentAgent: null,
	agentByID: null,
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

		default:
			return state;
	}
};

export default agentReducer;
