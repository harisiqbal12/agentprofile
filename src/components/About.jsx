import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { Layout, Text, Icon } from '@ui-kitten/components';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Image,
} from 'react-native';
import { default as theme } from '../theme/custom-theme.json';

function About() {
	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<Layout style={styles.container}>
				<Layout style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={require('../../assets/weblogo.png')}
					/>
					<Text style={{ ...styles.text, marginTop: 50 }}>
						Simply #1 Real Estate Agent App
					</Text>
				</Layout>
				<Layout style={styles.authorContainer}>
					<Text style={{ ...styles.text, textAlign: 'center' }}>
						Michael Kemp
					</Text>
					<Image
						style={styles.imageTwo}
						source={{
							uri: 'https://agentprofile.com.au/wp-content/uploads/2020/03/Michael-Kemp-Aussie-Home-Loans-head-shot-e1591791158475.jpg',
						}}
					/>
					<Text style={styles.text}>Aissie Home Loans</Text>
				</Layout>
				<Layout style={styles.contactContainer}>
					<Text style={{ ...styles.text }}>Contact Us</Text>
					<Layout style={{ ...styles.iconContainer, marginTop: 40 }}>
						<Icon
							name='email'
							fill={theme['color-info-800']}
							style={styles.icon}
						/>
						<Text style={styles.text}>agentprofileinfo@gmail.com</Text>
					</Layout>
					<Layout style={styles.iconContainer}>
						<Icon
							name='navigation-2'
							fill={theme['color-info-800']}
							style={styles.icon}
						/>
						<Text style={{ ...styles.text, fontSize: 10, marginLeft: 10 }}>
							Level 1, 19 Short Street, Southport, Qld 4217
						</Text>
					</Layout>
				</Layout>
				<Layout style={styles.credits}>
					<Text style={{ ...styles.text, margin: 10, fontSize: 10 }}>
						All Rights Reserved 2020
					</Text>
					<Text style={{ ...styles.text, margin: 10, fontSize: 10 }}>
						Designed by Agent Profiles Solution
					</Text>
				</Layout>
			</Layout>
			<ExpoStatusBar style='dark' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	SafeAreaView: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	container: {
		flex: 1,
	},
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 200,
		height: 200,
	},
	text: {
		fontWeight: 'bold',
		fontSize: 15,
		color: theme['color-info-800'],
	},
	contactContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: 30,
		height: 30,
	},
	iconContainer: {
		flexDirection: 'row',
		marginTop: 20,
		marginBottom: 20,
	},
	imageTwo: {
		width: 100,
		height: 100,
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	authorContainer: {
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		marginBottom: 50,
	},
	credits: {
		display: 'flex',
		flexDirection: 'row',
	},
});

export default About;
