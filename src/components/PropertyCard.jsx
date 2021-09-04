import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import formate from 'format-number';

import { default as theme } from '../theme/custom-theme.json';

function PropertyCard(props) {
	const { data } = props;
	const formatedNumber = formate({ prefix: '$' })(data.propertyPrice);

	const handlePropertyNavigation = () =>
		props.navigation.navigate('Property', {
			data: data,
		});

	return (
		<Card elevation={5} style={styles.card}>
			<Text style={styles.propertyPrice}>{formatedNumber}</Text>
			<TouchableOpacity onPress={handlePropertyNavigation}>
				<Card.Title
					titleStyle={{
						color: theme['color-primary-100'],
						fontSize: 18,
						fontWeight: 'bold',
						fontFamily: 'Roboto_400Regular',
					}}
					style={styles.cardHeader}
					title={data.propertyName}
					subtitle={data.propertyAddress}
					subtitleStyle={{
						color: theme['color-primary-200'],
						fontSize: 10,
						fontWeight: 'bold',
						fontFamily: 'Roboto_400Regular',
					}}
				/>
			</TouchableOpacity>

			<Layout style={styles.imageContainer}>
				<ScrollView
					style={{ flex: 1 }}
					horizontal={true}
					pagingEnabled={true}
					scrollEventThrottle={10}>
					<Image source={{ uri: data.images[0] }} style={styles.image} />
					<Image source={{ uri: data.images[1] }} style={styles.image} />
					<Image source={{ uri: data.images[2] }} style={styles.image} />
				</ScrollView>
			</Layout>
			<Card.Content style={styles.cardContent}>
				<Button onPress={handlePropertyNavigation} style={styles.button}>
					Visit Property
				</Button>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		marginBottom: 10,
	},
	imageContainer: {
		flex: 1,
		margin: 10,
	},
	image: {
		height: 350,
		width: 250,
		margin: 2,
		borderRadius: 10,
	},
	cardHeader: {
		backgroundColor: theme['color-primary-400'],
	},
	cardContent: {
		backgroundColor: theme['color-primary-400'],
		height: 70,
		flex: 1,
	},
	propertyPrice: {
		width: 80,
		zIndex: 9,
		position: 'absolute',
		top: 15,
		color: theme['color-primary-100'],
		fontWeight: 'bold',
		right: 0,
		marginRight: 10,
	},
	button: {
		margin: 12,
	},
});

export default PropertyCard;
