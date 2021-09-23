import { USER_STATE_CHANGED, SHOW_MODAL, HIDE_MODAL } from '../constants';

const initialState = {
	currentUser: null,
	modal: {
		showModal: false,
		message: null,
	},
};

const userReduer = (state = initialState, action) => {
	switch (action.type) {
		case USER_STATE_CHANGED:
			return {
				...state,
				currentUser: action.currentUser,
			};

		case SHOW_MODAL:
			return {
				...state,
				modal: {
					showModal: true,
					message: action.message,
				},
			};
		case HIDE_MODAL:
			return {
				...state,
				modal: {
					showModal: false,
					message: null,
				},
			};

		default:
			return state;
	}
};

export default userReduer;
