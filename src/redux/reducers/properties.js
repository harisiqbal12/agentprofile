import {
	CURRENT_PROPERTIES,
	AGENT_PROPERTY,
	AGENT_PROPERTY_BY_ID,
} from '../constants';

const INITIAL_STATE = {
	currentProperties: [],
	agentProperty: [],
	agentProperties: [],
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

		case AGENT_PROPERTY_BY_ID:
			return {
				...state,
				agentProperties: action.agentProperties,
			};

		default:
			return state;
	}
};

export default propertyReducer;
