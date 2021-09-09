import React, { useState } from 'react';
import { Layout, Button, Input, Text, Icon } from '@ui-kitten/components';
import firebase from 'firebase';
import { StyleSheet } from 'react-native';
import SpinnerSmall from './spinnerSmall';

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
			console.log(err.message);
			setLoading(false);
			setIsPasswordError(true);
			setPasswordError(err.message)

		}
	};

	return (
		<Layout style={styles.loginContainer}>
			<Layout style={styles.titleContainer}>
				<Icon style={styles.icon} fill='#8F9BB3' name='people' />
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
	);
}

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleContainer: {
		flex: 0.3,
		justifyContent: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
	},
	buttonContainer: {
		flex: 0.3,
	},
	icon: {
		height: 100,
		width: 100,
	},
	input: {
		width: 300,
		marginBottom: 10,
	},
	inputIcon: {
		width: 20,
		height: 20,
	},
});

export default Login;
