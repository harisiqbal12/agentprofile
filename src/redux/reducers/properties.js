import {
	CURRENT_PROPERTIES,
	AGENT_PROPERTY,
	AGENT_PROPERTY_BY_ID,
	PROPERTY_FAV_FETCH,
	PROPERTY_FAV_REMOVE,
	PROPERTY_FAV_SAVE,
	PROPERTY_FAV_FROM_DATABASE,
} from '../constants';

const INITIAL_STATE = {
	currentProperties: [],
	agentProperty: [],
	agentProperties: [],
	favProperty: [],
	favPropertiesFromDatabase: [],
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
		case PROPERTY_FAV_FETCH:
			return {
				...state,
				favProperty: action.data,
			};

		case PROPERTY_FAV_REMOVE:
			return {
				...state,
			};

		case PROPERTY_FAV_SAVE:
			return {
				...state,
			};

		case PROPERTY_FAV_FROM_DATABASE:
			return {
				...state,
				favPropertiesFromDatabase: action.data,
			};
		default:
			return state;
	}
};

export default propertyReducer;
