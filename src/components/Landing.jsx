import React from 'react';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import { default as theme } from '../theme/custom-theme.json';

function Landing({ navigation }) {
	const handleSignupNavigation = () => navigation.navigate('Register');
	const handleLoginNavigation = () => navigation.navigate('Login');
	const handleResetNavigation = () => navigation.navigate('ResetPassword');

	return (
		<Layout style={styles.landingContainer}>
			<Layout style={styles.titleContainer}>
				<Text style={styles.title}>Agent Profile</Text>
				<Layout style={styles.line}></Layout>

				<Image
					style={styles.logoImage}
					source={require('../../assets/4776.png')}
				/>
			</Layout>

			<Layout style={styles.buttonContainer}>
				<Button
					status='control'
					appearance='outline'
					onPress={handleSignupNavigation}
					style={styles.button}>
					Signup
				</Button>
				<Button
					status='control'
					appearance='outline'
					onPress={handleLoginNavigation}
					style={styles.button}>
					{' '}
					login
				</Button>
				<TouchableOpacity
					onPress={handleResetNavigation}
					style={styles.lostPasswordContainer}>
					<Text style={styles.lostPassword}>Lost Your Password?</Text>
				</TouchableOpacity>
			</Layout>
		</Layout>
	);
}

const styles = StyleSheet.create({
	landingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#234666',
	},

	titleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#234666',
	},

	title: {
		fontSize: 30,
		fontWeight: 'bold',
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
		marginBottom: 10,
		color: '#fff',
	},

	icon: {
		height: 100,
		width: 100,
	},

	buttonContainer: {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#234666',
	},

	button: {
		width: 200,
		margin: 2,
		color: '#234666',
	},
	logoImage: {
		width: 500,
		height: 500,
	},
	subTitle: {
		fontSize: 15,
		fontWeight: 'bold',
		color: theme['color-primary-500'],
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
		letterSpacing: 5,
	},
	lostPassword: {
		color: '#fff',
		fontWeight: 'bold',
	},
	lostPasswordContainer: {
		marginTop: 10,
		marginBottom: 30,
	},
	line: {
		borderBottomColor: '#fff',
		borderColor: '#fff',
		borderWidth: 0.5,
		width: 200,
	},
});

export default Landing;
