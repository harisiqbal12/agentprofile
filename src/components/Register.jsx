import React, { useState } from 'react';
import { Layout, Button, Input, Text, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import firebase from 'firebase';

function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSignup = async () => {
		try {
			if (!name.length || !email.length || !password.length) {
				return;
			}

			const user = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);
			await user.user.updateProfile({
				displayName: name,
			});

			await firebase.database().ref('users').child(user.user.uid).set({
				email: email,
				displayName: name,
				photourl: '',
				bioGraphicalInformation: '',
				mobileNumber: '',
				officeNumber: '',
				faxNumber: '',
				facebookUrl: '',
				twitterUrl: '',
				googlePlusUrl: '',
				linkedInUrl: '',
			});

			setName(' ');
			setEmail(' ');
			setPassword(' ');
		} catch (err) {
			console.log(err);
		}
	};

	const inputIcon = iconName => (
		<Icon style={styles.inputIcon} fill='#616979' name={iconName} />
	);

	return (
		<Layout style={styles.registerContainer}>
			<Layout style={styles.titleContainer}>
				<Icon style={styles.icon} fill='#8F9BB3' name='people' />
				<Text style={styles.title}>Signup</Text>
			</Layout>
			<Layout style={styles.buttonConatiner}>
				<Input
					value={name}
					onChangeText={t => setName(t)}
					size='large'
					style={styles.input}
					placeholder='Name'
					accessoryLeft={() => inputIcon('at')}
				/>
				<Input
					value={email}
					onChangeText={t => setEmail(t)}
					size='large'
					style={styles.input}
					placeholder='Email'
					accessoryLeft={() => inputIcon('email')}
				/>
				<Input
					secureTextEntry
					size='large'
					style={styles.input}
					placeholder='Password'
					value={password}
					onChangeText={t => setPassword(t)}
					accessoryLeft={() => inputIcon('lock')}
				/>
				<Button onPress={onSignup}>Signup</Button>
			</Layout>
		</Layout>
	);
}

const styles = StyleSheet.create({
	registerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleContainer: {
		flex: 0.25,
		justifyContent: 'center',
	},
	buttonConatiner: {
		flex: 0.4,
	},
	input: {
		width: 300,
		marginBottom: 10,
	},
	icon: {
		height: 100,
		width: 100,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
	},
	inputIcon: {
		width: 20,
		height: 20,
	},
});

export default Register;
