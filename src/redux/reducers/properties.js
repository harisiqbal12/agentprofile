import { CURRENT_PROPERTIES, AGENT_PROPERTY } from '../constants';

const INITIAL_STATE = {
	currentProperties: [],
};

const propertyReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CURRENT_PROPERTIES:
			return {
				...state,
				currentProperties: action.currentProperties,
			};

		case AGENT_PROPERTY:
			return {
				...state,
				agentProperty: action.agentProperty,
			};

		default:
			return state;
	}
};

export default propertyReducer;
