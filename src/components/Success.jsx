import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

function Success() {
	return (
		<Layout style={styles.root}>
			<Layout style={styles.container}>
				<Image
					style={styles.image}
					source={require('../../assets/11_Success-1.png')}
				/>
			</Layout>
		</Layout>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#234666',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 400,
		height: 400,
	},
});

export default Success;
