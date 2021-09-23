import React, { useEffect, useState } from 'react';
import { Layout, Text, Input, Button, Icon } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';
import firebase from 'firebase';
import { Modal, Portal, Provider } from 'react-native-paper';
import SpinnerSmall from './spinnerSmall';

import { default as theme } from '../theme/custom-theme.json';

function ResetPassword(props) {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [isError, setIsError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleResetPassword = async () => {
		try {
			setLoading(true);
			setIsError(false);
			setEmailError(null);
			if (!email.length > 0) {
				throw new Error('Please Fill This Field');
			}

			await firebase.auth().sendPasswordResetEmail(email);
			setShowModal(true);
			setLoading(false);
			// props.navigation.navigate('Landing');
		} catch (err) {
			console.log(err);
			setIsError(true);
			setLoading(false);
			setEmailError(err.message);
		}
	};

	const hideModal = () => setShowModal(false);

	return (
		<Provider style={styles.root}>
			<Layout style={styles.container}>
				<Layout style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={require('../../assets/5792795.png')}
					/>
				</Layout>
				<Layout style={styles.inputContainer}>
					<Input
						placeholder='Enter Your Email'
						status={`${isError ? 'danger' : 'info'}`}
						style={styles.input}
						placeholderTextColor='#fff'
						textStyle={{ color: '#fff' }}
						value={email}
						onChangeText={t => setEmail(t)}
						label={emailError}
					/>
				</Layout>
				<Layout style={styles.btnContainer}>
					<Button
						onPress={handleResetPassword}
						appearance='outline'
						status='info'
						style={styles.button}>
						{loading ? (<SpinnerSmall />) : 'Reset'}
					</Button>
				</Layout>
			</Layout>
			<Portal>
				<Modal
					visible={showModal}
					onDismiss={hideModal}
					contentContainerStyle={styles.modal}>
					<Layout style={styles.modalContainer}>
						<Icon style={styles.icon} name='email-outline' fill='#fff' />

						<Text style={styles.textModal}>Email Successfully Sent To</Text>
						<Text style={styles.textModal}>{email}</Text>
						<Layout style={styles.modalButtonContainer}>
							<Button
								status='info'
								appearance='outline'
								onPress={() => props.navigation.navigate('Landing')}
								style={styles.modalButton}>
								Ok
							</Button>
						</Layout>
					</Layout>
				</Modal>
			</Portal>
		</Provider>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'black',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#234666',
	},
	image: {
		width: 400,
		height: 400,
	},
	imageContainer: {
		marginBottom: 60,
		backgroundColor: '#234666',
	},
	inputContainer: {
		backgroundColor: '#234666',

		marginBottom: 50,
	},
	input: {
		width: 300,
		backgroundColor: 'transparent',
		color: '#fff',
	},
	btnContainer: {
		flexDirection: 'row-reverse',
		width: '90%',
		margin: 10,
		backgroundColor: '#234666',
		position: 'relative',
		top: '30%',
	},
	button: {
		width: 200,
		borderRadius: 50,
	},
	modal: {
		width: 250,
		height: 250,
		alignSelf: 'center',
	},
	modalContainer: {
		backgroundColor: '#234666',
		borderRadius: 10,
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.5,
		borderColor: '#fff',
	},
	modalButtonContainer: {
		backgroundColor: 'transparent',
		marginTop: '15%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: 100,
		height: 100,
	},
	modalButton: {
		width: 150,
	},
	textModal: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default ResetPassword;
