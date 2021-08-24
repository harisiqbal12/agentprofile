import { USER_STATE_CHANGED } from '../constants';

const initialState = {
	currentUser: null,
};

const userReduer = (state = initialState, action) => {
	switch (action.type) {
		case USER_STATE_CHANGED:
			return {
				...state,
				currentUser: action.currentUser,
			};

		default:
			return state;
	}
};

export default userReduer;
