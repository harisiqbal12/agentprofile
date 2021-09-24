import React, { useEffect, useState } from 'react';
import { Layout, Icon, Text, Button } from '@ui-kitten/components';
import { StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import firebase from 'firebase';

import { default as theme } from '../theme/custom-theme.json';
import {
	// fetchFaveAgents,
	fetchFavAgents,
	showModal,
} from '../redux/actions/index';

function HomescreenCard(props) {
	const [images, setImages] = useState([
		'https://indiatownship.com/wp-content/uploads/2020/10/no-image.png',
		'https://indiatownship.com/wp-content/uploads/2020/10/no-image.png',
		'https://indiatownship.com/wp-content/uploads/2020/10/no-image.png',
	]);

	const [fav, setFav] = useState(false);
	const [saved, setSaved] = useState(false);
	const [favKey, setFavKey] = useState(null);

	const favouritesRef = firebase.database().ref('favourites');

	const {
		displayName,
		mobile,
		listingProperties,
		bgImageUrl,
		profileURL,
		email,
		whatsApp,
		office,
		id,
	} = props.item;

	useEffect(() => {
		props.fetchFavAgents();
	}, []);

	useEffect(() => {
		let count = 0;
		console.log('agent property \n\n\n\n');
		if (props.agentProperty) {
			props.agentProperty.forEach((property, index) => {
				if (property.authorID === id) {
					setImages(property.images);
				}
			});
		}

	}, [props.executeAgain]);



	useEffect(() => {
		if (fav && !saved) {
			(async () => {
				try {
					await favouritesRef
						.child('agents')
						.child(firebase.auth().currentUser.uid)
						.push({
							agentID: id,
						});
					setFavKey(null);
					setSaved(true);
				} catch (err) {
					console.log(err);
				}
			})();
		}
		if (fav === false && saved) {
			(async () => {
				try {
					// console.log('removing');
					favouritesRef
						.child('agents')
						.child(firebase.auth().currentUser.uid)
						.on('child_added', snapshot => {
							// console.log(snapshot.val().agentID === id);
							if (snapshot.val().agentID === id) {
								setFavKey(snapshot.key);
							}
						});
				} catch (err) {
					console.log(err);
				}
			})();
		}
	}, [fav]);

	useEffect(() => {
		if (favKey && saved) {
			(async () => {
				try {
					await favouritesRef
						.child('agents')
						.child(firebase.auth().currentUser.uid)
						.child(favKey)
						.remove();

					props.fetchFavAgents();
				} catch (err) {
					console.log(err);
				}
			})();
		}
	}, [favKey]);

	useEffect(() => {
		if (props.favAgentsIDS.length > 0) {
			const isFav = props.favAgentsIDS.includes(id);

			setSaved(isFav);
			setFav(isFav);
		} else {
			setSaved(false);
			setFav(false);
		}
	}, [props.favAgentsIDS]);

	const hanldeAgentDetailsNavigation = () =>
		props.navigation.navigate('AgentDetails', {
			data: props.item,
		});

	handleAgentListingNavigation = () =>
		props.navigation.navigate('ListingProperties', {
			agentID: props.item.id,
			displayName,
		});

	return (
		<Card elevation={5} style={styles.agentsCard}>
			<Layout style={styles.favContainer}>
				<TouchableOpacity
					style={styles.favIconTouch}
					onPress={() => setFav(!fav)}>
					<Icon
						style={styles.cardIcon}
						fill='#fff'
						name={fav ? 'heart' : 'heart-outline'}
					/>
				</TouchableOpacity>
			</Layout>
			<Layout style={styles.container}>
				<Layout style={styles.profileAvatar}>
					<Image style={styles.profileAvatarImage} source={{ uri: profileURL }} />
					<Text style={styles.agentName}>{displayName}</Text>
					<Text style={styles.phoneNumber}>{mobile}</Text>
					<Text style={styles.email}>{email}</Text>
					<Text style={styles.office}>Office {office}</Text>
					<Text style={styles.listedProperties}>
						Listed Properties {listingProperties}
					</Text>
				</Layout>
			</Layout>

			<Layout style={styles.scrollViewContainer}>
				<ScrollView
					style={{ flex: 1 }}
					horizontal={true}
					scrollEventThrottle={10}>
					<Image
						style={styles.scrollImage}
						source={{
							uri: images[0],
						}}
					/>
					<Image
						style={styles.scrollImage}
						source={{
							uri: images[1],
						}}
					/>
					<Image
						style={styles.scrollImage}
						source={{
							uri: images[2],
						}}
					/>
				</ScrollView>
				<Layout style={styles.buttonContainer}>
					<Button onPress={hanldeAgentDetailsNavigation} style={styles.button}>
						Visit Profile
					</Button>
					<Button onPress={handleAgentListingNavigation} style={styles.button}>
						Visit Listing
					</Button>
				</Layout>
			</Layout>
		</Card>
	);
}

const styles = StyleSheet.create({
	agentsCard: {
		height: 430,
		marginBottom: 10,
		backgroundColor: theme['color-primary-400'],
	},
	container: {
		margin: 20,
		backgroundColor: theme['color-primary-400'],
	},
	cardIcon: {
		height: 25,
		width: 25,
		alignSelf: 'flex-end',
		margin: 10,
	},
	profileAvatar: {
		width: 100,
		height: 100,
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	profileAvatarImage: {
		width: 100,
		height: 100,
		borderWidth: 3,
		borderColor: '#fff',
	},
	agentName: {
		color: '#fff',
		position: 'absolute',
		left: 120,
		fontWeight: 'bold',
		fontFamily: 'Roboto_400Regular',
		fontSize: 18,
	},
	phoneNumber: {
		color: '#fff',
		position: 'absolute',
		left: 120,
		fontWeight: 'bold',
		fontFamily: 'Roboto_400Regular',
		fontSize: 10,
		top: 25,
		opacity: 0.9,
	},
	email: {
		color: '#fff',
		position: 'absolute',
		left: 120,
		fontWeight: 'bold',
		fontFamily: 'Roboto_400Regular',
		fontSize: 10,
		top: 40,
		opacity: 0.9,
	},
	office: {
		color: '#fff',
		position: 'absolute',
		left: 120,
		fontWeight: 'bold',
		fontFamily: 'Roboto_400Regular',
		fontSize: 10,
		top: 55,
		opacity: 0.9,
	},
	listedProperties: {
		color: '#fff',
		position: 'absolute',
		left: 120,
		fontWeight: 'bold',
		fontFamily: 'Roboto_400Regular',
		fontSize: 10,
		top: 70,
		opacity: 0.9,
	},
	scrollImage: {
		width: 150,
		height: 150,
		margin: 2,
		borderWidth: 3,
		borderColor: theme['color-primary-300'],
	},
	scrollViewContainer: {
		flex: 1,
		marginTop: 150,
		backgroundColor: theme['color-primary-400'],
		margin: 20,
	},
	srollView: {
		flex: 1,
		backgroundColor: '#fff',
	},
	buttonContainer: {
		backgroundColor: 'transparent',
		marginTop: 10,
		flexDirection: 'row',
	},
	button: {
		width: '48%',
		margin: 5,
		alignSelf: 'center',
	},
	favContainer: {
		backgroundColor: theme['color-primary-400'],
		marginBottom: -40,
	},
	favIconTouch: {
		width: 50,
		alignSelf: 'flex-end',
	},
});

const mapStateToProps = state => ({
	// favAgents: state.agentState.agentsFave,
	favAgentsIDS: state.agentState.favAgentsIDS,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchFavAgents, showModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomescreenCard);
