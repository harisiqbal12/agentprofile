import React from 'react';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';

import { default as theme } from '../theme/custom-theme.json';

function Landing({ navigation }) {
	const handleSignupNavigation = () => navigation.navigate('Register');
	const handleLoginNavigation = () => navigation.navigate('Login');

	return (
		<Layout style={styles.landingContainer}>
			<Layout style={styles.titleContainer}>
				<Image
					style={styles.logoImage}
					source={require('../../assets/LOGO.png')}
				/>
				<Text style={styles.title}>AGENTPROFILE</Text>
				<Text style={styles.subTitle}>find an agent</Text>
			</Layout>

			<Layout style={styles.buttonContainer}>
				<Button onPress={handleSignupNavigation} style={styles.button}>
					Signup
				</Button>
				<Button onPress={handleLoginNavigation} style={styles.button}>
					{' '}
					login
				</Button>
			</Layout>
		</Layout>
	);
}

const styles = StyleSheet.create({
	landingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	titleContainer: {
		flex: 0.4,
	},

	title: {
		fontSize: 26,
		fontWeight: 'bold',
		color: theme['color-primary-500'],
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
		marginBottom: 10,
	},

	icon: {
		height: 100,
		width: 100,
	},

	buttonContainer: {
		flex: 0.1,
	},

	button: {
		width: 200,
		margin: 2,
	},
	logoImage: {
		width: 220,
		height: 220,
	},
	subTitle: {
		fontSize: 15,
		fontWeight: 'bold',
		color: theme['color-primary-500'],
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
		letterSpacing: 5,
	},
});

export default Landing;
