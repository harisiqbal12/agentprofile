import React from 'react';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

function Landing({ navigation }) {
	const handleSignupNavigation = () => navigation.navigate('Register');
	const handleLoginNavigation = () => navigation.navigate('Login');

	return (
		<Layout style={styles.landingContainer}>
			<Layout style={styles.titleContainer}>
				<Icon style={styles.icon} fill='#8F9BB3' name='people' />
				<Text style={styles.title}>Agentprofile</Text>
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
		flex: 0.3,
	},

	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
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
});

export default Landing;
