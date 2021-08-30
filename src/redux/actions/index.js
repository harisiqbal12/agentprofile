import {
	USER_STATE_CHANGED,
	ADDED_AGENTS,
	CURRENT_AGENT,
} from '../constants/index';
import firebase from 'firebase';

export function fetchUser() {
	return async dispatch => {
		try {
			const userRef = await firebase.database().ref('users');

			// const data = await userRef.child(firebase.auth().currentUser.uid).get();
			userRef.on(
				'value',
				snapshot => {
					const users = snapshot.child(firebase.auth().currentUser.uid).val();
					dispatch({ type: USER_STATE_CHANGED, currentUser: users });
				},
				errorObject => {
					console.log('The read failed: ' + errorObject.name);
				}
			);
		} catch (err) {
			console.log(err);
		}
	};
}

export function fetchAgents() {
	return async dispatch => {
		try {
			let data = [];
			const agentsRef = firebase.database().ref('agents');
			agentsRef.on('child_added', snapshot => {
				const agents = snapshot.val();
				agents['id'] = snapshot.key;
				data.push(agents);

				dispatch({ type: ADDED_AGENTS, agents: data });
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export function fetchCurrentAgent() {
	return async dispatch => {
		try {
			const currentUser = await firebase.auth().currentUser;
			const agentsRef = await firebase.database().ref('agents');
			agentsRef.on('child_added', snapshot => {
				// console.log(snapshot.key);
				if (snapshot.key.includes(currentUser.uid)) {
					dispatch({ type: CURRENT_AGENT, currentAgent: snapshot.val() });
					return;
				}
			});
		} catch (err) {
			console.log(err);
		}
	};
}
