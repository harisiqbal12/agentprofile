import React, { useState } from 'react';
import { Layout, Button, Input, Text, Icon } from '@ui-kitten/components';
import firebase from 'firebase';
import { StyleSheet, View } from 'react-native';
import SpinnerSmall from './spinnerSmall';

import { default as theme } from '../theme/custom-theme.json';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [isEmailError, setIsEmailError] = useState(false);
	const [isPasswordError, setIsPasswordError] = useState(false);

	const inputIcon = iconName => (
		<Icon style={styles.inputIcon} fill='#616979' name={iconName} />
	);

	const handleLogin = async () => {
		try {
			setEmailError('');
			setPasswordError('');
			setIsEmailError(false);
			setIsPasswordError(false);

			if (!email.length > 0) {
				setEmailError('Please Provide Email field');
				setIsEmailError(true);
			}

			if (!password.length > 0) {
				setPasswordError('Please Provide Password field');
				setIsPasswordError(true);
			}

			if (isPasswordError || isEmailError) {
				return;
			}

			setLoading(true);

			await firebase.auth().signInWithEmailAndPassword(email, password);
			setEmail('');
			setPassword('');
		} catch (err) {
			// console.log(err.message);
			setLoading(false);
			setIsPasswordError(true);
			setPasswordError(err.message);
		}
	};

	return (
		<View style={styles.root}>
			<Layout style={styles.loginContainer}>
				<Layout style={styles.titleContainer}>
					<Icon
						style={styles.icon}
						fill={theme['color-primary-100']}
						name='people'
					/>
					<Text style={styles.title}>Login</Text>
				</Layout>
				<Layout style={styles.buttonContainer}>
					<Input
						label={emailError}
						size='large'
						style={styles.input}
						placeholder='Email'
						accessoryLeft={() => inputIcon('email')}
						value={email}
						status={isEmailError && 'danger'}
						onChangeText={t => setEmail(t)}
					/>
					<Input
						label={passwordError}
						status={isPasswordError && 'danger'}
						value={password}
						secureTextEntry
						size='large'
						style={styles.input}
						placeholder='Password'
						accessoryLeft={() => inputIcon('lock')}
						onChangeText={t => setPassword(t)}
					/>
					<Button accessoryLeft={loading && SpinnerSmall} onPress={handleLogin}>
						{!loading && 'login'}
					</Button>
				</Layout>
			</Layout>
		</View>
	);
}

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	titleContainer: {
		flex: 0.3,
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: theme['color-primary-100'],
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
		backgroundColor: 'transparent',
	},
	buttonContainer: {
		flex: 0.3,
		backgroundColor: 'transparent',
	},
	icon: {
		height: 100,
		width: 100,
	},
	input: {
		width: 300,
		marginBottom: 10,
		backgroundColor: theme['color-primary-100'],
	},
	inputIcon: {
		width: 20,
		height: 20,
	},
	root: {
		backgroundColor: theme['color-primary-400'],
		flex: 1,
	},
});

export default Login;
