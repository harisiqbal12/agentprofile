import React, { useState } from 'react';
import { Layout, Button, Input, Text, Icon } from '@ui-kitten/components';
import firebase from 'firebase';
import { StyleSheet } from 'react-native';
import SpinnerSmall from './spinnerSmall';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const inputIcon = iconName => (
		<Icon style={styles.inputIcon} fill='#616979' name={iconName} />
	);

	const handleLogin = async () => {
		try {
			setLoading(true);
			console.log('loading state: ' + loading);
			if (!email.length || !password.length) {
				console.log('provide all fields please');
				setLoading(false);
				return;
			}

			await firebase.auth().signInWithEmailAndPassword(email, password);
			setEmail('');
			setPassword('');
		} catch (err) {
			setLoading(false);
			console.log('error');
			console.log(err);
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
					size='large'
					style={styles.input}
					placeholder='Email'
					accessoryLeft={() => inputIcon('email')}
					value={email}
					onChangeText={t => setEmail(t)}
				/>
				<Input
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
