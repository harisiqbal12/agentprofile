import React, { useEffect, useState } from 'react';
import { Layout, Icon, Text, Button } from '@ui-kitten/components';
import { StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import { default as theme } from '../theme/custom-theme.json';

function HomescreenCard(props) {
	const [images, setImages] = useState([
		'https://indiatownship.com/wp-content/uploads/2020/10/no-image.png',
		'https://indiatownship.com/wp-content/uploads/2020/10/no-image.png',
		'https://indiatownship.com/wp-content/uploads/2020/10/no-image.png',
	]);

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

	console.log('images \n\n\n\n');

	useEffect(() => {
		if (props.agentProperty) {
			props.agentProperty.forEach((property, index) => {
				if (property.authorID === id) {
					setImages(property.images);
				}
			});
		}
	}, [props.agentProperty, images]);

	const hanldeAgentDetailsNavigation = () =>
		props.navigation.navigate('AgentDetails', {
			data: props.item,
		});

	return (
		<Card elevation={5} style={styles.agentsCard}>
			<TouchableOpacity onPress={hanldeAgentDetailsNavigation}>
				<Layout style={styles.container}>
					<Icon style={styles.cardIcon} fill='#fff' name='heart' />
					<Layout style={styles.profileAvatar}>
						<Image
							style={styles.profileAvatarImage}
							source={{ uri: profileURL }}
						/>
						<Text style={styles.agentName}>{displayName}</Text>
						<Text style={styles.phoneNumber}>{mobile}</Text>
						<Text style={styles.email}>{email}</Text>
						<Text style={styles.office}>Office {office}</Text>
						<Text style={styles.listedProperties}>
							Listed Properties {listingProperties}
						</Text>
					</Layout>
				</Layout>
			</TouchableOpacity>

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
					<Button style={styles.button}>Visit Listing</Button>
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
		zIndex: 9,
		position: 'absolute',
		right: 10,
		top: 10,
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
		width: 150,
		marginLeft: 10,
	},
});

export default HomescreenCard;
