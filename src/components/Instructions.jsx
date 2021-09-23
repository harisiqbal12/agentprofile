import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { SafeAreaView, StatusBar, StyleSheet, Image } from 'react-native';

import { default as theme } from '../theme/custom-theme.json';

function Instructions(props) {
	const handleNavigation = () => props.navigation.navigate('Landing');

	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<Layout style={styles.container}>
				<Image
					style={styles.image}
					source={require('../../assets/instruction-image-1-1.png')}
				/>
				<Text style={styles.title}>Simply #1 Real Estate Agent App</Text>
			</Layout>
			<Layout style={styles.buttonContainer}>
				<Button onPress={handleNavigation} style={styles.button}>Next</Button>
			</Layout>
      
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	SafeAreaView: {
		flex: 1,
		backgroundColor: '#234666',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#234666',
	},
	image: {
		width: 400,
		height: 400,
	},
	title: {
		fontSize: 15,
		marginTop: 20,
		color: '#fff',
		fontWeight: 'bold',
		fontFamily: 'Roboto_400Regular',
	},
	buttonContainer: {
		width: '90%',
		backgroundColor: '#234666',
		flexDirection: 'row-reverse',
		margin: 10,
	},
	button: {
		width: 150,
		borderRadius: 30,
	},
});

export default Instructions;
