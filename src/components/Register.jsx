import React, { useState } from 'react';
import {
	Layout,
	Button,
	Input,
	Text,
	Icon,
	Spinner,
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import { default as theme } from '../theme/custom-theme.json';

import SpinnerSmall from './spinnerSmall';

function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [isNameError, setIsNameError] = useState(false);
	const [isEmailError, setIsEmailError] = useState(false);
	const [isPasswordError, setIsPasswordError] = useState(false);
	const [gError, setGError] = useState(false);

	const onSignup = async () => {
		try {
			setNameError('');
			setEmailError('');
			setPasswordError('');
			setIsNameError(false);
			setIsEmailError(false);
			setIsPasswordError(false);

			if (!name.length > 0) {
				setNameError('Please Provide Name Field');
				setIsNameError(true);
				setGError(true);
			}

			if (!email.length > 0) {
				setEmailError('Please Provide Email Field');
				setIsEmailError(true);
				setGError(true);
			}

			if (!password.length > 0) {
				setPasswordError('Please provide Password Field');
				setIsPasswordError(true);
				setGError(true);
			}

			setLoading(true);

			if (gError) {
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
			});

			setName(' ');
			setEmail(' ');
			setPassword(' ');
			setLoading(false);
		} catch (err) {
			setLoading(false);

			if (err.message.startsWith('Password')) {
				setPasswordError(err.message);
				setIsPasswordError(true);
				return;
			}

			setNameError(err.message);
			setIsNameError(true);
		}
	};

	const inputIcon = iconName => (
		<Icon style={styles.inputIcon} fill='#616979' name={iconName} />
	);

	return (
		<View style={styles.root}>
			<Layout style={styles.registerContainer}>
				<Layout style={styles.titleContainer}>
					<Icon
						style={styles.icon}
						fill={theme['color-primary-100']}
						name='people'
					/>
					<Text style={styles.title}>Signup</Text>
				</Layout>
				<Layout style={styles.buttonConatiner}>
					<Input
						status={isNameError && 'danger'}
						label={nameError}
						value={name}
						onChangeText={t => setName(t)}
						size='large'
						style={styles.input}
						placeholder='Name'
						accessoryLeft={() => inputIcon('at')}
					/>
					<Input
						status={isEmailError && 'danger'}
						label={emailError}
						value={email}
						onChangeText={t => setEmail(t)}
						size='large'
						style={styles.input}
						placeholder='Email'
						accessoryLeft={() => inputIcon('email')}
					/>
					<Input
						status={isPasswordError && 'danger'}
						label={passwordError}
						secureTextEntry
						size='large'
						style={styles.input}
						placeholder='Password'
						value={password}
						onChangeText={t => setPassword(t)}
						accessoryLeft={() => inputIcon('lock')}
					/>
					<Button accessoryLeft={loading && SpinnerSmall} onPress={onSignup}>
						{!loading && 'signup'}
					</Button>
				</Layout>
			</Layout>
		</View>
	);
}

const styles = StyleSheet.create({
	registerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	titleContainer: {
		flex: 0.25,
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	buttonConatiner: {
		flex: 0.4,
		backgroundColor: 'transparent',
	},
	input: {
		width: 300,
		marginBottom: 10,
		backgroundColor: theme['color-primary-100'],
	},
	icon: {
		height: 100,
		width: 100,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: theme['color-primary-100'],
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
	},
	inputIcon: {
		width: 20,
		height: 20,
	},
	root: {
		flex: 1,
		backgroundColor: theme['color-primary-400'],
	},
});

export default Register;
