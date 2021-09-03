import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Image,
} from 'react-native';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import firebase from 'firebase';
import { default as theme } from '../theme/custom-theme.json';

function Profile(props) {
	const { displayName, email } = props.route.params.currentUser;

	const [fullName, setFullName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		setFullName(displayName);
	}, []);

	const updateUserCredentials = async () => {
		try {
			if (password !== confirmPassword) {
				throw new Error('Invalid Confirm Password');
			}

			const currentUser = firebase.auth().currentUser;

			await currentUser.updateProfile({
				displayName: fullName,
			});

			if (password.length > 0) {
				await currentUser.updatePassword(password);
			}

			await firebase.database().ref('users').child(currentUser.uid).update({
				displayName: fullName,
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<Layout style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={require('../../assets/20943447.jpg')}
				/>
				<Text style={styles.title}>Manage Your Account</Text>
				<Layout style={styles.contentContainer}>
					<Input
						value={fullName}
						style={styles.input}
						placeholder='Full Name'
						onChangeText={t => setFullName(t)}
					/>
					<Input
						value={email}
						disabled
						style={styles.input}
						placeholder='Email'
					/>
					<Input
						onChangeText={t => setPassword(t)}
						value={password}
						style={styles.input}
						placeholder=' Password'
					/>
					<Input
						value={confirmPassword}
						style={styles.input}
						placeholder='Confirm Password'
						onChangeText={t => setConfirmPassword(t)}
					/>
				</Layout>
				<Layout style={styles.imageButtonContainer}>
					<Button onPress={updateUserCredentials} style={styles.saveButton}>
						Save
					</Button>
				</Layout>
			</Layout>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	SafeAreaView: {
		flex: 1,
		backgroundColor: '#fff',
	},
	ScrollView: {
		marginTop: StatusBar.currentHeight,
		flex: 1,
	},
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	imageCover: {
		aspectRatio: 1 / 1,
		backgroundColor: 'transparent',
		flex: 1,
		height: 150,
		borderWidth: 5,
		borderColor: '#CDCBCD',
		marginTop: 20,
	},

	imageButton: {
		height: 10,
	},
	imageButtonContainer: {
		padding: 10,
	},
	contentContainer: {
		marginTop: 50,
		backgroundColor: '#fff',
	},
	input: {
		width: 300,
		marginBottom: 15,
	},
	saveButton: {
		marginTop: 50,
		width: 160,
	},
	image: {
		width: 250,
		height: 250,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: theme['color-primary-500'],
		fontFamily: 'Roboto_400Regular',
	},
});

export default Profile;
