import React, { useState } from 'react';
import {
	Layout,
	Text as KittentText,
	Button as KittenButton,
	Icon,
} from '@ui-kitten/components';
import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import formate from 'format-number';
import { Modal, Portal, Text, Button, Provider, Card } from 'react-native-paper';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { default as theme } from '../theme/custom-theme.json';

import { fetchAgentProperites } from '../redux/actions/index';

function PropertyCard(props) {
	const [visible, setVisible] = React.useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const { data } = props;
	const formatedNumber = formate({ prefix: '$' })(data.propertyPrice);

	const handlePropertyNavigation = () =>
		props.navigation.navigate('Property', {
			data: data,
		});

	const handleUpdatePropertyNavigation = () =>
		props.navigation.navigate('UpdateUserProperty', {
			data: data,
		});

	const handleDelete = async () => {
		try {
			const propertyRef = firebase.database().ref('properties');
			const agentRef = firebase.database().ref('agents');
			const currentUser = firebase.auth().currentUser;

			await propertyRef.child(data.authorID).child(data.id).remove();

			await agentRef.child(currentUser.uid).update({
				listingProperties: firebase.database.ServerValue.increment(-1),
			});

			await props.fetchAgentProperites(currentUser.uid);

			hideModal();
		} catch (err) {
			console.log(err);
		}
	};

	const editIcon = props => <Icon {...props} name='edit' />;
	const deleteIcon = props => <Icon {...props} name='trash-2' />;

	return (
		<Provider>
			<Card elevation={5} style={styles.card}>
				<KittentText style={styles.propertyPrice}>{formatedNumber}</KittentText>
				<TouchableOpacity onPress={handlePropertyNavigation}>
					<Card.Title
						titleStyle={{
							color: theme['color-primary-100'],
							fontSize: 18,
							fontWeight: 'bold',
							fontFamily: 'Roboto_400Regular',
						}}
						style={styles.cardHeader}
						title={data.propertyName}
						subtitle={data.propertyAddress}
						subtitleStyle={{
							color: theme['color-primary-200'],
							fontSize: 10,
							fontWeight: 'bold',
							fontFamily: 'Roboto_400Regular',
						}}
					/>
				</TouchableOpacity>

				<Layout style={styles.imageContainer}>
					<ScrollView
						style={{ flex: 1 }}
						horizontal={true}
						pagingEnabled={true}
						scrollEventThrottle={10}>
						<Image source={{ uri: data.images[0] }} style={styles.image} />
						<Image source={{ uri: data.images[1] }} style={styles.image} />
						<Image source={{ uri: data.images[2] }} style={styles.image} />
					</ScrollView>
				</Layout>
				<Card.Content style={styles.cardContent}>
					{props.authenticatedUser ? (
						<Layout style={styles.authButton}>
							<KittenButton
								onPress={handleUpdatePropertyNavigation}
								accessoryLeft={editIcon}
								style={styles.authBtn}>
								Edit
							</KittenButton>
							<KittenButton
								onPress={showModal}
								accessoryLeft={deleteIcon}
								style={styles.authBtn}>
								Delete
							</KittenButton>
						</Layout>
					) : (
						<KittenButton
							onPress={handlePropertyNavigation}
							style={styles.button}>
							Visit Property
						</KittenButton>
					)}
				</Card.Content>
			</Card>
			<Portal>
				<Modal
					visible={visible}
					onDismiss={hideModal}
					contentContainerStyle={styles.modal}>
					<Layout style={styles.modalContainer}>
						<KittentText style={styles.modalText}>
							Are you sure you want to delete?
						</KittentText>
						<KittentText style={{ ...styles.modalText, fontWeight: 'bold' }}>
							{data.propertyName}
						</KittentText>
						<Layout style={styles.modalButtonContainer}>
							<KittenButton
								onPress={handleDelete}
								status='danger'
								style={styles.modalButton}>
								Delete
							</KittenButton>
							<KittenButton onPress={hideModal} style={styles.modalButton}>
								Close
							</KittenButton>
						</Layout>
					</Layout>
				</Modal>
			</Portal>
		</Provider>
	);
}

const styles = StyleSheet.create({
	card: {
		marginBottom: 10,
	},
	imageContainer: {
		flex: 1,
		margin: 10,
	},
	image: {
		height: 350,
		width: 250,
		margin: 2,
		borderRadius: 10,
	},
	cardHeader: {
		backgroundColor: theme['color-primary-400'],
	},
	cardContent: {
		backgroundColor: theme['color-primary-400'],
		height: 70,
		flex: 1,
	},
	propertyPrice: {
		width: 80,
		zIndex: 9,
		position: 'absolute',
		top: 15,
		color: theme['color-primary-100'],
		fontWeight: 'bold',
		right: 0,
		marginRight: 10,
	},
	button: {
		margin: 12,
	},
	authButton: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15,
	},
	authBtn: {
		width: 150,
		margin: 10,
	},
	modalContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	modalButton: {
		width: 100,
		margin: 5,
	},
	modalText: {
		color: theme['color-info-800'],
		fontSize: 15,
	},
	modal: {
		backgroundColor: 'white',
		padding: 20,
		maxWidth: 300,
		alignSelf: 'center',
		borderRadius: 12,
	},
	modalButtonContainer: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'transparent',
		marginTop: 50,
	},
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchAgentProperites }, dispatch);

export default connect(null, mapDispatchToProps)(PropertyCard);
