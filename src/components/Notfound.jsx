import React from 'react';
import { SafeAreaView, Image, StyleSheet, StatusBar } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { default as theme } from '../theme/custom-theme.json';

function NotFound(props) {
	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<Layout style={styles.container}>
				<Image
					style={styles.image}
					source={require('../../assets/3024051.jpg')}
				/>
				<Text style={styles.text}>{props.title}</Text>
			</Layout>
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
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 200,
		height: 200,
	},
	text: {
		fontSize: 14,
		fontWeight: 'bold',
		color: theme['color-info-800'],
	},
});

export default NotFound;
