import {
	USER_STATE_CHANGED,
	ADDED_AGENTS,
	CURRENT_AGENT,
	CURRENT_PROPERTIES,
	AGENT_PROPERTY,
	AGENT_BY_ID,
	AGENT_PROPERTY_BY_ID,
} from '../constants/index';
import firebase from 'firebase';

export function fetchUser() {
	return async dispatch => {
		try {
			const userRef = firebase.database().ref('users');

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

export function fetchAgentById(agentId) {
	return async dispatch => {
		try {
			const agentsRef = firebase.database().ref(`agents/${agentId}`);
			agentsRef.on('value', snapshot => {
				const agent = snapshot.val();
				dispatch({ type: AGENT_BY_ID, agent });
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export function fetchCurrentAgent() {
	return async dispatch => {
		try {
			const currentUser = firebase.auth().currentUser;
			const agentsRef = firebase.database().ref('agents');
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

export function fetchAllProperties() {
	return async dispatch => {
		try {
			let data = [];
			const propertyRef = firebase.database().ref('properties');
			const allProperties = firebase.database().ref('properties');

			propertyRef.on('child_added', snapshot => {
				allProperties.child(snapshot.key).on('child_added', prp => {
					data.push(prp.val());

					dispatch({ type: CURRENT_PROPERTIES, currentProperties: data });
				});
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export function fetchAgentProperites(agentId) {
	return async dispatch => {
		try {
			let data = [];
			console.log('fetch agent properites ');
			const propertyRef = firebase.database().ref(`properties/${agentId}`);
			propertyRef.on('child_added', snapshot => {
				const properites = snapshot.val();
				properites['id'] = snapshot.key;

				data.push(properites);

				dispatch({ type: AGENT_PROPERTY_BY_ID, agentProperties: data });
			});
		} catch (err) {
			console.log(err);
		}
	};
}

let data = [];

export function fetchAgentProperty(agentId) {
	return async dispatch => {
		try {
			console.log('\n\n\n\n');
			console.log('fetchagents: ' + agentId);
			console.log('haris: ' + agentId);
			const propertyRef = firebase.database().ref(`properties/${agentId}`);
			propertyRef.on('child_added', snapshot => {
				data.push(snapshot.val());

				dispatch({ type: AGENT_PROPERTY, agentProperty: data });
			});
		} catch (err) {
			console.log(err);
		}
	};
}
