import { ADDED_AGENTS, CURRENT_AGENT } from '../constants';

const INITIAL_STATE = {
	agents: [],
  currentAgent: null
};

const agentReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case ADDED_AGENTS:
      return {
        ...state,
        agents: action.agents
      }

      case CURRENT_AGENT:
        return {
          ...state,
          currentAgent: action.currentAgent
        }

		default:
			return state;
	}
};

export default agentReducer
