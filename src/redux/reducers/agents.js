import { ADDED_AGENTS } from '../constants';

const INITIAL_STATE = {
	agents: [],
};

const agentReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case ADDED_AGENTS:
      return {
        ...state,
        agents: action.agents
      }

		default:
			return state;
	}
};

export default agentReducer
