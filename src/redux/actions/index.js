import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	USER_STATE_CHANGED,
	ADDED_AGENTS,
	CURRENT_AGENT,
	CURRENT_PROPERTIES,
	AGENT_PROPERTY,
	AGENT_BY_ID,
	AGENT_PROPERTY_BY_ID,
	AGENT_FAV_SAVE,
	AGENT_FAV_FETCH,
	AGENT_FAV_REMOVE,
	AGENT_FAV_FROM_DATABASE,
	PROPERTY_FAV_FETCH,
	PROPERTY_FAV_SAVE,
	PROPERTY_FAV_REMOVE,
	PROPERTY_FAV_FROM_DATABASE,
	SHOW_MODAL,
	FETCH_FEATURE_LIST,
	HIDE_MODAL,
} from '../constants/index';

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
				errorObject => {}
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
			agentsRef.child(currentUser.uid).on('value', snapshot => {
				const currentAgent = snapshot.val();
				dispatch({ type: CURRENT_AGENT, currentAgent: currentAgent });
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
					const value = prp.val();
					value['id'] = prp.key;

					data.push(value);

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
			const propertyRef = firebase.database().ref(`properties/${agentId}`);

			propertyRef.on('child_added', snapshot => {
				const properites = snapshot.val();
				properites['id'] = snapshot.key;

				data.push(properites);

				dispatch({ type: AGENT_PROPERTY_BY_ID, agentProperties: data });
				return;
			});
			dispatch({ type: AGENT_PROPERTY_BY_ID, agentProperties: data });
		} catch (err) {
			console.log(err);
		}
	};
}
let saveAgentsArray = [];

export function fetchFavAgentFromDatabase(id) {
	let favAgentsFromDatabase = [];

	return async dispatch => {
		try {
			const agentsRef = firebase.database().ref('agents');
			id.forEach(itemId => {
				agentsRef.child(itemId).on('value', snapshot => {
					const agent = snapshot.val();
					agent['id'] = snapshot.key;

					favAgentsFromDatabase.push(agent);
				});
			});

			dispatch({
				type: AGENT_FAV_FROM_DATABASE,
				data: favAgentsFromDatabase,
			});
		} catch (err) {
			console.log(err);
		}
	};
}

let propertyFavArray = [];

// export function fetchFavProperty() {
// 	return async dispatch => {
// 		try {
// 			const values = await AsyncStorage.getItem('@propertyFavArray');
// 			propertyFavArray = JSON.parse(values);
// 			if (propertyFavArray != null) {
// 				dispatch({ type: PROPERTY_FAV_FETCH, data: propertyFavArray });
// 				return;
// 			}

// 			dispatch({ type: PROPERTY_FAV_FETCH, data: [] });
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};
// }

export function faveSaveProperty(id) {
	return async dispatch => {
		try {
			let isExist = false;

			if (propertyFavArray.length > 0) {
				isExist = propertyFavArray.find(
					itemId => itemId.propertyID === id.propertyID
				);
			}

			if (!isExist) {
				propertyFavArray.push(id);
			}

			const values = JSON.stringify(propertyFavArray);

			await AsyncStorage.setItem('@propertyFavArray', values);

			dispatch({ type: PROPERTY_FAV_SAVE });
		} catch (err) {
			console.log(err);
		}
	};
}

export function fetchFavPropertiesFromDatabase(data) {
	let favPropertiesFromDatabase = [];
	return async dispatch => {
		try {
			const properitesRef = firebase.database().ref('properties');
			console.log('action');
			// console.log('fetch properties from database')
			data.forEach(item => {
				properitesRef
					.child(item.authorID)
					.child(item.id)
					.on('value', snapshot => {
						// console.log(snapshot.val());
						const values = snapshot.val();
						values['id'] = snapshot.key;
						favPropertiesFromDatabase.push(values);
						console.log(values);

						dispatch({
							type: PROPERTY_FAV_FROM_DATABASE,
							data: favPropertiesFromDatabase,
						});
					});
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export function fetchFavAgents() {
	return async dispatch => {
		try {
			let data = [];
			const favouritesRef = firebase.database().ref('favourites/agents');
			const currentUser = firebase.auth().currentUser;
			favouritesRef.child(currentUser.uid).on('child_added', snapshot => {
				const values = snapshot.val();
				// values['key'] = snapshot.key
				data.push(values.agentID);
				dispatch({ type: AGENT_FAV_FETCH, data });
				return;
			});

			dispatch({ type: AGENT_FAV_FETCH, data });
		} catch (err) {
			console.log(err);
		}
	};
}

export function fetchFavProperties() {
	return async dispatch => {
		console.log('fetching properties');
		let data = [];
		try {
			const favouritesRef = firebase.database().ref('favourites/properties');
			const currentUSer = firebase.auth().currentUser;

			favouritesRef.child(currentUSer.uid).on('child_added', snapshot => {
				const values = snapshot.val();
				values['snapID'] = snapshot.key;
				data.push(values);

				dispatch({ type: PROPERTY_FAV_FETCH, data: data });
				return;
			});

			dispatch({ type: PROPERTY_FAV_FETCH, data: [] });
		} catch (err) {
			console.log(err);
		}
	};
}

export function showModal(message) {
	return dispatch => {
		dispatch({ type: SHOW_MODAL, message });
	};
}

export function fetchFeaturedAgents() {
	return async dispatch => {
		try {
			const data = [];
			const featureRef = firebase.database().ref('featureList');
			featureRef.on('child_added', snapshot => {
				data.push(snapshot.val());
				console.log(data);

				dispatch({ type: FETCH_FEATURE_LIST, data });
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export function hideModal() {
	return dispatch => {
		dispatch({ type: HIDE_MODAL });
	};
}

let data = [];

export function fetchAgentProperty(agentId) {
	return async dispatch => {
		try {
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
