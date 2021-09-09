import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, FlatList, StatusBar, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
	fetchFavPropertiesFromDatabase,
	fetchFavProperty,
} from '../redux/actions/index';

import Loader from './Loader';
import PropertyCard from './PropertyCard';
import NotFound from './Notfound';

function FavPropertyScreen(props) {
	const [loading, setLoading] = useState(true);
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		props.fetchFavProperty();
	}, []);

	useEffect(() => {
		console.log('fav screen');
		console.log(props.favProperties.length);
		if (props.favProperties.length > 0) {
			props.fetchFavPropertiesFromDatabase(props.favProperties);
		} else {
			console.log('false');
			setProperties([]);
		}
	}, [props.favProperties]);

	useEffect(() => {
		console.log('properties setted');
		setProperties(props.favPropertiesFromDatabase);
		setLoading(false);
	}, [props.favPropertiesFromDatabase]);

	if (loading) {
		return <Loader />;
	}

	if (!properties.length > 0) {
		return <NotFound title='No Favourite Properties Found' />;
	}

	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<Layout style={styles.titleContainer}>
				<Text style={styles.headingTitle}>Favourite Properties</Text>
			</Layout>
			<FlatList
				contentContainerStyle={{ padding: 16 }}
				data={properties}
				renderItem={({ item }) => {
					return (
						<PropertyCard
							favProperties={props.favProperties}
							navigation={props.navigation}
							data={item}
						/>
					);
				}}
				keyExtractor={(item, index) => index.toString()}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	SafeAreaView: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	titleContainer: {
		backgroundColor: 'transparent',
		padding: 20,
	},
	headingTitle: {
		fontWeight: 'bold',
		fontSize: 20,
		alignSelf: 'center',
	},
});

const mapStateToProps = state => ({
	favPropertiesFromDatabase: state.propertyState.favPropertiesFromDatabase,
	favProperties: state.propertyState.favProperty,
});

const mapDispatchtoProps = dispatch =>
	bindActionCreators(
		{ fetchFavPropertiesFromDatabase, fetchFavProperty },
		dispatch
	);

export default connect(mapStateToProps, mapDispatchtoProps)(FavPropertyScreen);
